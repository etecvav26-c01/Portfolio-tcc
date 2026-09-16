from flask import (
    Blueprint,
    render_template,
    redirect,
    session,
    request,
    jsonify
)

from utils.progresso import atualizar_progresso


exercicios = Blueprint(
    "exercicios",
    __name__
)


@exercicios.route("/exercicios")
def pagina_exercicios():

    if "usuario_id" not in session:
        return redirect("/login")

    return render_template(
        "exercicios.html"
    )


@exercicios.route(
    "/api/exercicio/concluir",
    methods=["POST"]
)
def concluir_exercicio():

    if "usuario_id" not in session:

        return jsonify({
            "sucesso": False,
            "mensagem":
                "Usuário não autenticado."
        }), 401


    dados = request.get_json()

    pontos = dados.get(
        "pontos",
        0
    )


    try:

        pontos = int(pontos)

    except (
        TypeError,
        ValueError
    ):

        pontos = 0


    pontos = max(
        0,
        min(pontos, 100)
    )


    atualizar_progresso(
        session["usuario_id"],
        pontos_ganhos=pontos,
        exercicio_concluido=True
    )


    return jsonify({
        "sucesso": True,
        "pontos": pontos
    })