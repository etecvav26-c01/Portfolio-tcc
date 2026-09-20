export const exercises = [
  // ============================================================
  // PEÇAS — 1 a 10 (Movimentação básica de cada peça)
  // ============================================================

  {
    id: 1,
    tema: "pecas",
    nome: "Movimento do cavalo",
    descricao: "Mova o cavalo de b1 para c3.",
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    moves: [{ from: "b1", to: "c3" }],
    pontos: 10,
  },

  {
    id: 2,
    tema: "pecas",
    nome: "Torre na coluna",
    descricao: "Mova a torre de a1 para a5.",
    fen: "4k3/8/8/8/8/8/8/R3K3 w - - 0 1",
    moves: [{ from: "a1", to: "a5" }],
    pontos: 10,
  },

  {
    id: 3,
    tema: "pecas",
    nome: "Movimento da dama",
    descricao: "Mova a dama de d1 para h5.",
    fen: "6k1/8/8/8/8/8/8/3QK3 w - - 0 1",
    moves: [{ from: "d1", to: "h5" }],
    pontos: 10,
  },

  {
    id: 4,
    tema: "pecas",
    nome: "Avanço do peão",
    descricao: "Mova o peão de e2 para e4.",
    fen: "4k3/8/8/8/8/8/4P3/4K3 w - - 0 1",
    moves: [{ from: "e2", to: "e4" }],
    pontos: 10,
  },

  {
    id: 5,
    tema: "pecas",
    nome: "Movimento do rei",
    descricao: "Mova o rei de e1 para f2.",
    fen: "4k3/8/8/8/8/8/8/4K3 w - - 0 1",
    moves: [{ from: "e1", to: "f2" }],
    pontos: 10,
  },

  {
    id: 6,
    tema: "pecas",
    nome: "Salto do cavalo",
    descricao: "Mova o cavalo de b1 para a3.",
    fen: "4k3/8/8/8/8/8/8/1N2K3 w - - 0 1",
    moves: [{ from: "b1", to: "a3" }],
    pontos: 10,
  },

  {
    id: 7,
    tema: "pecas",
    nome: "Movimento do bispo",
    descricao: "Mova o bispo de c1 para f4.",
    fen: "4k3/8/8/8/8/8/8/2B1K3 w - - 0 1",
    moves: [{ from: "c1", to: "f4" }],
    pontos: 10,
  },

  {
    id: 8,
    tema: "pecas",
    nome: "Dama na diagonal",
    descricao: "Mova a dama de d1 para a4.",
    fen: "7k/8/8/8/8/8/8/3QK3 w - - 0 1",
    moves: [{ from: "d1", to: "a4" }],
    pontos: 10,
  },

  {
    id: 9,
    tema: "pecas",
    nome: "Torre na fila",
    descricao: "Mova a torre de a1 para f1.",
    fen: "4k3/8/8/8/8/8/8/R3K3 w - - 0 1",
    moves: [{ from: "a1", to: "f1" }],
    pontos: 10,
  },

  {
    id: 10,
    tema: "pecas",
    nome: "Bispo na grande diagonal",
    descricao: "Mova o bispo de c1 para h6.",
    fen: "4k3/8/8/8/8/8/8/2B1K3 w - - 0 1",
    moves: [{ from: "c1", to: "h6" }],
    pontos: 10,
  },

  // ============================================================
  // XEQUE E XEQUE-MATE — 11 a 20
  // ============================================================

  {
    id: 11,
    tema: "xeque",
    nome: "Xeque com a dama",
    descricao: "Dê xeque ao rei preto movendo a dama de d1 para h5.",
    fen: "4k3/8/8/8/8/8/8/3QK3 w - - 0 1",
    moves: [{ from: "d1", to: "h5" }],
    pontos: 15,
  },

  {
    id: 12,
    tema: "xeque",
    nome: "Xeque com a torre",
    descricao: "Dê xeque ao rei preto movendo a torre de a1 para a8.",
    fen: "4k3/8/8/8/8/8/8/R3K3 w - - 0 1",
    moves: [{ from: "a1", to: "a8" }],
    pontos: 15,
  },

  {
    id: 13,
    tema: "xeque",
    nome: "Xeque com o bispo",
    descricao: "Mova o bispo para g5 e dê xeque ao rei preto.",
    fen: "8/4k3/8/8/8/8/8/2B1K3 w - - 0 1",
    moves: [{ from: "c1", to: "g5" }],
    pontos: 15,
  },

  {
    id: 14,
    tema: "xeque",
    nome: "Xeque com o cavalo",
    descricao: "Mova o cavalo de e5 para f7 para dar xeque.",
    fen: "7k/8/8/4N3/8/8/8/4K3 w - - 0 1",
    moves: [{ from: "e5", to: "f7" }],
    pontos: 15,
  },

  {
    id: 15,
    tema: "xeque",
    nome: "Xeque pela sétima fileira",
    descricao: "Mova a dama de h5 para h7 e dê xeque.",
    fen: "6k1/8/8/7Q/8/8/8/6K1 w - - 0 1",
    moves: [{ from: "h5", to: "h7" }],
    pontos: 15,
  },

  {
    id: 16,
    tema: "xeque",
    nome: "Torre contra o rei",
    descricao: "Mova a torre para a8 e dê xeque ao rei preto.",
    fen: "7k/8/8/8/8/8/8/R5K1 w - - 0 1",
    moves: [{ from: "a1", to: "a8" }],
    pontos: 15,
  },

  {
    id: 17,
    tema: "xeque",
    nome: "Xeque horizontal com a dama",
    descricao: "Mova a dama de a4 para h4 para dar xeque.",
    fen: "7k/8/8/8/Q7/8/8/6K1 w - - 0 1",
    moves: [{ from: "a4", to: "h4" }],
    pontos: 15,
  },

  {
    id: 18,
    tema: "xeque",
    nome: "Xeque com o cavalo",
    descricao: "Mova o cavalo de f3 para g5 para dar xeque.",
    fen: "8/8/4k3/8/8/5N2/8/6K1 w - - 0 1",
    moves: [{ from: "f3", to: "g5" }],
    pontos: 15,
  },

  {
    id: 19,
    tema: "xeque",
    nome: "Xeque com o peão",
    descricao: "Avance o peão de e5 para e6 para dar xeque.",
    fen: "8/3k4/8/4P3/8/8/8/6K1 w - - 0 1",
    moves: [{ from: "e5", to: "e6" }],
    pontos: 15,
  },

  {
    id: 20,
    tema: "xeque",
    nome: "Xeque com o peão de f",
    descricao: "Avance o peão de f5 para f6 para dar xeque.",
    fen: "8/5k2/8/5P2/8/8/8/6K1 w - - 0 1",
    moves: [{ from: "f5", to: "f6" }],
    pontos: 15,
  },

  // ============================================================
  // TÁTICAS — 21 a 30
  // ============================================================

  {
    id: 21,
    tema: "taticas",
    nome: "Garfo de cavalo",
    descricao: "Mova o cavalo de e5 para c6, atacando o rei e a dama.",
    fen: "1k1q4/8/8/4N3/8/8/8/4K3 w - - 0 1",
    moves: [{ from: "e5", to: "c6" }],
    pontos: 20,
  },

  {
    id: 22,
    tema: "taticas",
    nome: "Garfo rei e dama",
    descricao: "Mova o cavalo de e4 para f6 para atacar o rei e a dama.",
    fen: "4k3/3q4/8/8/4N3/8/8/4K3 w - - 0 1",
    moves: [{ from: "e4", to: "f6" }],
    pontos: 20,
  },

  {
    id: 23,
    tema: "taticas",
    nome: "Cravada com o bispo",
    descricao: "Mova o bispo de c1 para g5, cravando o cavalo contra o rei.",
    fen: "8/4k3/5n2/8/8/8/8/2B1K3 w - - 0 1",
    moves: [{ from: "c1", to: "g5" }],
    pontos: 20,
  },

  {
    id: 24,
    tema: "taticas",
    nome: "Outra cravada",
    descricao: "Mova o bispo de f1 para b5 e crava o cavalo contra o rei.",
    fen: "8/3k4/2n5/8/8/8/8/4KB2 w - - 0 1",
    moves: [{ from: "f1", to: "b5" }],
    pontos: 20,
  },

  {
    id: 25,
    tema: "taticas",
    nome: "Ataque descoberto",
    descricao:
      "Mova o bispo de d3 para c2, revelando o ataque da torre à dama.",
    fen: "3qk3/8/8/8/8/3B4/8/3RK3 w - - 0 1",
    moves: [{ from: "d3", to: "c2" }],
    pontos: 20,
  },

  {
    id: 26,
    tema: "taticas",
    nome: "Garfo de cavalo na torre",
    descricao: "Mova o cavalo de e6 para c7 para atacar o rei e a torre.",
    fen: "r3k3/8/4N3/8/8/8/8/4K3 w - - 0 1",
    moves: [{ from: "e6", to: "c7" }],
    pontos: 20,
  },

  {
    id: 27,
    tema: "taticas",
    nome: "Espeto com a torre",
    descricao: "Mova a torre de a1 para a8, atacando primeiro o rei.",
    fen: "4k2r/8/8/8/8/8/8/R5K1 w - - 0 1",
    moves: [{ from: "a1", to: "a8" }],
    pontos: 20,
  },

  {
    id: 28,
    tema: "taticas",
    nome: "Garfo de cavalo central",
    descricao: "Mova o cavalo de c3 para b5, atacando o rei e a dama.",
    fen: "8/8/3k4/3p4/3q4/2N5/8/6K1 w - - 0 1",
    moves: [{ from: "c3", to: "b5" }],
    pontos: 20,
  },

  {
    id: 29,
    tema: "taticas",
    nome: "Ataque duplo do bispo",
    descricao: "Mova o bispo de c1 para g5 para atacar o rei e a torre.",
    fen: "8/4k3/7r/8/8/8/8/2B3K1 w - - 0 1",
    moves: [{ from: "c1", to: "g5" }],
    pontos: 20,
  },

  {
    id: 30,
    tema: "taticas",
    nome: "Ataque duplo da dama",
    descricao: "Mova a dama de d1 para a4, atacando o rei e a torre.",
    fen: "4k2r/8/8/8/8/8/8/3Q2K1 w - - 0 1",
    moves: [{ from: "d1", to: "a4" }],
    pontos: 20,
  },

  // ============================================================
  // ABERTURAS — 31 a 40
  // ============================================================

  {
    id: 31,
    tema: "aberturas",
    nome: "Desenvolvimento no Italiano",
    descricao: "Depois de 1.e4 e5 2.Cf3 Cc6, desenvolva o bispo para c4.",
    fen: "4k3/8/8/4p3/4P3/5N2/8/4K2B w - - 0 1",
    moves: [{ from: "h1", to: "c4" }],
    pontos: 25,
  },

  {
    id: 32,
    tema: "aberturas",
    nome: "Ruy Lopez",
    descricao: "Na Ruy Lopez, jogue ...a6 para questionar o bispo.",
    fen: "4k3/p7/8/1B6/4P3/5N2/8/4K3 b - - 0 1",
    moves: [{ from: "a7", to: "a6" }],
    pontos: 25,
  },

  {
    id: 33,
    tema: "aberturas",
    nome: "Defesa Francesa",
    descricao: "Na Defesa Francesa, avance o peão de e4 para e5.",
    fen: "4k3/8/4p3/3p4/3PP3/8/8/4K3 w - - 0 1",
    moves: [{ from: "e4", to: "e5" }],
    pontos: 25,
  },

  {
    id: 34,
    tema: "aberturas",
    nome: "Desenvolvimento do cavalo",
    descricao:
      "Depois de 1.e4 e5 2.Cf3 Cc6 3.Bc4, desenvolva o cavalo de g8 para f6.",
    fen: "4k1nr/8/2n5/4p3/2B1P3/5N2/8/4K3 b - - 0 1",
    moves: [{ from: "g8", to: "f6" }],
    pontos: 25,
  },

  {
    id: 35,
    tema: "aberturas",
    nome: "Defesa Siciliana",
    descricao: "Depois de 1.e4 c5, desenvolva o cavalo para f3.",
    fen: "4k3/8/8/2p5/4P3/8/8/4K1N1 w - - 0 1",
    moves: [{ from: "g1", to: "f3" }],
    pontos: 25,
  },

  {
    id: 36,
    tema: "aberturas",
    nome: "Gambito da Dama",
    descricao: "Depois de 1.d4 d5 2.c4, jogue ...e6 para sustentar o centro.",
    fen: "4k3/4p3/8/3p4/2PP4/8/8/4K3 b - - 0 1",
    moves: [{ from: "e7", to: "e6" }],
    pontos: 25,
  },

  {
    id: 37,
    tema: "aberturas",
    nome: "Defesa Índia do Rei",
    descricao: "Depois de 1.d4 Cf6 2.c4 g6, desenvolva o cavalo de b1 para c3.",
    fen: "4k3/8/6p1/8/2PP4/8/8/1N2K3 w - - 0 1",
    moves: [{ from: "b1", to: "c3" }],
    pontos: 25,
  },

  {
    id: 38,
    tema: "aberturas",
    nome: "Sistema Londres",
    descricao: "No Sistema Londres, avance o peão de e2 para e3.",
    fen: "4k3/8/8/3p4/3P1B2/5N2/4P3/4K3 w - - 0 1",
    moves: [{ from: "e2", to: "e3" }],
    pontos: 25,
  },

  {
    id: 39,
    tema: "aberturas",
    nome: "Roque pequeno",
    descricao: "Faça o roque pequeno com as brancas.",
    fen: "4k3/8/8/8/8/8/8/4K2R w K - 0 1",
    moves: [{ from: "e1", to: "g1" }],
    pontos: 25,
  },

  {
    id: 40,
    tema: "aberturas",
    nome: "Roque pequeno das pretas",
    descricao: "Faça o roque pequeno com as pretas.",
    fen: "4k2r/8/8/8/8/8/8/4K3 b k - 0 1",
    moves: [{ from: "e8", to: "g8" }],
    pontos: 25,
  },
];
    