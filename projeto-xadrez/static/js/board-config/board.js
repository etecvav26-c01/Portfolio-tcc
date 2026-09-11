import { Chess } from "../chess.js";

export class PLBoard {

    constructor(config = {}) {

        this.element = config.element || "board";

        this.game = new Chess();

        this.allowMove = config.allowMove || (() => true);

        if (config.fen && config.fen !== "start") {

            try {
                this.game.load(config.fen);
            } catch (error) {
                console.error("FEN inválida:", error);
            }

        }

        this.board = Chessboard(this.element, {

            position: this.game.fen(),

            draggable: config.draggable ?? true,

            pieceTheme:
                "/static/img/chesspieces/wikipedia/{piece}.png",

            onDragStart: (source, piece) =>
                this.onDragStart(source, piece),

            onDrop: (source, target) =>
                this.onDrop(source, target),

            onSnapEnd: () =>
                this.update()

        });

    }

    onDragStart(source, piece) {

        if (this.game.isGameOver()) {
            return false;
        }

        if (!this.allowMove(source, piece)) {
            return false;
        }

        if (
            this.game.turn() === "w" &&
            piece.startsWith("b")
        ) {
            return false;
        }

        if (
            this.game.turn() === "b" &&
            piece.startsWith("w")
        ) {
            return false;
        }

        return true;
    }

    onDrop(source, target) {

        let move;

        try {

            move = this.game.move({
                from: source,
                to: target,
                promotion: "q"
            });

        } catch (error) {

            return "snapback";

        }

        if (!move) {
            return "snapback";
        }

        this.update();

        return undefined;
    }

    update() {

        this.board.position(
            this.game.fen()
        );

    }

    reset() {

        this.game.reset();

        this.update();

    }


    flip() {

        this.board.flip();

    }


    undo() {

        this.game.undo();

        this.update();

    }


    loadFEN(fen) {

        try {

            this.game.load(fen);

            this.update();

            return true;

        } catch (error) {

            console.error("FEN inválida:", error);

            return false;
        }

    }

    fen() {

        return this.game.fen();

    }


    pgn() {

        return this.game.pgn();

    }


    turn() {

        return this.game.turn();

    }


    isGameOver() {

        return this.game.isGameOver();

    }


    isCheck() {

        return this.game.isCheck();

    }


    isCheckmate() {

        return this.game.isCheckmate();

    }

    highlight(square) {

        const element =
            document.querySelector(
                `#${this.element} .square-${square}`
            );

        if (element) {
            element.classList.add("pl-highlight");
        }

    }

    clearHighlights() {

        document
            .querySelectorAll(
                `#${this.element} .pl-highlight`
            )
            .forEach(element => {

                element.classList.remove(
                    "pl-highlight"
                );

            });

    }

    lock() {

        this.board = Chessboard(this.element, {

            position: this.game.fen(),

            draggable: false,

            pieceTheme:
                "/static/img/chesspieces/wikipedia/{piece}.png"

        });

    }


    unlock() {

        this.board = Chessboard(this.element, {

            position: this.game.fen(),

            draggable: true,

            pieceTheme:
                "/static/img/chesspieces/wikipedia/{piece}.png",

            onDragStart: (source, piece) =>
                this.onDragStart(source, piece),

            onDrop: (source, target) =>
                this.onDrop(source, target),

            onSnapEnd: () =>
                this.update()

        });

    }

}