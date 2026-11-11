from flask import Blueprint, abort, render_template, session

from database.connection import conectar_bd
from utils.auth import login_required

aprender = Blueprint("aprender", __name__)

# O conteúdo das aulas fica em static/js/aprender/course-data.js.
# "aulas" aqui é só para exibir a contagem nos cards.
MODULOS = {
    "pecas": {
        "titulo": "Peças do Xadrez",
        "icone": "♟️",
        "aulas": 6,
        "descricao": "Aprenda os movimentos e características das seis peças do xadrez.",
    },
    "xeque": {
        "titulo": "Xeque e Xeque-mate",
        "icone": "👑",
        "aulas": 2,
        "descricao": "Entenda o xeque, o xeque-mate e como escapar das ameaças ao rei.",
    },
    "taticas": {
        "titulo": "Táticas",
        "icone": "🎯",
        "aulas": 3,
        "descricao": "Recursos táticos fundamentais para encontrar combinações nas partidas.",
    },
    "aberturas": {
        "titulo": "Princípios de Abertura",
        "icone": "📖",
        "aulas": 3,
        "descricao": "Princípios importantes para começar uma partida corretamente.",
    },
}


def modulos_concluidos(usuario_id):
    conexao = conectar_bd()

    try:
        with conexao.cursor() as cursor:
            cursor.execute(
                """
                SELECT modulo
                FROM modulos_progresso
                WHERE usuario_id = %s AND concluido = 1
                """,
                (usuario_id,),
            )

            return {linha["modulo"] for linha in cursor.fetchall()}
    finally:
        conexao.close()


@aprender.route("/aprender")
@login_required
def pagina_aprender():
    return render_template(
        "aprender/aprender.html",
        modulos=MODULOS,
        concluidos=modulos_concluidos(session["usuario_id"]),
    )


@aprender.route("/aprender/<modulo>")
@login_required
def aula(modulo):
    if modulo not in MODULOS:
        abort(404)

    return render_template(
        "aprender/aula.html",
        modulo=modulo,
        info=MODULOS[modulo],
    )
