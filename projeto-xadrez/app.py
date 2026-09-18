from flask import Flask, render_template


from routes.auth import auth
from routes.perfil import perfil
from routes.admin import admin
from routes.aprender import aprender
from routes.exercicios import exercicios
from routes.curso import curso

app = Flask(__name__)

app.secret_key = "primeiro_lance_secret"


app.register_blueprint(auth)
app.register_blueprint(perfil)
app.register_blueprint(admin)
app.register_blueprint(aprender)
app.register_blueprint(exercicios)


@app.route("/")
def index():

    return render_template(
        "index.html"
    )


if __name__ == "__main__":
    app.run(debug=True)