export function iniciarCurso(board, curso) {

    if (!board || !curso) {
        console.error("Board ou curso não encontrado.");
        return;
    }

    window.cursoAtual = curso;

    curso.iniciar();

    atualizarAula();
}


export function atualizarAula() {

    const curso = window.cursoAtual;

    if (!curso) {
        console.error("Curso atual não encontrado.");
        return;
    }

    const aula = curso.getAula();

    if (!aula) {
        console.error("Aula não encontrada.");
        return;
    }


    // TÍTULO

    const titulo =
        document.getElementById("titulo-aula");

    if (titulo) {
        titulo.textContent = aula.titulo;
    }


    // CONTEÚDO

    const conteudo =
        document.getElementById("conteudo-aula");

    if (conteudo) {
        conteudo.innerHTML = aula.conteudo;
    }


    // NÚMERO DA AULA

    const numero =
        document.getElementById("numero-aula");

    if (numero) {

        numero.textContent =
            `${curso.numeroAtual()} / ${curso.totalAulas()}`;
    }


    // BARRA DE PROGRESSO

    const progresso =
        document.getElementById("progresso-aula");

    if (progresso) {

        progresso.style.width =
            `${curso.progresso()}%`;
    }


    // BOTÃO ANTERIOR

    const anterior =
        document.getElementById("btn-anterior");

    if (anterior) {

        anterior.disabled =
            curso.primeira();
    }


    // BOTÃO PRÓXIMO

    const proxima =
        document.getElementById("btn-proxima");

    if (proxima) {

        proxima.textContent =
            curso.ultima()
                ? "Concluir ✓"
                : "Próxima →";
    }
}


export async function proximaAula() {

    const curso = window.cursoAtual;

    if (!curso) {
        return;
    }


    // ÚLTIMA AULA

    if (curso.ultima()) {

        curso.concluirAula();

        atualizarAula();

        await salvarConclusaoModulo();

        Swal.fire({
            icon: "success",
            title: "Módulo concluído!",
            text: "Você terminou todas as aulas deste módulo.",
            confirmButtonText: "Continuar"
        });

        return;
    }


    // AULAS NORMAIS

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

    const container =
        document.getElementById("course-container");

    if (!container) {
        return;
    }

    const modulo =
        container.dataset.curso;

    try {

        const resposta =
            await fetch(
                "/api/curso/concluir",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        modulo: modulo
                    })
                }
            );


        const dados =
            await resposta.json();


        if (!dados.sucesso) {

            console.error(
                "Erro ao salvar conclusão do módulo."
            );
        }

    } catch (erro) {

        console.error(
            "Erro ao conectar com o servidor:",
            erro
        );
    }
}


// Disponibiliza para os botões HTML

window.proximaAula = proximaAula;

window.aulaAnterior = aulaAnterior;