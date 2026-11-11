import pymysql
from flask import Blueprint, flash, redirect, render_template, session

from database.connection import conectar_bd
from utils.auth import admin_required

admin = Blueprint("admin", __name__)


@admin.route("/admin")
@admin_required
def painel():
    conexao = conectar_bd()

    try:
        with conexao.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    u.id,
                    u.nome,
                    u.email,
                    u.admin,
                    COALESCE(p.exercicios, 0) AS exercicios,
                    COALESCE(p.pontos, 0) AS pontos,
                    COALESCE(p.nivel, 'Iniciante') AS nivel,
                    COALESCE(p.progresso, 0) AS progresso
                FROM usuarios u
                LEFT JOIN progresso p ON u.id = p.usuario_id
                ORDER BY u.id
                """
            )

            usuarios = cursor.fetchall()
    finally:
        conexao.close()

    return render_template(
        "admin.html",
        usuarios=usuarios,
        total_usuarios=len(usuarios),
        total_admins=sum(1 for usuario in usuarios if usuario["admin"]),
    )


# As ações abaixo alteram dados, por isso só aceitam POST
# (antes eram links GET, que podiam ser disparados por qualquer página/imagem).


@admin.route("/admin/toggle/<int:usuario_id>", methods=["POST"])
@admin_required
def toggle_admin(usuario_id):
    if usuario_id == session["usuario_id"]:
        flash("Você não pode remover seu próprio acesso de administrador.", "warning")
        return redirect("/admin")

    conexao = conectar_bd()

    try:
        with conexao.cursor() as cursor:
            cursor.execute(
                "SELECT nome, admin FROM usuarios WHERE id = %s",
                (usuario_id,),
            )
            usuario = cursor.fetchone()

            if not usuario:
                flash("Usuário não encontrado.", "danger")
                return redirect("/admin")

            novo_valor = 0 if usuario["admin"] else 1

            cursor.execute(
                "UPDATE usuarios SET admin = %s WHERE id = %s",
                (novo_valor, usuario_id),
            )

        conexao.commit()

    finally:
        conexao.close()

    papel = "administrador" if novo_valor else "usuário comum"
    flash(f"{usuario['nome']} agora é {papel}.", "success")

    return redirect("/admin")


@admin.route("/admin/excluir/<int:usuario_id>", methods=["POST"])
@admin_required
def excluir_usuario(usuario_id):
    if usuario_id == session["usuario_id"]:
        flash("Você não pode excluir sua própria conta.", "warning")
        return redirect("/admin")

    conexao = conectar_bd()

    try:
        with conexao.cursor() as cursor:
            cursor.execute("DELETE FROM usuarios WHERE id = %s", (usuario_id,))
            removidos = cursor.rowcount

        conexao.commit()

    except pymysql.MySQLError as erro:
        conexao.rollback()
        print("ERRO AO EXCLUIR USUÁRIO:", erro)
        flash("Não foi possível excluir o usuário.", "danger")
        return redirect("/admin")

    finally:
        conexao.close()

    if removidos:
        flash("Usuário excluído com sucesso.", "success")
    else:
        flash("Usuário não encontrado.", "danger")

    return redirect("/admin")
