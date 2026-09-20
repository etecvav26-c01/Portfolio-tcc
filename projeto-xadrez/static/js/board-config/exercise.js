export class PLExercise {
    constructor(board, config = {}) {
        this.board = board;
        this.nome = config.nome || "Exercício";
        this.descricao = config.descricao || "";
        this.startFEN = config.fen || board.fen();
        this.correctMoves = config.moves || [];
        this.pontos = config.pontos || 10;
        this.currentMove = 0;
        this.finished = false;
    }

    checkMove(move) {
        if (this.finished) {
            return { correct: false, finished: true };
        }

        const expected = this.correctMoves[this.currentMove];

        if (!expected) {
            return { correct: false, finished: false };
        }

        // Garante comparação limpa sem diferença de maiúsculas/minúsculas
        const correct =
            move.from.toLowerCase() === expected.from.toLowerCase() &&
            move.to.toLowerCase() === expected.to.toLowerCase();

        if (!correct) {
            return { correct: false, finished: false };
        }

        this.currentMove++;

        if (this.currentMove >= this.correctMoves.length) {
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
        if (this.board && typeof this.board.loadFEN === "function") {
            this.board.loadFEN(this.startFEN);
        }
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