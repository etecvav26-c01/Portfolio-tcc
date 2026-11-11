import { PLBoard } from "../board-config/board.js";
import { ExerciseManager } from "./exercise-manager.js";
import { exercises } from "./exercises.js";

const $ = (id) => document.getElementById(id);

/*
  Quantos exercícios o usuário já concluiu (guardado no banco).
  Devolve null se não for possível consultar.
*/
async function buscarConcluidos() {
  try {
    const resposta = await fetch("/api/exercicio/atual");
    const dados = await resposta.json();

    if (resposta.ok && dados.sucesso) {
      return dados.exercicios_concluidos;
    }
  } catch (erro) {
    console.error("Erro ao buscar progresso:", erro);
  }

  return null;
}

async function salvarProgresso(exercicioId, pontos) {
  try {
    const resposta = await fetch("/api/exercicio/concluir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exercicio_id: exercicioId, pontos }),
    });

    const dados = await resposta.json();

    return { ok: resposta.ok && dados.sucesso, status: resposta.status, dados };
  } catch (erro) {
    console.error("Erro ao salvar progresso:", erro);

    return { ok: false, status: 0, dados: {} };
  }
}

export async function iniciarExercicios() {
  const ui = {
    titulo: $("exercise-title"),
    descricao: $("exercise-description"),
    numero: $("exercise-number"),
    vez: $("exercise-turn"),
    feedback: $("exercise-feedback"),
    proximo: $("next-exercise"),
    tentar: $("retry-exercise"),
    barra: $("exercise-progress"),
    feitos: $("exercise-done"),
  };

  const total = exercises.length;

  function mostrar(tipo, html) {
    ui.feedback.innerHTML = `<div class="alert alert-${tipo}" role="status">${html}</div>`;
  }

  const board = new PLBoard("board", { allowMove: true });
  const concluidos = await buscarConcluidos();

  /*
    Sem o progresso do banco não dá para saber qual é o exercício atual
    (e o servidor recusaria o salvamento), então não deixamos jogar.
  */
  if (concluidos === null) {
    board.allowMove = false;
    ui.proximo.disabled = true;
    ui.tentar.disabled = true;
    mostrar("danger", "Não foi possível carregar seu progresso. Recarregue a página.");
    return;
  }

  let feitos = concluidos;
  const terminouTudo = concluidos >= total;

  const manager = new ExerciseManager(
    board,
    exercises,
    terminouTudo ? total - 1 : concluidos
  );

  function atualizarBarra() {
    const percentual = Math.round((feitos / total) * 100);

    ui.barra.style.width = `${percentual}%`;
    ui.barra.setAttribute("aria-valuenow", percentual);
    ui.feitos.textContent = `${feitos} de ${total} concluídos`;
  }

  function renderizar() {
    const exercicio = manager.getCurrent();

    ui.titulo.textContent = exercicio.nome;
    ui.descricao.textContent = exercicio.descricao;
    ui.numero.textContent = `${manager.getCurrentNumber()} / ${manager.getTotal()}`;
    ui.vez.textContent = board.turn() === "w" ? "⚪ Brancas jogam" : "⚫ Pretas jogam";
    ui.feedback.innerHTML = "";
    ui.proximo.disabled = !exercicio.isFinished();
    ui.tentar.disabled = exercicio.isFinished();

    atualizarBarra();
  }

  async function concluir(pontos) {
    // trava o tabuleiro enquanto salva: evita registrar duas vezes
    board.allowMove = false;
    ui.tentar.disabled = true;

    const resposta = await salvarProgresso(manager.getCurrent().id, pontos);

    if (!resposta.ok) {
      if (resposta.status === 409) {
        mostrar("warning", "Seu progresso mudou em outra aba. Recarregue a página.");
      } else {
        mostrar("warning", "Não foi possível salvar seu progresso. Tente resolver de novo.");
        manager.reset();
        ui.tentar.disabled = false;
      }

      return;
    }

    feitos = resposta.dados.exercicios;
    atualizarBarra();

    const resumo = `+${pontos} pontos · Total: ${resposta.dados.pontos_total}`;

    if (manager.isLast()) {
      mostrar("success", `<strong>🏆 Você concluiu todos os exercícios!</strong><br>${resumo}`);
      ui.proximo.textContent = "Exercícios concluídos ✓";
      return;
    }

    mostrar("success", `<strong>✓ Exercício concluído!</strong><br>${resumo}`);
    ui.proximo.disabled = false;
  }

  board.onMove = (move) => {
    const resultado = manager.checkMove(move);

    if (!resultado.correct) {
      mostrar("danger", "❌ Jogada incorreta. Tente novamente.");
      return false; // o tabuleiro desfaz a jogada
    }

    if (!resultado.finished) {
      mostrar("success", "✓ Boa jogada! Continue.");
      return true;
    }

    concluir(resultado.pontos);
    return true;
  };

  ui.proximo.addEventListener("click", () => {
    if (manager.getCurrent().isFinished() && manager.next()) {
      renderizar();
    }
  });

  ui.tentar.addEventListener("click", () => {
    manager.reset();
    renderizar();
  });

  renderizar();

  if (terminouTudo) {
    board.allowMove = false;
    ui.proximo.disabled = true;
    ui.proximo.textContent = "Exercícios concluídos ✓";
    ui.tentar.disabled = true;
    mostrar("success", `<strong>🏆 Você concluiu todos os ${total} exercícios!</strong>`);
  }
}
