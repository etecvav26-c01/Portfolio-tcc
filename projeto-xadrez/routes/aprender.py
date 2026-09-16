from flask import (
    Blueprint,
    render_template,
    redirect,
    session
)


aprender = Blueprint(
    "aprender",
    __name__
)


def usuario_logado():

    return "usuario_id" in session


@aprender.route("/aprender")
def pagina_aprender():

    if not usuario_logado():
        return redirect("/login")

    return render_template(
        "aprender.html"
    )


@aprender.route("/aprender/pecas")
def pecas():

    if not usuario_logado():
        return redirect("/login")

    return render_template(
        "pecas.html"
    )


@aprender.route("/aprender/xeque")
def xeque():

    if not usuario_logado():
        return redirect("/login")

    return render_template(
        "xeque.html"
    )


@aprender.route("/aprender/taticas")
def taticas():

    if not usuario_logado():
        return redirect("/login")

    return render_template(
        "taticas.html"
    )


@aprender.route("/aprender/aberturas")
def aberturas():

    if not usuario_logado():
        return redirect("/login")

    return render_template(
        "aberturas.html"
    )