from flask import Blueprint, redirect, render_template, session

from database.connection import conectar_bd
from utils.auth import login_required

perfil = Blueprint("perfil", __name__)


@perfil.route("/perfil")
@login_required
def pagina_perfil():
    conexao = conectar_bd()

    try:
        with conexao.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    u.nome,
                    u.email,
                    u.admin,
                    COALESCE(p.exercicios, 0) AS exercicios,
                    COALESCE(p.pontos, 0) AS pontos,
                    COALESCE(p.nivel, 'Iniciante') AS nivel,
                    COALESCE(p.progresso, 0) AS progresso
                FROM usuarios u
                LEFT JOIN progresso p ON u.id = p.usuario_id
                WHERE u.id = %s
                """,
                (session["usuario_id"],),
            )

            usuario = cursor.fetchone()
    finally:
        conexao.close()

    if not usuario:
        session.clear()

        return redirect("/login")

    # mantém o menu em sincronia com o banco
    session["admin"] = bool(usuario["admin"])

    return render_template("perfil.html", usuario=usuario)
