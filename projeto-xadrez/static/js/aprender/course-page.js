export function iniciarCurso(curso) {
  if (!curso) {
    console.error("Curso não encontrado.");
    return;
  }

  window.cursoAtual = curso;

  curso.iniciar();

  atualizarAula();
}

export function atualizarAula() {
  const curso = window.cursoAtual;

  if (!curso) {
    return;
  }

  const aula = curso.getAula();

  if (!aula) {
    console.error("Aula não encontrada.");
    return;
  }

  // Título
  const titulo = document.getElementById("titulo-aula");

  if (titulo) {
    titulo.textContent = aula.titulo;
  }

  // Conteúdo
  const conteudo = document.getElementById("conteudo-aula");

  if (conteudo) {
    conteudo.innerHTML = aula.conteudo;
  }

  // Número da aula
  const numero = document.getElementById("numero-aula");

  if (numero) {
    numero.textContent = `${curso.numeroAtual()} / ${curso.totalAulas()}`;
  }

  // Barra de progresso
  const progresso = document.getElementById("progresso-aula");

  if (progresso) {
    progresso.style.width = `${curso.progresso()}%`;
  }

  // Botão anterior
  const anterior = document.getElementById("btn-anterior");

  if (anterior) {
    anterior.disabled = curso.primeira();
  }

  // Botão próxima
  const proxima = document.getElementById("btn-proxima");

  if (proxima) {
    if (curso.ultima()) {
      proxima.textContent = "Concluir ✓";
    } else {
      proxima.textContent = "Próxima →";
    }
  }
}

export async function proximaAula() {
  const curso = window.cursoAtual;

  if (!curso) {
    return;
  }

  // Última aula
  if (curso.ultima()) {
    curso.concluirAula();

    atualizarAula();

    const salvo = await salvarConclusaoModulo();

    if (!salvo) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível salvar a conclusão do módulo.",
      });

      return;
    }

    Swal.fire({
      icon: "success",
      title: "Módulo concluído!",
      text: "Você terminou todas as aulas deste módulo.",
      confirmButtonText: "Continuar",
    });

    return;
  }

  // Próxima aula
  curso.proxima();

  atualizarAula();
}

export function aulaAnterior() {
  const curso = window.cursoAtual;

  if (!curso) {
    return;
  }

  if (curso.anterior()) {
    atualizarAula();
  }
}

async function salvarConclusaoModulo() {
  const container = document.getElementById("course-container");

  if (!container) {
    return false;
  }

  const modulo = container.dataset.curso;

  try {
    const resposta = await fetch("/api/curso/concluir", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        modulo: modulo,
      }),
    });

    const dados = await resposta.json();

    if (!resposta.ok || !dados.sucesso) {
      console.error("Erro ao salvar módulo:", dados);

      return false;
    }

    return true;
  } catch (erro) {
    console.error("Erro ao salvar conclusão:", erro);

    return false;
  }
}
