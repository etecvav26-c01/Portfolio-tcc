from database.connection import conectar_bd


def atualizar_progresso(
    usuario_id,
    pontos_ganhos=0,
    exercicio_concluido=False
):
    conexao = conectar_bd()

    try:
        with conexao.cursor() as cursor:
            # 1. Garante que o usuário tem um registro na tabela
            cursor.execute("""
                INSERT INTO progresso (usuario_id, exercicios, pontos, nivel, progresso)
                VALUES (%s, 0, 0, 'Iniciante', 0)
                ON DUPLICATE KEY UPDATE usuario_id = usuario_id
            """, (usuario_id,))

            # 2. Busca o progresso atualizado
            cursor.execute("""
                SELECT exercicios, pontos
                FROM progresso
                WHERE usuario_id = %s
            """, (usuario_id,))

            progresso = cursor.fetchone()

            # Trata retorno seja como dicionário (DictCursor) ou como tupla/posição
            if isinstance(progresso, dict):
                exercicios = progresso.get("exercicios", 0) or 0
                pontos = progresso.get("pontos", 0) or 0
            else:
                exercicios = progresso[0] or 0
                pontos = progresso[1] or 0

            # 3. Incrementa exercícios e pontos
            if exercicio_concluido:
                exercicios += 1

            pontos += pontos_ganhos

            # 4. Calcula o nível do usuário
            if pontos >= 500:
                nivel = "Avançado"
            elif pontos >= 250:
                nivel = "Intermediário"
            elif pontos >= 100:
                nivel = "Aprendiz"
            else:
                nivel = "Iniciante"

            # 5. Calcula o progresso percentual baseado nos pontos
            progresso_por_pontos = min(
                int((pontos / 500) * 100),
                100
            )

            # 6. Atualiza no banco de dados
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

    except Exception as e:
        conexao.rollback()
        print("ERRO AO ATUALIZAR PROGRESSO:", e)

    finally:
        conexao.close()