import { Chess } from "../chess.js";

export class PLBoard {
  constructor(element, config = {}) {
    this.element = element;
    this.allowMove = config.allowMove ?? true;

    /*
      onMove(move) é chamado depois de uma jogada legal.
      Se devolver false, a jogada é desfeita e a peça volta para a casa.
    */
    this.onMove = config.onMove || null;

    this.game = new Chess();

    this.board = Chessboard(element, {
      draggable: this.allowMove,
      position: "start",
      pieceTheme: "/static/img/chesspieces/wikipedia/{piece}.png",

      onDragStart: (source, piece) => this.onDragStart(source, piece),
      onDrop: (source, target) => this.onDrop(source, target),
      onSnapEnd: () => this.onSnapEnd(),
    });

    // O chessboard.js não se ajusta sozinho quando a janela muda de tamanho.
    window.addEventListener("resize", () => this.board.resize());

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
    /*
      Não usamos game.isGameOver() aqui: o chess.js o considera verdadeiro
      em posições com material insuficiente (ex.: rei contra rei, ou rei e
      cavalo contra rei), o que travava vários exercícios didáticos.
      A legalidade da jogada é validada pelo próprio game.move() no onDrop.
    */
    if (!this.allowMove) {
      return false;
    }

    // Permite mover apenas as peças de quem joga no momento
    return piece.startsWith(this.game.turn());
  }

  /*
  ============================================================
  DROP
  ============================================================
  */
  onDrop(source, target) {
    if (!this.allowMove || source === target || target === "offboard") {
      return "snapback";
    }

    let move;

    try {
      // chess.js lança erro quando a jogada é ilegal
      move = this.game.move({
        from: source,
        to: target,
        promotion: "q",
      });
    } catch (erro) {
      return "snapback";
    }

    if (typeof this.onMove === "function") {
      const aceita = this.onMove({
        from: move.from,
        to: move.to,
        san: move.san,
        captured: move.captured,
        promotion: move.promotion,
      });

      if (aceita === false) {
        this.game.undo();
        return "snapback";
      }
    }
  }

  /*
  ============================================================
  SNAP END (sincroniza o tabuleiro depois da animação)
  ============================================================
  */
  onSnapEnd() {
    this.board.position(this.game.fen());
  }

  update() {
    this.board.position(this.game.fen(), false);
  }

  reset() {
    this.game = new Chess();
    this.update();
  }

  /*
  ============================================================
  LOAD FEN
  Por padrão, o tabuleiro gira para a cor de quem joga.
  Passe { orientation: "white" } para fixar a visão.
  ============================================================
  */
  loadFEN(fen, { orientation } = {}) {
    if (!fen) {
      this.reset();
      return;
    }

    try {
      this.game = new Chess(fen);
    } catch (erro) {
      console.error("FEN inválida:", fen, erro);
      return;
    }

    const lado =
      orientation || (this.game.turn() === "w" ? "white" : "black");

    this.board.orientation(lado);
    this.board.position(this.game.fen(), false);
  }

  flip() {
    this.board.flip();
  }

  undo() {
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
    return this.game.isGameOver();
  }

  isCheck() {
    return this.game.isCheck();
  }

  isCheckmate() {
    return this.game.isCheckmate();
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