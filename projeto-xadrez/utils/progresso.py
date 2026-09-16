from database.connection import conectar_bd


def atualizar_progresso(
    usuario_id,
    pontos_ganhos=0,
    exercicio_concluido=False
):

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