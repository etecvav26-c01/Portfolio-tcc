export function iniciarCurso(board, curso) {

    if (!board || !curso) {
        return null;
    }

    window.cursoAtual = curso;

    atualizarAula();

    return curso;
}


export function atualizarAula() {

    const curso = window.cursoAtual;

    if (!curso) {
        return;
    }

    const aula = curso.getAula();

    if (!aula) {
        return;
    }


    const titulo = document.getElementById("titulo-aula");

    if (titulo) {
        titulo.textContent = aula.titulo;
    }


    const conteudo =
        document.getElementById("conteudo-aula");

    if (conteudo) {
        conteudo.innerHTML = aula.conteudo;
    }


    const numero =
        document.getElementById("numero-aula");

    if (numero) {

        numero.textContent =
            `${curso.numeroAtual()} / ${curso.totalAulas()}`;

    }


    const progresso =
        document.getElementById("progresso-aula");

    if (progresso) {

        progresso.style.width =
            `${curso.progresso()}%`;

    }


    const anterior =
        document.getElementById("btn-anterior");

    if (anterior) {

        anterior.disabled =
            curso.primeira();

    }


    const proxima =
        document.getElementById("btn-proxima");

    if (proxima) {

        proxima.textContent =
            curso.ultima()
                ? "Concluir ✓"
                : "Próxima →";

    }
}


export function proximaAula() {

    const curso = window.cursoAtual;

    if (!curso) {
        return;
    }

    if (curso.proxima()) {

        atualizarAula();

        return;
    }


    Swal.fire({
        icon: "success",
        title: "Curso concluído!",
        text: "Você concluiu todas as aulas deste módulo.",
        confirmButtonText: "Continuar"
    });

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


window.proximaAula = proximaAula;
window.aulaAnterior = aulaAnterior;