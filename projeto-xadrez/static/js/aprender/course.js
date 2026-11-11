export class PLCourse {
  constructor(board, curso) {
    this.board = board;
    this.curso = curso;
    this.aulas = curso.aulas || [];
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
      // nas aulas o diagrama sempre é mostrado do lado das brancas
      this.board.loadFEN(aula.fen, { orientation: "white" });
    } else {
      this.board.reset();
    }
  }

  proxima() {
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

  progresso() {
    if (!this.aulas.length) {
      return 0;
    }

    return Math.round((this.numeroAtual() / this.aulas.length) * 100);
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
