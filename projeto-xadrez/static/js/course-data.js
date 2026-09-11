export const courseModules = [
  {
    id: "pecas",

    titulo: "Movimento das Peças",

    descricao: "Aprenda como cada peça se movimenta no tabuleiro.",

    aulas: [
      {
        titulo: "O Peão",

        texto:
          "O peão normalmente avança uma casa para frente e captura peças nas diagonais.",

        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },

      {
        titulo: "A Torre",

        texto:
          "A torre se movimenta em linhas retas, na horizontal ou vertical.",

        fen: "4k3/8/8/8/8/8/8/R3K3 w Q - 0 1",
      },

      {
        titulo: "O Bispo",

        texto:
          "O bispo se movimenta pelas diagonais e permanece sempre na mesma cor de casa.",

        fen: "4k3/8/8/8/8/8/8/2B1K3 w - - 0 1",
      },

      {
        titulo: "O Cavalo",

        texto:
          "O cavalo se movimenta em formato de L e pode saltar sobre outras peças.",

        fen: "4k3/8/8/8/8/8/8/2N1K3 w - - 0 1",
      },

      {
        titulo: "A Dama",

        texto: "A dama combina os movimentos da torre e do bispo.",

        fen: "4k3/8/8/8/8/8/8/2Q1K3 w - - 0 1",
      },

      {
        titulo: "O Rei",

        texto: "O rei se movimenta uma casa por vez em qualquer direção.",

        fen: "4k3/8/8/8/8/8/8/4K3 w - - 0 1",
      },
    ],
  },

  {
    id: "xeque",

    titulo: "Xeque e Xeque-Mate",

    descricao: "Aprenda a identificar e aplicar xeques e xeque-mates.",

    aulas: [
      {
        titulo: "O que é xeque?",

        texto:
          "Xeque acontece quando o rei está sendo diretamente ameaçado por uma peça adversária.",
      },

      {
        titulo: "Xeque-mate",

        texto:
          "Xeque-mate acontece quando o rei está em xeque e não existe nenhuma jogada legal para escapar.",
      },
    ],
  },

  {
    id: "taticas",

    titulo: "Táticas de Xadrez",

    descricao: "Aprenda conceitos fundamentais de tática.",

    aulas: [
      {
        titulo: "Garfo",

        texto:
          "O garfo acontece quando uma peça ataca duas ou mais peças adversárias ao mesmo tempo.",
      },

      {
        titulo: "Cravada",

        texto:
          "Uma peça está cravada quando não pode se mover porque deixaria uma peça mais importante vulnerável.",
      },

      {
        titulo: "Ataque descoberto",

        texto:
          "Um ataque descoberto acontece quando uma peça se move e libera o ataque de outra peça.",
      },
    ],
  },

  {
    id: "aberturas",

    titulo: "Princípios de Abertura",

    descricao: "Aprenda os principais conceitos para começar uma partida.",

    aulas: [
      {
        titulo: "Controle do centro",

        texto:
          "Controlar as casas centrais aumenta a atividade das peças e proporciona maior espaço.",
      },

      {
        titulo: "Desenvolvimento",

        texto:
          "Desenvolva suas peças menores rapidamente para colocá-las em posições úteis.",
      },

      {
        titulo: "Roque",

        texto:
          "O roque é uma jogada especial que ajuda a proteger o rei e desenvolver a torre.",
      },
    ],
  },
];
