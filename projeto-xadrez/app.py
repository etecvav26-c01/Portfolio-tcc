from flask import Flask, render_template, request, redirect, session, flash, jsonify 
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

def atualizar_progresso(usuario_id, pontos_ganhos=0, exercicio_concluido=False):

    conexao = conectar_bd()

    try:

        with conexao.cursor() as cursor:

            cursor.execute("""
                SELECT exercicios, pontos
                FROM progresso
                WHERE usuario_id = %s
            """, (usuario_id,))

            progresso = cursor.fetchone()

            if not progresso:
                return

            exercicios = progresso["exercicios"]
            pontos = progresso["pontos"]

            if exercicio_concluido:
                exercicios += 1

            pontos += pontos_ganhos

            if pontos >= 500:
                nivel = "Avançado"

            elif pontos >= 250:
                nivel = "Intermediário"

            elif pontos >= 100:
                nivel = "Aprendiz"

            else:
                nivel = "Iniciante"

            progresso_por_pontos = min(
                int((pontos / 500) * 100),
                100
            )


            cursor.execute("""
                UPDATE progresso

                SET
                    exercicios = %s,
                    pontos = %s,
                    nivel = %s,
                    progresso = %s

                WHERE usuario_id = %s
            """, (
                exercicios,
                pontos,
                nivel,
                progresso_por_pontos,
                usuario_id
            ))


        conexao.commit()

    finally:
        conexao.close()

@app.route("/api/exercicio/concluir", methods=["POST"])
def concluir_exercicio():

    if "usuario_id" not in session:
        return jsonify({
            "sucesso": False,
            "mensagem": "Usuário não autenticado."
        }), 401

    dados = request.get_json()

    pontos = dados.get("pontos", 0)

    try:
        pontos = int(pontos)
    except (TypeError, ValueError):
        pontos = 0

    if pontos < 0:
        pontos = 0

    if pontos > 100:
        pontos = 100

    atualizar_progresso(
        session["usuario_id"],
        pontos_ganhos=pontos,
        exercicio_concluido=True
    )

    return jsonify({
        "sucesso": True,
        "pontos": pontos
    })

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
                session["admin"] = usuario["admin"]

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

    try:
        with conexao.cursor() as cursor:

            cursor.execute("""
                SELECT
                    u.nome,
                    u.email,
                    p.exercicios,
                    p.pontos,
                    p.nivel,
                    p.progresso
                FROM usuarios u
                LEFT JOIN progresso p
                    ON u.id = p.usuario_id
                WHERE u.id = %s
            """, (session["usuario_id"],))

            usuario = cursor.fetchone()

    finally:
        conexao.close()

    if not usuario:
        session.clear()
        return redirect("/login")

    return render_template(
        "perfil.html",
        usuario=usuario
    )

@app.route("/admin")
def admin():

    if "usuario_id" not in session:
        return redirect("/login")

    conexao = conectar_bd()

    try:

        with conexao.cursor() as cursor:

            # Verifica se o usuário atual é administrador
            cursor.execute("""
                SELECT admin
                FROM usuarios
                WHERE id = %s
            """, (session["usuario_id"],))

            usuario_atual = cursor.fetchone()

            if not usuario_atual or not usuario_atual["admin"]:
                return redirect("/")


            # Busca usuários
            cursor.execute("""
                SELECT
                    u.id,
                    u.nome,
                    u.email,
                    u.admin,
                    COALESCE(p.exercicios, 0) AS exercicios,
                    COALESCE(p.pontos, 0) AS pontos,
                    COALESCE(p.nivel, 'Iniciante') AS nivel,
                    COALESCE(p.progresso, 0) AS progresso
                FROM usuarios u
                LEFT JOIN progresso p
                    ON u.id = p.usuario_id
                ORDER BY u.id
            """)

            usuarios = cursor.fetchall()


            # Quantidade de usuários
            cursor.execute("""
                SELECT COUNT(*) AS total
                FROM usuarios
            """)

            total_usuarios = cursor.fetchone()["total"]


            # Quantidade de administradores
            cursor.execute("""
                SELECT COUNT(*) AS total
                FROM usuarios
                WHERE admin = 1
            """)

            total_admins = cursor.fetchone()["total"]

    finally:
        conexao.close()


    return render_template(
        "admin.html",
        usuarios=usuarios,
        total_usuarios=total_usuarios,
        total_admins=total_admins
    )

@app.route("/admin/excluir/<int:usuario_id>")
def excluir_usuario(usuario_id):

    if "usuario_id" not in session:
        return redirect("/login")

    conexao = conectar_bd()

    try:

        with conexao.cursor() as cursor:

            # Verifica se quem está fazendo a ação é admin
            cursor.execute("""
                SELECT admin
                FROM usuarios
                WHERE id = %s
            """, (session["usuario_id"],))

            administrador = cursor.fetchone()

            if not administrador or not administrador["admin"]:
                return redirect("/")


            # Impede excluir a própria conta
            if usuario_id == session["usuario_id"]:
                flash("Você não pode excluir sua própria conta.")
                return redirect("/admin")


            # Verifica se o usuário existe
            cursor.execute("""
                SELECT id
                FROM usuarios
                WHERE id = %s
            """, (usuario_id,))

            usuario = cursor.fetchone()

            if not usuario:
                flash("Usuário não encontrado.")
                return redirect("/admin")


            # Exclui o usuário
            cursor.execute("""
                DELETE FROM usuarios
                WHERE id = %s
            """, (usuario_id,))


        conexao.commit()

        flash("Usuário excluído com sucesso.")

    finally:
        conexao.close()

    return redirect("/admin")

@app.route("/admin/toggle/<int:usuario_id>")
def toggle_admin(usuario_id):

    if "usuario_id" not in session:
        return redirect("/login")


    conexao = conectar_bd()

    try:

        with conexao.cursor() as cursor:

            cursor.execute("""
                SELECT admin
                FROM usuarios
                WHERE id = %s
            """, (session["usuario_id"],))

            administrador = cursor.fetchone()


            if not administrador or not administrador["admin"]:
                return redirect("/")

            if usuario_id == session["usuario_id"]:
                flash("Você não pode remover seu próprio acesso de administrador.")
                return redirect("/admin")

            cursor.execute("""
                SELECT admin
                FROM usuarios
                WHERE id = %s
            """, (usuario_id,))

            usuario = cursor.fetchone()


            if not usuario:
                flash("Usuário não encontrado.")
                return redirect("/admin")

            novo_valor = 0 if usuario["admin"] else 1


            cursor.execute("""
                UPDATE usuarios
                SET admin = %s
                WHERE id = %s
            """, (novo_valor, usuario_id))


        conexao.commit()


    finally:
        conexao.close()


    return redirect("/admin")

@app.route("/teste-pontos")
def teste_pontos():

    if "usuario_id" not in session:
        return redirect("/login")

    atualizar_progresso(
        session["usuario_id"],
        pontos_ganhos=10,
        exercicio_concluido=True
    )

    return redirect("/perfil")

@app.route("/aprender/pecas")
def pecas():

    if "usuario_id" not in session:
        return redirect("/login")

    return render_template("cursos/pecas.html")


@app.route("/aprender/xeque")
def xeque():
    return render_template("cursos/xeque.html")


@app.route("/aprender/taticas")
def taticas():
    return render_template("cursos/taticas.html")


@app.route("/aprender/aberturas")
def aberturas():
    return render_template("cursos/aberturas.html")



if __name__ == '__main__':
    app.run(debug=True)