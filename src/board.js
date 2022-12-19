export class Board {
  #board;

  constructor() {
    this.#board = Board.#generateBoard();
  }

  static #generateBoard(rows=10) {
    let board = []
    for (let i = 0; i < rows; i++) {
      board.push(Board.#generateRow());
    }
    return board;
  }

  static #generateRow(size=10) {
    return new Array(size);
  }

  overview () {
    return this.#board;
  }
}
