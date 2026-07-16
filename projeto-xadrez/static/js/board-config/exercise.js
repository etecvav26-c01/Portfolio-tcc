export class Exercise{

    constructor(board){

        this.board = board;

        this.solution = null;

    }

    carregar(fen, resposta){

        this.board.game.load(fen);

        this.board.update();

        this.solution = resposta;

    }

}