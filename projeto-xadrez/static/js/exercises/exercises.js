export const exercises = [

    {
        id: 1,

        tema: "pecas",

        nome: "Movimento da torre",

        descricao:
            "Mova a torre de a1 para a8.",

        fen:
            "8/8/8/8/8/8/8/R3K3 w - - 0 1",

        moves: [
            {
                from: "a1",
                to: "a8"
            }
        ],

        pontos: 10
    },


    {
        id: 2,

        tema: "pecas",

        nome: "Movimento do cavalo",

        descricao:
            "Mova o cavalo de b1 para c3.",

        fen:
            "8/8/8/8/8/8/8/1N2K3 w - - 0 1",

        moves: [
            {
                from: "b1",
                to: "c3"
            }
        ],

        pontos: 10
    },


    {
        id: 3,

        tema: "pecas",

        nome: "Movimento da dama",

        descricao:
            "Mova a dama de d1 para h5.",

        fen:
            "8/8/8/8/8/8/8/3QK3 w - - 0 1",

        moves: [
            {
                from: "d1",
                to: "h5"
            }
        ],

        pontos: 10
    }
];