from flask import (
    Blueprint,
    render_template,
    redirect,
    session,
    request,
    jsonify
)
from utils.progresso import atualizar_progresso
from database.connection import conectar_bd

exercicios = Blueprint("exercicios", __name__)


@exercicios.route("/exercicios")
def pagina_exercicios():
    if "usuario_id" not in session:
        return redirect("/login")

    return render_template("exercicios.html")


# --- NOVA ROTA: Retorna em qual exercício o usuário está ---
@exercicios.route("/api/exercicio/atual", methods=["GET"])
def obter_exercicio_atual():
    if "usuario_id" not in session:
        return jsonify({"sucesso": False, "mensagem": "Usuário não autenticado."}), 401

    conexao = conectar_bd()
    try:
        with conexao.cursor() as cursor:
            # Busca a quantidade de exercícios concluídos
            cursor.execute(
                "SELECT exercicios FROM progresso WHERE usuario_id = %s",
                (session["usuario_id"],)
            )
            resultado = cursor.fetchone()

            # Se ainda não tiver registro na tabela 'progresso', considera 0
            if not resultado:
                exercicios_concluidos = 0
            else:
                # Trata retorno seja como dicionário (DictCursor) ou como tupla
                exercicios_concluidos = resultado.get("exercicios", 0) if isinstance(resultado, dict) else resultado[0]

            # O próximo exercício a resolver é (concluídos + 1)
            proximo_id = (exercicios_concluidos or 0) + 1

            return jsonify({
                "sucesso": True,
                "exercicios_concluidos": exercicios_concluidos,
                "proximo_id": proximo_id
            })

    except Exception as erro:
        print("ERRO AO BUSCAR EXERCÍCIO ATUAL:", erro)
        return jsonify({"sucesso": False, "mensagem": "Erro interno do servidor."}), 500
    finally:
        conexao.close()


@exercicios.route("/api/exercicio/concluir", methods=["POST"])
def concluir_exercicio():
    if "usuario_id" not in session:
        return jsonify({
            "sucesso": False,
            "mensagem": "Usuário não autenticado."
        }), 401

    dados = request.get_json() or {}
    pontos = dados.get("pontos", 0)

    try:
        pontos = int(pontos)
    except (TypeError, ValueError):
        pontos = 0

    pontos = max(0, min(pontos, 100))

    # Atualiza o banco somando +1 no número de exercícios e somando os pontos
    atualizar_progresso(
        session["usuario_id"],
        pontos_ganhos=pontos,
        exercicio_concluido=True
    )

    return jsonify({
        "sucesso": True,
        "pontos": pontos
    })