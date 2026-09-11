export const exercises = [

    {
        id: 1,

        nome: "Mate em 1",

        descricao:
            "Encontre o xeque-mate das brancas.",

        fen:
            "6k1/5ppp/8/8/8/5Q2/5PPP/6K1 w - - 0 1",

        moves: [
            {
                from: "f3",
                to: "f8"
            }
        ],

        pontos: 10
    },


    {
        id: 2,

        nome: "Mate com a dama",

        descricao:
            "Encontre a jogada que coloca o rei preto em xeque-mate.",

        fen:
            "7k/6pp/8/8/8/6Q1/6PP/6K1 w - - 0 1",

        moves: [
            {
                from: "g3",
                to: "g7"
            }
        ],

        pontos: 10
    },


    {
        id: 3,

        nome: "Ataque à torre",

        descricao:
            "Encontre a melhor captura disponível.",

        fen:
            "6k1/5ppp/8/8/3Q4/8/5PPP/6K1 w - - 0 1",

        moves: [
            {
                from: "d4",
                to: "h8"
            }
        ],

        pontos: 10
    }

];