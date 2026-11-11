import os

import pymysql


def conectar_bd():
    """Abre uma conexão com o banco.

    Os valores podem ser trocados por variáveis de ambiente
    (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME). Sem elas, usa o padrão local.
    """
    return pymysql.connect(
        host=os.environ.get("DB_HOST", "localhost"),
        user=os.environ.get("DB_USER", "root"),
        password=os.environ.get("DB_PASSWORD", "pokemon.09"),
        database=os.environ.get("DB_NAME", "primeiro_lance"),
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor,
    )
