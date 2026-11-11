from flask import Blueprint, jsonify, request, session

from database.connection import conectar_bd
from routes.aprender import MODULOS

curso = Blueprint("curso", __name__)


@curso.route("/api/curso/concluir", methods=["POST"])
def concluir_modulo():
    if "usuario_id" not in session:
        return jsonify({
            "sucesso": False,
            "mensagem": "Usuário não autenticado.",
        }), 401

    dados = request.get_json(silent=True)
    modulo = dados.get("modulo", "") if isinstance(dados, dict) else ""

    if modulo not in MODULOS:
        return jsonify({
            "sucesso": False,
            "mensagem": "Módulo inválido.",
        }), 400

    conexao = conectar_bd()

    try:
        with conexao.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO modulos_progresso (usuario_id, modulo, concluido)
                VALUES (%s, %s, TRUE)
                ON DUPLICATE KEY UPDATE concluido = TRUE
                """,
                (session["usuario_id"], modulo),
            )

        conexao.commit()

    except Exception as erro:
        conexao.rollback()
        print("ERRO AO CONCLUIR MÓDULO:", erro)

        return jsonify({
            "sucesso": False,
            "mensagem": "Erro ao salvar conclusão.",
        }), 500

    finally:
        conexao.close()

    return jsonify({"sucesso": True, "modulo": modulo})
