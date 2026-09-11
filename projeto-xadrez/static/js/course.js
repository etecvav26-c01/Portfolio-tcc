export class PLCourse {
  constructor(board, lessons = []) {
    this.board = board;

    this.lessons = lessons;

    this.currentLesson = 0;
  }

  getCurrentLesson() {
    return this.lessons[this.currentLesson];
  }

  startLesson(index) {
    if (index < 0 || index >= this.lessons.length) {
      return false;
    }

    this.currentLesson = index;

    const lesson = this.getCurrentLesson();

    if (lesson.fen) {
      this.board.loadFEN(lesson.fen);
    }

    return true;
  }

  nextLesson() {
    if (this.currentLesson < this.lessons.length - 1) {
      this.currentLesson++;

      const lesson = this.getCurrentLesson();

      if (lesson.fen) {
        this.board.loadFEN(lesson.fen);
      }

      return true;
    }

    return false;
  }

  previousLesson() {
    if (this.currentLesson > 0) {
      this.currentLesson--;

      const lesson = this.getCurrentLesson();

      if (lesson.fen) {
        this.board.loadFEN(lesson.fen);
      }

      return true;
    }

    return false;
  }

  getProgress() {
    if (!this.lessons.length) {
      return 0;
    }

    return Math.round(((this.currentLesson + 1) / this.lessons.length) * 100);
  }
}
