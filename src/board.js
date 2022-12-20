import {BoardHelper as helper} from "./board_helper.js"

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
    let row = [];
    for (let i = 0; i < size; i++) {
      row.push("water");
    }
    return row
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

  addShip(coords, ship) {
    let sqrsToTake = helper.squareLine(coords, ship.size);
    if (!sqrsToTake.every(sqr=>this.legalShipSpot(sqr))) {return false}

    sqrsToTake.forEach(sqr => {
      this.#markAdjacent({x: sqr.x, y: sqr.y});
      this.#board[sqr.y][sqr.x] = ship;
    })
    return true;
  }

  #setValue(coords, val) {
    this.#board[coords.y][coords.x] = val;
  }

  shootAt(coords) {
    let sqrContent = this.#valueAt(coords);
    if (typeof sqrContent == "string") {
      this.#setValue(coords, "miss")
      return false;
    } else {
      this.#setValue(coords, "hit")
      sqrContent.addDamage();
      return true;
    }
  }
}
