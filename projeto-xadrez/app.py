import os

from flask import Flask, render_template

from routes.admin import admin
from routes.aprender import MODULOS, aprender
from routes.auth import auth
from routes.curso import curso
from routes.exercicios import exercicios
from routes.perfil import perfil
from utils.progresso import TOTAL_EXERCICIOS

app = Flask(__name__)

# Em produção, defina SECRET_KEY no ambiente.
app.secret_key = os.environ.get("SECRET_KEY", "primeiro_lance_secret")

# Com SameSite=Lax o navegador não envia o cookie em POSTs vindos de outros
# sites, o que protege as ações do painel admin contra CSRF.
app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
)

app.register_blueprint(auth)
app.register_blueprint(perfil)
app.register_blueprint(admin)
app.register_blueprint(exercicios)
app.register_blueprint(aprender)
app.register_blueprint(curso)


@app.route("/")
def index():
    return render_template(
        "index.html",
        total_modulos=len(MODULOS),
        total_exercicios=TOTAL_EXERCICIOS,
    )


if __name__ == "__main__":
    app.run(debug=True)
