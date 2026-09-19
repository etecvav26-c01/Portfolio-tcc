export class PLCourse {
  constructor(board, curso) {
    this.board = board;

    this.curso = curso;

    this.aulas = curso.aulas || [];

    this.atual = 0;

    this.concluidas = new Set();
  }

  getAula() {
    return this.aulas[this.atual];
  }

  iniciar() {
    const aula = this.getAula();

    if (!aula) {
      return;
    }

    if (aula.fen) {
      this.board.loadFEN(aula.fen);
    } else {
      this.board.reset();
    }
  }

  proxima() {
    this.concluirAula();

    if (this.ultima()) {
      return false;
    }

    this.atual++;

    this.iniciar();

    return true;
  }

  anterior() {
    if (this.primeira()) {
      return false;
    }

    this.atual--;

    this.iniciar();

    return true;
  }

  concluirAula() {
    this.concluidas.add(this.atual);
  }

  progresso() {
    if (!this.aulas.length) {
      return 0;
    }

    return Math.round((this.concluidas.size / this.aulas.length) * 100);
  }

  numeroAtual() {
    return this.atual + 1;
  }

  totalAulas() {
    return this.aulas.length;
  }

  primeira() {
    return this.atual === 0;
  }

  ultima() {
    return this.atual === this.aulas.length - 1;
  }

  cursoConcluido() {
    return this.concluidas.size === this.aulas.length;
  }
}
