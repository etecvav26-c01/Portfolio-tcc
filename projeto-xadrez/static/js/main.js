import { iniciarCursoPagina } from "./aprender/course-page.js";
import { iniciarExercicios } from "./exercises/exercise-page.js";

function inicializar() {
  if (!document.getElementById("board")) {
    return;
  }

  const curso = document.getElementById("course-container");

  if (curso) {
    iniciarCursoPagina(curso);
    return;
  }

  if (document.getElementById("exercise-container")) {
    iniciarExercicios();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializar);
} else {
  inicializar();
}
