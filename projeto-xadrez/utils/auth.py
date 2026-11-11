from functools import wraps

from flask import redirect, session

from database.connection import conectar_bd


def login_required(rota):
    """Redireciona para o login quando não há usuário na sessão."""

    @wraps(rota)
    def protegida(*args, **kwargs):
        if "usuario_id" not in session:
            return redirect("/login")
        return rota(*args, **kwargs)

    return protegida


def usuario_e_admin():
    """Consulta o banco (não confia só na sessão) para saber se é admin."""
    if "usuario_id" not in session:
        return False

    conexao = conectar_bd()

    try:
        with conexao.cursor() as cursor:
            cursor.execute(
                "SELECT admin FROM usuarios WHERE id = %s",
                (session["usuario_id"],),
            )
            usuario = cursor.fetchone()
    finally:
        conexao.close()

    e_admin = bool(usuario and usuario["admin"])

    # mantém o menu em sincronia caso a permissão tenha mudado
    session["admin"] = e_admin

    return e_admin


def admin_required(rota):
    @wraps(rota)
    def protegida(*args, **kwargs):
        if not usuario_e_admin():
            return redirect("/")
        return rota(*args, **kwargs)

    return protegida
