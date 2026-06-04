from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/aprender")
def aprender():
    return render_template("aprender.html")

@app.route("/exercicios")
def exercicios():
    return render_template("exercicios.html")

@app.route("/perfil")
def perfil():
    return render_template("perfil.html")


if __name__ == '__main__':
    app.run(debug=True)