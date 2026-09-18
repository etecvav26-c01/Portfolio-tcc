import { PLBoard } from "./board-config/board.js";

import { ExerciseManager } from "./exercises/exercise-manager.js";
import { exercises } from "./exercises/exercises.js";

import { PLCourse } from "./aprender/course.js";
import { cursos } from "./aprender/course-data.js";

import {
    atualizarAula
} from "./aprender/course-page.js";


console.log("Primeiro Lance Engine carregando...");


document.addEventListener("DOMContentLoaded", () => {

    const boardElement =
        document.getElementById("board");

    /*
     * Nenhuma página com tabuleiro
     */
    if (!boardElement) {
        return;
    }


    console.log("Tabuleiro encontrado.");


    window.PLBoard =
        new PLBoard({
            element: "board",
            draggable: true
        });


    /*
     * ==========================================
     * CURSO
     * ==========================================
     */

    const conteudoAula =
        document.getElementById("conteudo-aula");


    if (conteudoAula) {

        let tipoCurso = "pecas";


        const pagina =
            document.body.dataset.curso;


        if (pagina) {
            tipoCurso = pagina;
        }


        const curso =
            cursos[tipoCurso];


        if (curso) {

            window.cursoAtual =
                new PLCourse(
                    window.PLBoard,
                    curso
                );


            window.cursoAtual.iniciar();

            atualizarAula();

        }

    }


    /*
     * ==========================================
     * EXERCÍCIOS
     * ==========================================
     */

    const exerciseContainer =
        document.getElementById(
            "exercise-container"
        );


    if (exerciseContainer) {

        window.exerciseManager =
            new ExerciseManager(
                window.PLBoard,
                exercises
            );


        window.PLBoard.onMove =
            (move) => {
                verificarJogada(move);
            };


        atualizarExercicio();

    }


    console.log("PLBoard inicializado.");

});


/*
 * ==========================================
 * EXERCÍCIOS
 * ==========================================
 */

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


    if (!mensagem) {
        return;
    }


    if (result.correct) {

        if (result.finished) {

            mensagem.innerHTML =
                `
                <div class="alert alert-success">
                    ✅ Exercício concluído!
                    <strong>
                        +${result.pontos} pontos
                    </strong>
                </div>
                `;


            const botao =
                document.getElementById(
                    "next-exercise"
                );


            if (botao) {
                botao.disabled = false;
            }


            salvarProgresso(
                result.pontos
            );

        } else {

            mensagem.innerHTML =
                `
                <div class="alert alert-success">
                    ✅ Jogada correta!
                </div>
                `;

        }

    } else {

        window.PLBoard.undo();


        mensagem.innerHTML =
            `
            <div class="alert alert-danger">
                ❌ Jogada incorreta.
                Tente novamente!
            </div>
            `;

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

    const manager =
        window.exerciseManager;


    if (!manager) {
        return;
    }


    const exercise =
        manager.getCurrent();


    if (!exercise) {
        return;
    }


    const titulo =
        document.getElementById(
            "exercise-title"
        );


    const descricao =
        document.getElementById(
            "exercise-description"
        );


    const numero =
        document.getElementById(
            "exercise-number"
        );


    const feedback =
        document.getElementById(
            "exercise-feedback"
        );


    const proximo =
        document.getElementById(
            "next-exercise"
        );


    if (titulo) {
        titulo.textContent =
            exercise.nome;
    }


    if (descricao) {
        descricao.textContent =
            exercise.descricao;
    }


    if (numero) {

        numero.textContent =
            `${manager.getCurrentNumber()} / ${manager.getTotal()}`;

    }


    if (feedback) {
        feedback.innerHTML = "";
    }


    if (proximo) {
        proximo.disabled = true;
    }

}


window.proximoExercicio = function () {

    const manager =
        window.exerciseManager;


    if (!manager) {
        return;
    }


    if (manager.next()) {

        atualizarExercicio();

    } else {

        const feedback =
            document.getElementById(
                "exercise-feedback"
            );


        if (feedback) {

            feedback.innerHTML =
                `
                <div class="alert alert-warning">
                    🏆 Você concluiu todos os exercícios!
                    <br>
                    Pontuação:
                    <strong>
                        ${manager.getScore()}
                    </strong>
                </div>
                `;

        }


        const botao =
            document.getElementById(
                "next-exercise"
            );


        if (botao) {
            botao.disabled = true;
        }

    }

};


window.reiniciarExercicio = function () {

    const manager =
        window.exerciseManager;


    if (!manager) {
        return;
    }


    manager.reset();

    atualizarExercicio();

};