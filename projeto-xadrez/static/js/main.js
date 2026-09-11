import { PLBoard } from "./board-config/board.js";

console.log("Primeiro Lance Engine carregando...");

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const boardElement =
            document.getElementById("board");

        // Se a página não possui tabuleiro,
        // não faz nada.
        if (!boardElement) {
            return;
        }

        console.log(
            "Tabuleiro encontrado."
        );

        window.PLBoard =
            new PLBoard({

                element: "board",

                draggable: true

            });

        console.log(
            "PLBoard inicializado."
        );
    }
);