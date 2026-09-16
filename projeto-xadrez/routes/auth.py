from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    session,
    flash
)

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

from database.connection import conectar_bd


auth = Blueprint(
    "auth",
    __name__
)


@auth.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        email = request.form["email"]
        senha = request.form["senha"]

        conexao = conectar_bd()

        try:

            with conexao.cursor() as cursor:

                cursor.execute("""
                    SELECT *
                    FROM usuarios
                    WHERE email = %s
                """, (email,))

                usuario = cursor.fetchone()

        finally:

            conexao.close()


        if (
            usuario and
            check_password_hash(
                usuario["senha"],
                senha
            )
        ):

            session["usuario_id"] = usuario["id"]
            session["usuario_nome"] = usuario["nome"]
            session["admin"] = usuario["admin"]

            return redirect("/perfil")


        flash(
            "Email ou senha inválidos."
        )


    return render_template(
        "login.html"
    )


@auth.route(
    "/cadastro",
    methods=["GET", "POST"]
)
def cadastro():

    if request.method == "POST":

        nome = request.form["nome"]
        email = request.form["email"]
        senha = request.form["senha"]

        senha_hash = generate_password_hash(senha)

        conexao = conectar_bd()

        try:

            with conexao.cursor() as cursor:

                cursor.execute("""
                    INSERT INTO usuarios
                    (nome, email, senha)
                    VALUES (%s, %s, %s)
                """, (
                    nome,
                    email,
                    senha_hash
                ))

                usuario_id = cursor.lastrowid


                cursor.execute("""
                    INSERT INTO progresso
                    (usuario_id)
                    VALUES (%s)
                """, (
                    usuario_id,
                ))


            conexao.commit()

        finally:

            conexao.close()


        flash(
            "Conta criada com sucesso!"
        )

        return redirect("/login")


    return render_template(
        "cadastro.html"
    )


@auth.route("/logout")
def logout():

    session.clear()

    return redirect("/")