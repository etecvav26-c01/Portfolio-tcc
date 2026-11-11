import pymysql

from database.connection import conectar_bd

# Deve bater com a quantidade de exercícios em static/js/exercises/exercises.js
TOTAL_EXERCICIOS = 40

# Maior pontuação de um exercício (os de abertura valem 25)
PONTOS_MAXIMOS_POR_EXERCICIO = 25

NIVEIS = [
    (500, "Avançado"),
    (250, "Intermediário"),
    (100, "Aprendiz"),
]


def calcular_nivel(pontos):
    for minimo, nome in NIVEIS:
        if pontos >= minimo:
            return nome

    return "Iniciante"


def registrar_exercicio(usuario_id, exercicio_id, pontos):
    """Registra a conclusão de um exercício.

    O progresso é sequencial: só é aceito o exercício seguinte ao último
    concluído. Isso impede repetir o mesmo exercício para farmar pontos e
    impede "pular" exercícios.

    Retorna um dict com o progresso atualizado ou None quando a conclusão
    não é válida (já concluído, fora de ordem ou usuário inexistente).
    Erros de banco são propagados para a rota tratar.
    """
    conexao = conectar_bd()

    try:
        with conexao.cursor() as cursor:
            # trava a linha para duas requisições simultâneas não se atropelarem
            cursor.execute(
                """
                SELECT exercicios, pontos
                FROM progresso
                WHERE usuario_id = %s
                ORDER BY id
                LIMIT 1
                FOR UPDATE
                """,
                (usuario_id,),
            )
            atual = cursor.fetchone()

            if atual is None:
                try:
                    cursor.execute(
                        "INSERT INTO progresso (usuario_id) VALUES (%s)",
                        (usuario_id,),
                    )
                except pymysql.err.IntegrityError:
                    # conta excluída enquanto a sessão ainda estava aberta
                    conexao.rollback()
                    return None

                atual = {"exercicios": 0, "pontos": 0}

            concluidos = atual["exercicios"] or 0

            if exercicio_id != concluidos + 1 or exercicio_id > TOTAL_EXERCICIOS:
                conexao.rollback()
                return None

            exercicios = concluidos + 1
            pontos_total = (atual["pontos"] or 0) + pontos
            nivel = calcular_nivel(pontos_total)

            # progresso geral = exercícios concluídos / total de exercícios
            percentual = min(exercicios * 100 // TOTAL_EXERCICIOS, 100)

            cursor.execute(
                """
                UPDATE progresso
                SET exercicios = %s, pontos = %s, nivel = %s, progresso = %s
                WHERE usuario_id = %s
                """,
                (exercicios, pontos_total, nivel, percentual, usuario_id),
            )

        conexao.commit()

    except Exception:
        conexao.rollback()
        raise

    finally:
        conexao.close()

    return {
        "exercicios": exercicios,
        "pontos_total": pontos_total,
        "nivel": nivel,
        "progresso": percentual,
    }
