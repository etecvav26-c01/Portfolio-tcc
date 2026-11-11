import pymysql
from flask import Blueprint, flash, redirect, render_template, request, session
from werkzeug.security import check_password_hash, generate_password_hash

from database.connection import conectar_bd

auth = Blueprint("auth", __name__)

SENHA_MINIMA = 6


@auth.route("/login", methods=["GET", "POST"])
def login():
    if "usuario_id" in session:
        return redirect("/perfil")

    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        senha = request.form.get("senha", "")

        conexao = conectar_bd()

        try:
            with conexao.cursor() as cursor:
                cursor.execute(
                    "SELECT * FROM usuarios WHERE email = %s",
                    (email,),
                )
                usuario = cursor.fetchone()
        finally:
            conexao.close()

        if usuario and check_password_hash(usuario["senha"], senha):
            session.clear()
            session["usuario_id"] = usuario["id"]
            session["usuario_nome"] = usuario["nome"]
            session["admin"] = bool(usuario["admin"])

            return redirect("/perfil")

        flash("E-mail ou senha inválidos.", "danger")

    return render_template("login.html")


@auth.route("/cadastro", methods=["GET", "POST"])
def cadastro():
    if "usuario_id" in session:
        return redirect("/perfil")

    if request.method == "POST":
        nome = request.form.get("nome", "").strip()
        email = request.form.get("email", "").strip().lower()
        senha = request.form.get("senha", "")

        if not nome or not email or len(nome) > 100 or len(email) > 150:
            flash("Informe um nome e um e-mail válidos.", "danger")
            return render_template("cadastro.html", nome=nome, email=email)

        if len(senha) < SENHA_MINIMA:
            flash(f"A senha deve ter pelo menos {SENHA_MINIMA} caracteres.", "danger")
            return render_template("cadastro.html", nome=nome, email=email)

        senha_hash = generate_password_hash(senha)

        conexao = conectar_bd()

        try:
            with conexao.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s)",
                    (nome, email, senha_hash),
                )

                cursor.execute(
                    "INSERT INTO progresso (usuario_id) VALUES (%s)",
                    (cursor.lastrowid,),
                )

            conexao.commit()

        except pymysql.err.IntegrityError:
            # e-mail é UNIQUE: já existe uma conta com ele
            conexao.rollback()
            flash("Este e-mail já está cadastrado.", "danger")
            return render_template("cadastro.html", nome=nome, email=email)

        finally:
            conexao.close()

        flash("Conta criada com sucesso! Faça login para começar.", "success")

        return redirect("/login")

    return render_template("cadastro.html")


@auth.route("/logout")
def logout():
    session.clear()

    return redirect("/")
