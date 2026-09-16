from flask import (
    Blueprint,
    render_template,
    redirect,
    session
)

from database.connection import conectar_bd


perfil = Blueprint(
    "perfil",
    __name__
)


@perfil.route("/perfil")
def pagina_perfil():

    if "usuario_id" not in session:
        return redirect("/login")


    conexao = conectar_bd()

    try:

        with conexao.cursor() as cursor:

            cursor.execute("""
                SELECT
                    u.nome,
                    u.email,
                    p.exercicios,
                    p.pontos,
                    p.nivel,
                    p.progresso

                FROM usuarios u

                LEFT JOIN progresso p
                    ON u.id = p.usuario_id

                WHERE u.id = %s
            """, (
                session["usuario_id"],
            ))

            usuario = cursor.fetchone()

    finally:

        conexao.close()


    if not usuario:

        session.clear()

        return redirect("/login")


    return render_template(
        "perfil.html",
        usuario=usuario
    )