export async function concluirModulo(modulo) {
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

    if (!dados.sucesso) {
      console.error("Não foi possível salvar o progresso do curso.");

      return false;
    }

    return true;
  } catch (erro) {
    console.error("Erro ao salvar progresso:", erro);

    return false;
  }
}
