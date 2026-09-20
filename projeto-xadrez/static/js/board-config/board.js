import { Chess } from "../chess.js";

export class PLBoard {
  constructor(element, config = {}) {
    this.element = element;
    this.allowMove = config.allowMove ?? true;
    this.onMove = config.onMove || null;

    this.game = new Chess();
    this.chess = this.game;

    this.board = Chessboard(element, {
      draggable: this.allowMove,
      position: "start",
      pieceTheme: "/static/img/chesspieces/wikipedia/{piece}.png",

      onDragStart: (source, piece) => this.onDragStart(source, piece),
      onDrop: (source, target) => this.onDrop(source, target),
      onSnapEnd: () => this.onSnapEnd()
    });

    if (config.fen) {
      this.loadFEN(config.fen);
    }
  }

  /*
  ============================================================
  DRAG START
  ============================================================
  */
  onDragStart(source, piece) {
    if (!this.allowMove) {
      return false;
    }

    if (!this.game || this.game.isGameOver()) {
      return false;
    }

    const turno = this.game.turn();

    // Permite mover apenas as peças do jogador do turno atual
    if (
      (turno === "w" && piece.startsWith("b")) ||
      (turno === "b" && piece.startsWith("w"))
    ) {
      return false;
    }

    return true;
  }

  /*
  ============================================================
  DROP
  ============================================================
  */
onDrop(source, target) {
    if (!this.allowMove || !this.game) {
        return "snapback";
    }

    try {
        // Executa o movimento no chess.js
        const move = this.game.move({
            from: source,
            to: target,
            promotion: "q"
        });

        // Se o chess.js recusou por regra estrita de FEN
        if (!move) {
            return "snapback";
        }

        // Se a jogada foi válida, envia para a verificação do exercício
        if (typeof this.onMove === "function") {
            this.onMove({
                from: move.from,
                to: move.to,
                san: move.san,
                captured: move.captured,
                promotion: move.promotion
            });
        }
    } catch (e) {
        return "snapback";
    }
}

  /*
  ============================================================
  SNAP END (Atualiza o tabuleiro após a animação de soltar)
  ============================================================
  */
  onSnapEnd() {
    this.board.position(this.game.fen());
  }

  /*
  ============================================================
  UPDATE
  ============================================================
  */
  update() {
    if (!this.board || !this.game) {
      return;
    }

    this.board.position(this.game.fen(), false);
  }

  /*
  ============================================================
  RESET
  ============================================================
  */
  reset() {
    this.game = new Chess();
    this.chess = this.game;
    this.update();
  }

  /*
  ============================================================
  LOAD FEN
  ============================================================
  */
  loadFEN(fen) {
    if (!fen) {
      this.reset();
      return;
    }

    try {
      const tempGame = new Chess();
      tempGame.load(fen);

      this.game = tempGame;
      this.chess = this.game;

      // Ajusta a orientação do tabuleiro para combinar com a cor de quem joga
      const turno = this.game.turn();
      const orientation = turno === "w" ? "white" : "black";

      if (this.board) {
        this.board.orientation(orientation);
        this.board.position(this.game.fen(), false);
      }
    } catch (erro) {
      console.error("FEN inválida interceptada:", fen, erro);
    }
  }

  /*
  ============================================================
  OUTROS MÉTODOS
  ============================================================
  */
  flip() {
    if (this.board) {
      this.board.flip();
    }
  }

  undo() {
    if (!this.game) {
      return;
    }

    this.game.undo();
    this.update();
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
    return this.game ? this.game.isGameOver() : false;
  }

  isCheck() {
    return this.game ? this.game.isCheck() : false;
  }

  isCheckmate() {
    return this.game ? this.game.isCheckmate() : false;
  }

  /*
  ============================================================
  DESTAQUES
  ============================================================
  */
  highlight(square) {
    const element = document.querySelector(
      `#${this.element} .square-${square}`
    );

    if (element) {
      element.classList.add("pl-highlight");
    }
  }

  clearHighlights() {
    document
      .querySelectorAll(`#${this.element} .pl-highlight`)
      .forEach((element) => element.classList.remove("pl-highlight"));
  }
}