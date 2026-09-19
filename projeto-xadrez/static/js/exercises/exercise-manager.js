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

  loadExercise() {
    const config = this.exercises[this.currentIndex];

    if (!config) {
      return;
    }

    this.currentExercise = new PLExercise(this.board, config);

    this.board.loadFEN(config.fen);
  }

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
    if (this.currentExercise) {
      this.currentExercise.reset();
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
