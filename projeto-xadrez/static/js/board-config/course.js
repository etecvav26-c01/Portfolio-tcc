export class PLCourse {

    constructor(board) {

        this.board = board;

        this.currentLesson = null;

    }


    startLesson(config) {

        this.currentLesson = config;

        if (config.fen) {

            this.board.loadFEN(
                config.fen
            );

        }

        if (config.locked) {

            this.board.lock();

        }

    }


    finishLesson() {

        this.currentLesson = null;

        this.board.reset();

    }


    getCurrentLesson() {

        return this.currentLesson;

    }

}