export class PLExercise {

    constructor(board, config = {}) {

        this.board = board;

        this.startFEN = config.fen;

        this.solution = config.solution;

        this.points = config.points || 10;

        this.finished = false;

    }


    checkMove(from, to) {

        if (this.finished) {
            return false;
        }


        if (
            from === this.solution.from &&
            to === this.solution.to
        ) {

            this.finished = true;

            return true;

        }


        return false;
    }


    reset() {

        this.board.loadFEN(this.startFEN);

        this.finished = false;

    }


    isFinished() {

        return this.finished;

    }

}