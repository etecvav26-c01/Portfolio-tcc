from flask import Flask, render_template, request, redirect, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
import pymysql

app = Flask(__name__)
app.secret_key = "primeiro_lance_secret"

def conectar_bd():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="pokemon.09",
        database="primeiro_lance",
        cursorclass=pymysql.cursors.DictCursor
    )

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        email = request.form["email"]
        senha = request.form["senha"]

        conexao = conectar_bd()

        try:
            with conexao.cursor() as cursor:

                cursor.execute(
                    """
                    SELECT * FROM usuarios
                    WHERE email = %s
                    """,
                    (email,)
                )

                usuario = cursor.fetchone()

            if usuario and check_password_hash(usuario["senha"], senha):

                session["usuario_id"] = usuario["id"]
                session["usuario_nome"] = usuario["nome"]

                return redirect("/perfil")

            flash("Email ou senha inválidos.")

        finally:
            conexao.close()

    return render_template("login.html")

@app.route("/cadastro", methods=["GET", "POST"])
def cadastro():

    if request.method == "POST":

        nome = request.form["nome"]
        email = request.form["email"]
        senha = request.form["senha"]

        senha_hash = generate_password_hash(senha)

        conexao = conectar_bd()

        try:
            with conexao.cursor() as cursor:

                cursor.execute(
                    """
                    INSERT INTO usuarios(nome, email, senha)
                    VALUES(%s, %s, %s)
                    """,
                    (nome, email, senha_hash)
                )

                usuario_id = cursor.lastrowid

                cursor.execute(
                    """
                    INSERT INTO progresso(usuario_id)
                    VALUES(%s)
                    """,
                    (usuario_id,)
                )

            conexao.commit()
            
            flash("Conta criada com sucesso!")
            return redirect("/login")

        finally:
            conexao.close()

    return render_template("cadastro.html")

@app.route("/logout")
def logout():

    session.clear()

    return redirect("/")



@app.route("/aprender")
def aprender():

    if "usuario_id" not in session:
        return redirect("/login")

    return render_template("aprender.html")


@app.route("/exercicios")
def exercicios():
    if "usuario_id" not in session:
        return redirect("/login")

    return render_template("exercicios.html")

@app.route("/perfil")
def perfil():

    if "usuario_id" not in session:
        return redirect("/login")

    conexao = conectar_bd()
    cursor = conexao.cursor()

    cursor.execute("""
        SELECT nome, email
        FROM usuarios
        WHERE id = %s
    """, (session["usuario_id"],))

    usuario = cursor.fetchone()

    cursor.close()
    conexao.close()

    return render_template(
        "perfil.html",
        usuario=usuario
    )

if __name__ == '__main__':
    app.run(debug=True)