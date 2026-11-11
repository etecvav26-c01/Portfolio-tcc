-- ============================================================
-- Migração para bancos JÁ EXISTENTES (primeiro_lance)
-- Rode uma vez:  mysql -u root -p primeiro_lance < migracao_correcoes.sql
-- (instalações novas já vêm corretas em primeiro_lance.sql)
-- ============================================================

-- 1) A tabela `progresso` não tinha UNIQUE em usuario_id, então cada exercício
--    concluído inseria uma linha nova (o usuário 1, por exemplo, tinha 4 linhas).
--    Mantém só a primeira linha de cada usuário (todas tinham os mesmos valores).
DELETE p1
FROM progresso p1
JOIN progresso p2
  ON p1.usuario_id = p2.usuario_id
 AND p1.id > p2.id;

-- 2) Garante uma única linha por usuário daqui para frente.
ALTER TABLE progresso
  ADD UNIQUE KEY uq_progresso_usuario (usuario_id);

-- 3) O progresso geral agora é "exercícios concluídos / 40" (antes: pontos / 500,
--    que chegava a 100% antes de terminar os exercícios). Recalcula o que já existe.
UPDATE progresso
SET progresso = LEAST(FLOOR(exercicios * 100 / 40), 100);

-- 4) Excluir um usuário no painel admin falhava se ele tivesse partidas.
--    Se der erro no DROP, veja o nome real da FK com:  SHOW CREATE TABLE partidas;
ALTER TABLE partidas DROP FOREIGN KEY `1`;
ALTER TABLE partidas
  ADD CONSTRAINT fk_partidas_usuario
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE;
