from flask import Blueprint, render_template, redirect, session


aprender = Blueprint("aprender", __name__)


@aprender.route("/aprender")
def pagina_aprender():

    if "usuario_id" not in session:
        return redirect("/login")

    return render_template(
        "aprender/aprender.html"
    )


@aprender.route("/aprender/pecas")
def pecas():

    if "usuario_id" not in session:
        return redirect("/login")

    return render_template(
        "aprender/pecas/pecas.html"
    )


@aprender.route("/aprender/xeque")
def xeque():

    if "usuario_id" not in session:
        return redirect("/login")

    return render_template(
        "aprender/xeque/xeque.html"
    )


@aprender.route("/aprender/taticas")
def taticas():

    if "usuario_id" not in session:
        return redirect("/login")

    return render_template(
        "aprender/taticas/taticas.html"
    )


@aprender.route("/aprender/aberturas")
def aberturas():

    if "usuario_id" not in session:
        return redirect("/login")

    return render_template(
        "aprender/aberturas/aberturas.html"
    )