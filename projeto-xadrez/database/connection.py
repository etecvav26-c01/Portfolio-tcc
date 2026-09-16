import pymysql


def conectar_bd():

    return pymysql.connect(
        host="localhost",
        user="root",
        password="pokemon.09",
        database="primeiro_lance",
        cursorclass=pymysql.cursors.DictCursor
    )