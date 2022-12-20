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

  // returns simplified overview of the board with values
  // hit/miss/water/ship/adjacent
  overview () {
    let copy = [];

    this.#board.forEach((row,y)=>{
      copy.push([]);

      row.forEach(sqr=>{
       if (typeof sqr == 'string') {
         copy[y].push(sqr)
       } else {
         copy[y].push("ship");
       }
      })

    })
    return copy;
  }

  #valueAt (coords) {
    return this.#board[coords.y][coords.x];
  }

  legalShipSpot(coords) {
    return this.#valueAt(coords) == "water";
  }

  #markAdjacent(coords) {
    let toMark = helper.squaresAround(coords);
    toMark.forEach((markSpot)=>{
      let sqrContent = this.#valueAt(markSpot)
      if (sqrContent == "water") {this.#board[markSpot.y][markSpot.x] = "adjacent"};
    })
  }

  }
}
