from flask import Blueprint, jsonify, request, session

from database.connection import conectar_bd


curso = Blueprint("curso", __name__)


@curso.route("/api/curso/concluir", methods=["POST"])
def concluir_modulo():

    if "usuario_id" not in session:

        return jsonify({
            "sucesso": False,
            "mensagem": "Usuário não autenticado."
        }), 401


    dados = request.get_json()

    modulo = dados.get("modulo", "")


    modulos_validos = [
        "pecas",
        "xeque",
        "taticas",
        "aberturas"
    ]


    if modulo not in modulos_validos:

        return jsonify({
            "sucesso": False,
            "mensagem": "Módulo inválido."
        }), 400


    return jsonify({
        "sucesso": True,
        "modulo": modulo
    })