import { PLExercise } from "../board-config/exercise.js";

export class ExerciseManager {
  constructor(board, exercises, startIndex = 0) {
    this.board = board;
    this.exercises = exercises || [];
    this.currentIndex = 0;
    this.currentExercise = null;

    // Se o índice inicial for inválido, começa do primeiro
    if (!this.goTo(startIndex)) {
      this.goTo(0);
    }
  }

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

    this.currentExercise = new PLExercise(this.board, config);

    // Exercício novo: o tabuleiro volta a aceitar jogadas
    this.board.allowMove = true;
    this.board.loadFEN(config.fen);
  }

  checkMove(move) {
    if (!this.currentExercise) {
      return { correct: false, finished: false };
    }

    return this.currentExercise.checkMove(move);
  }

  next() {
    return this.goTo(this.currentIndex + 1);
  }

  reset() {
    if (!this.currentExercise) {
      return;
    }

    this.currentExercise.reset();
    this.board.allowMove = true;
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

  isLast() {
    return this.currentIndex >= this.exercises.length - 1;
  }
}
