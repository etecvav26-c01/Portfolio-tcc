from flask import (
    Blueprint,
    render_template,
    redirect,
    session,
    flash
)

from database.connection import conectar_bd


admin = Blueprint(
    "admin",
    __name__
)


def verificar_admin():

    if "usuario_id" not in session:
        return False

    conexao = conectar_bd()

    try:

        with conexao.cursor() as cursor:

            cursor.execute("""
                SELECT admin
                FROM usuarios
                WHERE id = %s
            """, (
                session["usuario_id"],
            ))

            usuario = cursor.fetchone()

    finally:

        conexao.close()


    return (
        usuario is not None
        and usuario["admin"]
    )


@admin.route("/admin")
def painel():

    if not verificar_admin():
        return redirect("/")


    conexao = conectar_bd()

    try:

        with conexao.cursor() as cursor:

            cursor.execute("""
                SELECT
                    u.id,
                    u.nome,
                    u.email,
                    u.admin,

                    COALESCE(
                        p.exercicios,
                        0
                    ) AS exercicios,

                    COALESCE(
                        p.pontos,
                        0
                    ) AS pontos,

                    COALESCE(
                        p.nivel,
                        'Iniciante'
                    ) AS nivel,

                    COALESCE(
                        p.progresso,
                        0
                    ) AS progresso

                FROM usuarios u

                LEFT JOIN progresso p
                    ON u.id = p.usuario_id

                ORDER BY u.id
            """)

            usuarios = cursor.fetchall()


            cursor.execute("""
                SELECT COUNT(*) AS total
                FROM usuarios
            """)

            total_usuarios = cursor.fetchone()["total"]


            cursor.execute("""
                SELECT COUNT(*) AS total
                FROM usuarios
                WHERE admin = 1
            """)

            total_admins = cursor.fetchone()["total"]

    finally:

        conexao.close()


    return render_template(
        "admin.html",
        usuarios=usuarios,
        total_usuarios=total_usuarios,
        total_admins=total_admins
    )


@admin.route(
    "/admin/toggle/<int:usuario_id>"
)
def toggle_admin(usuario_id):

    if not verificar_admin():
        return redirect("/")


    if usuario_id == session["usuario_id"]:

        flash(
            "Você não pode remover seu próprio acesso de administrador."
        )

        return redirect("/admin")


    conexao = conectar_bd()

    try:

        with conexao.cursor() as cursor:

            cursor.execute("""
                SELECT admin
                FROM usuarios
                WHERE id = %s
            """, (
                usuario_id,
            ))

            usuario = cursor.fetchone()


            if not usuario:

                flash(
                    "Usuário não encontrado."
                )

                return redirect("/admin")


            novo_valor = 0 if usuario["admin"] else 1


            cursor.execute("""
                UPDATE usuarios
                SET admin = %s
                WHERE id = %s
            """, (
                novo_valor,
                usuario_id
            ))


        conexao.commit()

    finally:

        conexao.close()


    return redirect("/admin")


@admin.route(
    "/admin/excluir/<int:usuario_id>"
)
def excluir_usuario(usuario_id):

    if not verificar_admin():
        return redirect("/")


    if usuario_id == session["usuario_id"]:

        flash(
            "Você não pode excluir sua própria conta."
        )

        return redirect("/admin")


    conexao = conectar_bd()

    try:

        with conexao.cursor() as cursor:

            cursor.execute("""
                DELETE FROM usuarios
                WHERE id = %s
            """, (
                usuario_id,
            ))


        conexao.commit()

        flash(
            "Usuário excluído com sucesso."
        )

    finally:

        conexao.close()


    return redirect("/admin")