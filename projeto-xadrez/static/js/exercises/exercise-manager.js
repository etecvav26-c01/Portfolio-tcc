import { PLExercise } from "../board-config/exercise.js";

export class ExerciseManager {
  constructor(board, exercises) {
    this.board = board;
    this.exercises = exercises || [];
    this.currentIndex = 0;
    this.currentExercise = null;
    this.score = 0;
    this.completed = 0;

    this.loadExercise();
  }

  // NOVA FUNÇÃO: Permite ir direto para o exercício do banco
  goTo(index) {
    if (index >= 0 && index < this.exercises.length) {
      this.currentIndex = index;
      this.loadExercise();
      return true;
    }
    return false;
  }

  loadExercise() {
    const config = this.exercises[this.currentIndex];

    if (!config) {
      return;
    }

    // Instancia o novo exercício
    this.currentExercise = new PLExercise(this.board, config);

    // Carrega a FEN do exercício no tabuleiro e ajusta a orientação/peças
    if (this.board && typeof this.board.loadFEN === "function") {
      this.board.loadFEN(config.fen);
    }
  }

  // ... (mantenha o restante dos métodos checkMove, next, reset, etc. exatamente como estão)

  checkMove(move) {
    if (!this.currentExercise) {
      return null;
    }

    const result = this.currentExercise.checkMove(move);

    if (result.correct && result.finished) {
      this.score += result.pontos;
      this.completed++;
    }

    return result;
  }

  next() {
    if (this.currentIndex < this.exercises.length - 1) {
      this.currentIndex++;
      this.loadExercise();
      return true;
    }

    return false;
  }

  reset() {
    const config = this.exercises[this.currentIndex];

    if (!config) {
      return;
    }

    // 1. Reseta o estado interno do exercício
    if (this.currentExercise) {
      this.currentExercise.reset();
    }

    // 2. Restaura a FEN original do exercício no tabuleiro
    if (this.board && typeof this.board.loadFEN === "function") {
      this.board.loadFEN(config.fen);
    }
  }

  getCurrent() {
    return this.currentExercise;
  }

  getCurrentNumber() {
    return this.currentIndex + 1;
  }

  getTotal() {
    return this.exercises.length;
  }

  getScore() {
    return this.score;
  }

  isLast() {
    return this.currentIndex >= this.exercises.length - 1;
  }
}
