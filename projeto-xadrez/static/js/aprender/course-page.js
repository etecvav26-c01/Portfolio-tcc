import { PLBoard } from "../board-config/board.js";
import { PLCourse } from "./course.js";
import { cursos } from "./course-data.js";

const $ = (id) => document.getElementById(id);

async function salvarConclusaoModulo(modulo) {
  try {
    const resposta = await fetch("/api/curso/concluir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modulo }),
    });

    const dados = await resposta.json();

    return resposta.ok && dados.sucesso;
  } catch (erro) {
    console.error("Erro ao salvar conclusão:", erro);
    return false;
  }
}

function avisarErro() {
  const texto = "Não foi possível salvar sua conclusão. Tente novamente.";

  if (window.Swal) {
    Swal.fire({
      icon: "error",
      title: "Ops!",
      text: texto,
      background: "#1E1E1E",
      color: "#F5F5F5",
      confirmButtonColor: "#C9A227",
    });
  } else {
    alert(texto);
  }
}

export function iniciarCursoPagina(container) {
  const modulo = container.dataset.curso;
  const dados = cursos[modulo];

  if (!dados) {
    console.error("Curso não encontrado:", modulo);
    return;
  }

  // Tabuleiro demonstrativo: não pode ser movimentado
  const board = new PLBoard("board", { allowMove: false });
  const curso = new PLCourse(board, dados);

  const anterior = $("btn-anterior");
  const proxima = $("btn-proxima");
  const barra = $("progresso-aula");

  function atualizar() {
    const aula = curso.getAula();

    $("titulo-aula").textContent = aula.titulo;
    // conteúdo próprio do projeto (course-data.js), não vem do usuário
    $("conteudo-aula").innerHTML = aula.conteudo;
    $("numero-aula").textContent = `${curso.numeroAtual()} / ${curso.totalAulas()}`;

    barra.style.width = `${curso.progresso()}%`;
    barra.setAttribute("aria-valuenow", curso.progresso());

    anterior.disabled = curso.primeira();
    proxima.textContent = curso.ultima() ? "Concluir ✓" : "Próxima →";
  }

  anterior.addEventListener("click", () => {
    if (curso.anterior()) {
      atualizar();
    }
  });

  proxima.addEventListener("click", async () => {
    if (!curso.ultima()) {
      curso.proxima();
      atualizar();
      return;
    }

    // Última aula: grava que o módulo foi concluído e volta para a lista
    proxima.disabled = true;

    if (await salvarConclusaoModulo(modulo)) {
      window.location.href = "/aprender";
      return;
    }

    proxima.disabled = false;
    avisarErro();
  });

  curso.iniciar();
  atualizar();
}
