export class PLExercise {

    constructor(
        board,
        config = {}
    ) {

        this.board = board;

        this.nome =
            config.nome ||
            "Exercício";

        this.descricao =
            config.descricao ||
            "";

        this.startFEN =
            config.fen ||
            board.fen();

        this.correctMoves =
            config.moves ||
            [];

        this.pontos =
            config.pontos ||
            10;

        this.currentMove = 0;

        this.finished = false;
    }


    checkMove(move) {

        if (this.finished) {

            return {
                correct: false,
                finished: true
            };
        }


        const expected =
            this.correctMoves[
                this.currentMove
            ];


        if (!expected) {

            return {
                correct: false,
                finished: false
            };
        }


        const correct =
            move.from === expected.from &&
            move.to === expected.to;


        if (!correct) {

            return {
                correct: false,
                finished: false
            };
        }


        this.currentMove++;


        if (
            this.currentMove >=
            this.correctMoves.length
        ) {

            this.finished = true;


            return {
                correct: true,

                finished: true,

                pontos: this.pontos
            };
        }


        return {
            correct: true,

            finished: false
        };
    }


    reset() {

        this.board.loadFEN(
            this.startFEN
        );

        this.currentMove = 0;

        this.finished = false;
    }


    isFinished() {

        return this.finished;
    }


    getPoints() {

        return this.pontos;
    }
}