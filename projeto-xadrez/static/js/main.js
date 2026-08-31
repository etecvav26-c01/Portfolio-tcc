import { PLBoard } from "./board-config/board.js";

console.log("PLBoard carregado:", PLBoard);

window.PLBoard = new PLBoard({
    element: "board",
    draggable: true
});