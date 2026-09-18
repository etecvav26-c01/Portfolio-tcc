export class PLCourse {
  constructor(board, curso) {
    this.board = board;
    this.curso = curso;

    this.aulas = curso.aulas;

    this.atual = 0;
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
    }
  }

  proxima() {
    if (this.atual >= this.aulas.length - 1) {
      return false;
    }

    this.atual++;

    this.iniciar();

    return true;
  }

  anterior() {
    if (this.atual <= 0) {
      return false;
    }

    this.atual--;

    this.iniciar();

    return true;
  }

  progresso() {
    return Math.round(((this.atual + 1) / this.aulas.length) * 100);
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
}
