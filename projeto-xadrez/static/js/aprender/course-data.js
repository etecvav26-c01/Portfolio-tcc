export const cursos = {
  pecas: {
    titulo: "Peças do Xadrez",

    aulas: [
      {
        titulo: "Peão",

        conteudo: `
                    <p>
                        O peão é a peça mais numerosa do xadrez.
                        Cada jogador começa a partida com oito peões.
                    </p>

                    <p>
                        Normalmente, o peão movimenta-se uma casa
                        para frente. Em seu primeiro movimento,
                        pode avançar duas casas.
                    </p>

                    <p>
                        Para capturar uma peça adversária,
                        o peão se movimenta uma casa na diagonal
                        para frente.
                    </p>
                `,

        fen: "8/8/8/8/8/3P4/8/8 w - - 0 1",
      },

      {
        titulo: "Torre",

        conteudo: `
                    <p>
                        A torre pode se movimentar qualquer quantidade
                        de casas na horizontal ou na vertical.
                    </p>

                    <p>
                        Ela não pode passar por cima de outras peças.
                    </p>

                    <p>
                        As torres são especialmente importantes
                        em posições abertas e no final da partida.
                    </p>
                `,

        fen: "8/8/8/8/8/8/8/R7 w - - 0 1",
      },

      {
        titulo: "Bispo",

        conteudo: `
                    <p>
                        O bispo movimenta-se na diagonal e pode
                        percorrer várias casas de uma só vez.
                    </p>

                    <p>
                        Cada bispo permanece sempre na mesma cor
                        de casa em que começou a partida.
                    </p>
                `,

        fen: "8/8/8/8/8/8/8/2B5 w - - 0 1",
      },

      {
        titulo: "Cavalo",

        conteudo: `
                    <p>
                        O cavalo possui um movimento diferente
                        das outras peças.
                    </p>

                    <p>
                        Ele se movimenta formando um "L":
                        duas casas em uma direção e uma casa
                        perpendicularmente.
                    </p>

                    <p>
                        É a única peça que pode saltar por cima
                        de outras peças.
                    </p>
                `,

        fen: "8/8/8/8/8/8/8/1N6 w - - 0 1",
      },

      {
        titulo: "Dama",

        conteudo: `
                    <p>
                        A dama é a peça de maior valor relativo
                        do xadrez.
                    </p>

                    <p>
                        Ela combina os movimentos da torre e do bispo.
                    </p>

                    <p>
                        Portanto, pode se movimentar na horizontal,
                        vertical e diagonal.
                    </p>
                `,

        fen: "8/8/8/8/8/8/8/3Q4 w - - 0 1",
      },

      {
        titulo: "Rei",

        conteudo: `
                    <p>
                        O rei é a peça mais importante do jogo.
                    </p>

                    <p>
                        Ele pode se movimentar uma casa
                        em qualquer direção.
                    </p>

                    <p>
                        O rei não pode se movimentar para uma casa
                        controlada por uma peça adversária.
                    </p>
                `,

        fen: "8/8/8/8/8/8/8/4K3 w - - 0 1",
      },
    ],
  },

  xeque: {
    titulo: "Xeque e Xeque-mate",

    aulas: [
      {
        titulo: "O que é xeque?",

        conteudo: `
                    <p>
                        O xeque acontece quando o rei está sendo
                        diretamente atacado por uma peça adversária.
                    </p>

                    <p>
                        Quando o rei está em xeque, o jogador precisa
                        realizar uma jogada que elimine essa ameaça.
                    </p>
                `,

        fen: "6k1/8/8/8/8/8/5R2/6K1 b - - 0 1",
      },

      {
        titulo: "Xeque-mate",

        conteudo: `
                    <p>
                        O xeque-mate acontece quando o rei está em xeque
                        e não existe nenhuma jogada legal capaz de escapar
                        da ameaça.
                    </p>

                    <p>
                        O objetivo principal do xadrez é aplicar
                        xeque-mate no rei adversário.
                    </p>
                `,

        fen: "7k/6Q1/6K1/8/8/8/8/8 b - - 0 1",
      },
    ],
  },

  taticas: {
    titulo: "Táticas de Xadrez",

    aulas: [
      {
        titulo: "Garfo",

        conteudo: `
                    <p>
                        O garfo acontece quando uma única peça
                        ataca duas ou mais peças adversárias
                        ao mesmo tempo.
                    </p>

                    <p>
                        O cavalo é especialmente conhecido por
                        realizar garfos devido ao seu movimento.
                    </p>
                `,
      },

      {
        titulo: "Cravada",

        conteudo: `
                    <p>
                        A cravada acontece quando uma peça não pode
                        se movimentar porque atrás dela existe
                        uma peça mais importante.
                    </p>

                    <p>
                        Quando a peça protegida é o rei,
                        temos uma cravada absoluta.
                    </p>
                `,
      },

      {
        titulo: "Ataque descoberto",

        conteudo: `
                    <p>
                        O ataque descoberto acontece quando uma peça
                        se movimenta e revela o ataque de outra peça
                        que estava atrás dela.
                    </p>

                    <p>
                        Esse recurso pode criar ameaças simultâneas
                        e é bastante utilizado em combinações táticas.
                    </p>
                `,
      },
    ],
  },

  aberturas: {
    titulo: "Princípios de Abertura",

    aulas: [
      {
        titulo: "Controle do centro",

        conteudo: `
                    <p>
                        No início da partida, é importante disputar
                        o controle das casas centrais do tabuleiro.
                    </p>

                    <p>
                        As casas centrais permitem que as peças tenham
                        maior mobilidade e influência sobre o jogo.
                    </p>
                `,

        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
      },

      {
        titulo: "Desenvolvimento",

        conteudo: `
                    <p>
                        Desenvolver significa colocar as peças em casas
                        onde elas participem ativamente da partida.
                    </p>

                    <p>
                        Cavalos e bispos normalmente devem ser
                        desenvolvidos antes de movimentar várias vezes
                        a mesma peça.
                    </p>
                `,
      },

      {
        titulo: "Roque",

        conteudo: `
                    <p>
                        O roque é um movimento especial que envolve
                        o rei e uma das torres.
                    </p>

                    <p>
                        Ele permite colocar o rei em uma posição
                        geralmente mais segura e desenvolver a torre.
                    </p>
                `,
      },
    ],
  },
};
