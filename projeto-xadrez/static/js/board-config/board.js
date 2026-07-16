import { Chess } from "../chess.js";

export class PLBoard {

    constructor(config = {}) {

        this.element = config.element || "board";

        this.game = new Chess();

        if (config.fen && config.fen !== "start") {
            this.game.load(config.fen);
        }

        this.board = Chessboard(this.element, {

            position: this.game.fen(),

            draggable: config.draggable ?? true,

            pieceTheme:
                "/static/img/chesspieces/wikipedia/{piece}.png",

            onDrop: (source, target) =>
                this.onDrop(source, target),

            onSnapEnd: () =>
                this.update()

        });

    }

    onDrop(source, target) {

        const move = this.game.move({

            from: source,

            to: target,

            promotion: "q"

        });

        if (!move)
            return "snapback";

    }

    update() {

        this.board.position(this.game.fen());

    }

    reset() {

        this.game.reset();

        this.update();

    }

    flip() {

        this.board.flip();

    }

    fen() {

        return this.game.fen();

    }

    pgn() {

        return this.game.pgn();

    }

}