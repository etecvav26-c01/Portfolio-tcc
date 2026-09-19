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


    conexao = conectar_bd()


    try:

        with conexao.cursor() as cursor:

            cursor.execute("""
                INSERT INTO modulos_progresso
                (usuario_id, modulo, concluido)
                VALUES (%s, %s, TRUE)

                ON DUPLICATE KEY UPDATE
                concluido = TRUE
            """, (
                session["usuario_id"],
                modulo
            ))


        conexao.commit()


    finally:

        conexao.close()


    return jsonify({
        "sucesso": True,
        "modulo": modulo
    })