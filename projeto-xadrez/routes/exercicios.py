from flask import Blueprint, jsonify, render_template, request, session

from database.connection import conectar_bd
from utils.auth import login_required
from utils.progresso import (
    PONTOS_MAXIMOS_POR_EXERCICIO,
    TOTAL_EXERCICIOS,
    registrar_exercicio,
)

exercicios = Blueprint("exercicios", __name__)


@exercicios.route("/exercicios")
@login_required
def pagina_exercicios():
    return render_template("exercicios.html")


@exercicios.route("/api/exercicio/atual", methods=["GET"])
def obter_exercicio_atual():
    """Diz quantos exercícios o usuário já concluiu (o próximo é +1)."""
    if "usuario_id" not in session:
        return jsonify({
            "sucesso": False,
            "mensagem": "Usuário não autenticado.",
        }), 401

    conexao = conectar_bd()

    try:
        with conexao.cursor() as cursor:
            cursor.execute(
                """
                SELECT exercicios
                FROM progresso
                WHERE usuario_id = %s
                ORDER BY id
                LIMIT 1
                """,
                (session["usuario_id"],),
            )
            resultado = cursor.fetchone()

    except Exception as erro:
        print("ERRO AO BUSCAR EXERCÍCIO ATUAL:", erro)

        return jsonify({
            "sucesso": False,
            "mensagem": "Erro interno do servidor.",
        }), 500

    finally:
        conexao.close()

    concluidos = (resultado["exercicios"] or 0) if resultado else 0

    return jsonify({
        "sucesso": True,
        "exercicios_concluidos": concluidos,
        "total": TOTAL_EXERCICIOS,
    })


@exercicios.route("/api/exercicio/concluir", methods=["POST"])
def concluir_exercicio():
    if "usuario_id" not in session:
        return jsonify({
            "sucesso": False,
            "mensagem": "Usuário não autenticado.",
        }), 401

    dados = request.get_json(silent=True)

    if not isinstance(dados, dict):
        dados = {}

    try:
        exercicio_id = int(dados.get("exercicio_id"))
    except (TypeError, ValueError):
        return jsonify({
            "sucesso": False,
            "mensagem": "Exercício inválido.",
        }), 400

    try:
        pontos = int(dados.get("pontos", 0))
    except (TypeError, ValueError):
        pontos = 0

    pontos = max(0, min(pontos, PONTOS_MAXIMOS_POR_EXERCICIO))

    try:
        resultado = registrar_exercicio(
            session["usuario_id"],
            exercicio_id,
            pontos,
        )
    except Exception as erro:
        print("ERRO AO REGISTRAR EXERCÍCIO:", erro)

        return jsonify({
            "sucesso": False,
            "mensagem": "Erro ao salvar o progresso.",
        }), 500

    if resultado is None:
        return jsonify({
            "sucesso": False,
            "mensagem": "Este exercício já foi concluído ou não é o próximo da sequência.",
        }), 409

    return jsonify({"sucesso": True, "pontos": pontos, **resultado})
