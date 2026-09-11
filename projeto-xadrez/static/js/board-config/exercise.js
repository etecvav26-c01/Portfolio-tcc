export class PLExercise {

    constructor(board, config = {}) {

        this.board = board;

        this.startFEN =
            config.fen || board.fen();

        this.correctMoves =
            config.moves || [];

        this.currentMove = 0;

        this.finished = false;

    }


    checkMove(move) {

        if (this.finished) {
            return false;
        }

        const expected =
            this.correctMoves[this.currentMove];

        if (!expected) {
            return false;
        }

        if (
            move.from === expected.from &&
            move.to === expected.to
        ) {

            this.currentMove++;

            if (
                this.currentMove >=
                this.correctMoves.length
            ) {

                this.finished = true;

                return true;

            }

            return true;
        }

        return false;
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

}