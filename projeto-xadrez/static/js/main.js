import { PLBoard } from "./board-config/board.js";
import { ExerciseManager } from "./exercises/exercise-manager.js";
import { exercises } from "./exercises/exercises.js";

console.log("Primeiro Lance Engine carregando...");

document.addEventListener("DOMContentLoaded", () => {
  const boardElement = document.getElementById("board");

  if (!boardElement) {
    return;
  }

  console.log("Tabuleiro encontrado.");

  window.PLBoard = new PLBoard({
    element: "board",

    draggable: true,
  });

  // Se a página possuir
  // sistema de exercícios

  if (document.getElementById("exercise-container")) {
    window.exerciseManager = new ExerciseManager(window.PLBoard, exercises);

    window.PLBoard.onMove = (move) => {
      verificarJogada(move);
    };

    atualizarExercicio();
  }

  console.log("PLBoard inicializado.");
});

function verificarJogada(move) {

    if (!window.exerciseManager) {
        return;
    }


    const result =
        window.exerciseManager.checkMove(move);


    if (!result) {
        return;
    }


    const mensagem =
        document.getElementById(
            "exercise-feedback"
        );


    // ==========================================
    // JOGADA CORRETA
    // ==========================================

    if (result.correct) {

        if (result.finished) {

            mensagem.innerHTML =
                `<div class="alert alert-success">
                    ✅ Exercício concluído!
                    <strong>+${result.pontos} pontos</strong>
                </div>`;


            document.getElementById(
                "next-exercise"
            ).disabled = false;


            salvarProgresso(
                result.pontos
            );

        } else {

            mensagem.innerHTML =
                `<div class="alert alert-success">
                    ✅ Jogada correta!
                </div>`;
        }

    }


    // ==========================================
    // JOGADA ERRADA
    // ==========================================

    else {

        // Volta a posição anterior
        window.PLBoard.undo();


        mensagem.innerHTML =
            `<div class="alert alert-danger">
                ❌ Jogada incorreta.
                Tente novamente!
            </div>`;
    }
}
async function salvarProgresso(pontos) {

    try {

        const resposta =
            await fetch(
                "/api/exercicio/concluir",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        pontos: pontos
                    })
                }
            );


        const dados =
            await resposta.json();


        if (!dados.sucesso) {

            console.error(
                "Erro ao salvar progresso."
            );

        }

    } catch (erro) {

        console.error(
            "Erro ao conectar com o servidor:",
            erro
        );
    }
}

function atualizarExercicio() {
  const manager = window.exerciseManager;

  if (!manager) {
    return;
  }

  const exercise = manager.getCurrent();

  if (!exercise) {
    return;
  }

  document.getElementById("exercise-title").textContent = exercise.nome;

  document.getElementById("exercise-description").textContent =
    exercise.descricao;

  document.getElementById("exercise-number").textContent =
    `${manager.getCurrentNumber()} / ${manager.getTotal()}`;

  document.getElementById("exercise-feedback").innerHTML = "";

  document.getElementById("next-exercise").disabled = true;
}

window.proximoExercicio = function () {
  const manager = window.exerciseManager;

  if (!manager) {
    return;
  }

  if (manager.next()) {
    atualizarExercicio();
  } else {
    document.getElementById("exercise-feedback").innerHTML =
      `<div class="alert alert-warning">
                🏆 Você concluiu todos os exercícios!
                <br>
                Pontuação: 
                <strong>
                    ${manager.getScore()}
                </strong>
            </div>`;

    document.getElementById("next-exercise").disabled = true;
  }
};

window.reiniciarExercicio = function () {
  const manager = window.exerciseManager;

  if (!manager) {
    return;
  }

  manager.reset();

  atualizarExercicio();
};
