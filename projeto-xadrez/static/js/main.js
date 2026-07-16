import { PLBoard }
from "./board-config/board.js";

window.addEventListener("DOMContentLoaded", ()=>{

    const elemento =
        document.getElementById("board");

    if(!elemento)
        return;

    window.PLBoard =
        new PLBoard({

            element:"board",

            draggable:true

        });

});