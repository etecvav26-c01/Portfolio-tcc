import { PLBoard } from "./board-config/board.js";

import { ExerciseManager } from "./exercises/exercise-manager.js";

import { exercises } from "./exercises/exercises.js";

import { PLCourse } from "./aprender/course.js";

import { cursos } from "./aprender/course-data.js";

import {
  iniciarCurso,
  atualizarAula,
  proximaAula,
  aulaAnterior,
} from "./aprender/course-page.js";

document.addEventListener("DOMContentLoaded", inicializar);

function inicializar() {
  const boardElement = document.getElementById("board");

  if (!boardElement) {
    return;
  }

  /*
    ============================================================
    CURSO
    ============================================================
    */

  const courseContainer = document.getElementById("course-container");

  if (courseContainer) {
    iniciarCursoPagina(courseContainer);

    return;
  }

  /*
    ============================================================
    EXERCÍCIOS
    ============================================================
    */

  const exerciseContainer = document.getElementById("exercise-container");

  if (exerciseContainer) {
    iniciarExercicios(exerciseContainer);
  }
}

/*
============================================================
CURSO
============================================================
*/

function iniciarCursoPagina(container) {
  const modulo = container.dataset.curso;

  const cursoData = cursos[modulo];

  if (!cursoData) {
    console.error("Curso não encontrado:", modulo);

    return;
  }

  /*
    Tabuleiro demonstrativo:
    NÃO pode ser movimentado.
    */

  const board = new PLBoard("board", {
    allowMove: false,
  });

  window.board = board;

  const curso = new PLCourse(board, cursoData);

  window.cursoAtual = curso;

  iniciarCurso(curso);

  /*
    Botões do curso
    */

  const btnAnterior = document.getElementById("btn-anterior");

  const btnProxima = document.getElementById("btn-proxima");

  if (btnAnterior) {
    btnAnterior.onclick = aulaAnterior;
  }

  if (btnProxima) {
    btnProxima.onclick = proximaAula;
  }
}

/*
============================================================
EXERCÍCIOS
============================================================
*/

function iniciarExercicios(container) {
  const board = new PLBoard("board", {
    allowMove: true,
  });

  window.board = board;

  /*
    Filtra pelo tema, se existir.
    */

  const tema = container.dataset.tema;

  let lista = exercises;

  if (tema) {
    lista = exercises.filter((exercicio) => exercicio.tema === tema);
  }

  if (!lista.length) {
    console.error("Nenhum exercício encontrado.");

    return;
  }

  const manager = new ExerciseManager(board, lista);

  window.exerciseManager = manager;

  /*
    Quando uma peça é movimentada,
    verifica a jogada.
    */

  board.onMove = verificarJogada;

  /*
    Deixa as funções disponíveis
    para os onclick="" do HTML.
    */

  window.proximoExercicio = proximoExercicio;

  window.reiniciarExercicio = reiniciarExercicio;

  atualizarExercicio();
}

/*
============================================================
VERIFICAR JOGADA
============================================================
*/

async function verificarJogada(move) {
  const manager = window.exerciseManager;

  if (!manager) {
    return;
  }

  const resultado = manager.checkMove(move);

  if (!resultado) {
    return;
  }

  const feedback = document.getElementById("exercise-feedback");

  /*
    JOGADA ERRADA
    */

  if (!resultado.correct) {
    if (feedback) {
      feedback.innerHTML = `
                <div class="alert alert-danger">
                    ❌ Jogada incorreta. Tente novamente.
                </div>
            `;
    }

    /*
        O tabuleiro precisa voltar
        para a posição original.
        */

    manager.reset();

    return;
  }

  /*
    JOGADA CORRETA, MAS AINDA NÃO TERMINOU
    */

  if (!resultado.finished) {
    if (feedback) {
      feedback.innerHTML = `
                <div class="alert alert-success">
                    ✓ Boa jogada! Continue.
                </div>
            `;
    }

    return;
  }

  /*
    EXERCÍCIO CONCLUÍDO
    */

  await salvarProgresso(resultado.pontos);

  const nextButton = document.getElementById("next-exercise");

  if (nextButton) {
    nextButton.disabled = false;
  }

  if (feedback) {
    feedback.innerHTML = `
            <div class="alert alert-success">
                <strong>✓ Exercício concluído!</strong><br>
                +${resultado.pontos} pontos
            </div>
        `;
  }
}

/*
============================================================
ATUALIZAR EXERCÍCIO
============================================================
*/

function atualizarExercicio() {
  const manager = window.exerciseManager;

  if (!manager) {
    return;
  }

  const exercicio = manager.getCurrent();

  if (!exercicio) {
    return;
  }

  /*
    Título
    */

  const titulo = document.getElementById("exercise-title");

  if (titulo) {
    titulo.textContent = exercicio.nome;
  }

  /*
    Descrição
    */

  const descricao = document.getElementById("exercise-description");

  if (descricao) {
    descricao.textContent = exercicio.descricao;
  }

  /*
    Número
    */

  const numero = document.getElementById("exercise-number");

  if (numero) {
    numero.textContent = `${manager.getCurrentNumber()} / ${manager.getTotal()}`;
  }

  /*
    Limpa feedback
    */

  const feedback = document.getElementById("exercise-feedback");

  if (feedback) {
    feedback.innerHTML = "";
  }

  /*
    Botão próximo
    */

  const nextButton = document.getElementById("next-exercise");

  if (nextButton) {
    nextButton.disabled = !exercicio.isFinished();
  }
}

/*
============================================================
PRÓXIMO EXERCÍCIO
============================================================
*/

function proximoExercicio() {
  const manager = window.exerciseManager;

  if (!manager) {
    return;
  }

  /*
    Só pode avançar depois de concluir.
    */

  const exercicio = manager.getCurrent();

  if (!exercicio || !exercicio.isFinished()) {
    return;
  }

  /*
    Último exercício
    */

  if (manager.isLast()) {
    const feedback = document.getElementById("exercise-feedback");

    if (feedback) {
      feedback.innerHTML = `
                <div class="alert alert-warning">
                    🏆 Você concluiu todos os exercícios!
                    <br>
                    Pontuação: ${manager.getScore()} pontos.
                </div>
            `;
    }

    const nextButton = document.getElementById("next-exercise");

    if (nextButton) {
      nextButton.disabled = true;

      nextButton.textContent = "Exercícios concluídos ✓";
    }

    return;
  }

  /*
    Vai para o próximo.
    */

  const sucesso = manager.next();

  if (!sucesso) {
    return;
  }

  atualizarExercicio();
}

/*
============================================================
REINICIAR EXERCÍCIO
============================================================
*/

function reiniciarExercicio() {
  const manager = window.exerciseManager;

  if (!manager) {
    return;
  }

  /*
    Volta o exercício atual
    para a posição inicial.
    */

  manager.reset();

  atualizarExercicio();
}

/*
============================================================
SALVAR PROGRESSO
============================================================
*/

async function salvarProgresso(pontos) {
  try {
    const resposta = await fetch("/api/exercicio/concluir", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        pontos: pontos,
      }),
    });

    const dados = await resposta.json();

    if (!resposta.ok || !dados.sucesso) {
      console.error("Erro ao salvar progresso:", dados);

      return false;
    }

    return true;
  } catch (erro) {
    console.error("Erro ao salvar progresso:", erro);

    return false;
  }
}
