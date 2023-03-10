import {BoardHelper as helper} from "./board_helper.js"

export class Board {
  #board;
  #ships;

  constructor() {
    this.#board = Board.#generateBoard();
    this.#ships = [];
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
    if (!helper.withinBoard(coords)) {return "INVALID COORDS"};
    return this.#board[coords.y][coords.x];
  }

  legalSpot(coords) {
    return this.#valueAt(coords) == "water";
  }

  legalShot(coords) {
    return this.#valueAt(coords) == "water" || typeof this.#valueAt(coords) == 'object';
  }

  #markAdjacent(coords) {
    let toMark = helper.squaresAround(coords);
    toMark.forEach((markSpot)=>{
      let sqrContent = this.#valueAt(markSpot)
      if (sqrContent == "water") {this.#board[markSpot.y][markSpot.x] = "adjacent"};
    })
  }

  legalSpotForShip(coords, ship) {
    let sqrsToTake = helper.squareLine(coords, ship.size, ship.direction);
    return (sqrsToTake.every(sqr => this.legalSpot(sqr)))
  }

  addShip(coords, ship) {
    if (!this.legalSpotForShip(coords, ship)) { return false }
    let sqrsToTake = helper.squareLine(coords, ship.size, ship.direction);
    sqrsToTake.forEach(sqr => {
      this.#markAdjacent({x: sqr.x, y: sqr.y});
      this.#board[sqr.y][sqr.x] = ship;
      this.#ships.push(ship)
    })
    return true;
  }

  tempOverview(coords, ship){
    if (!this.legalSpotForShip(coords, ship)) { return this.overview(); }
    let temp = this.overview();

    let sqrsToTake = helper.squareLine(coords, ship.size, ship.direction);
    sqrsToTake.forEach(sqr => {
      temp[sqr.y][sqr.x] = "temp-ship"
    })
    return temp;
  }

  allShipsDead() {
    if (this.#ships.length == 0) { return true }
    return this.#ships.every(ship=>{
      ship.isDead()
    })
  }

  #setValue(coords, val) {
    this.#board[coords.y][coords.x] = val;
  }

  shootAt(coords) {
    let sqrContent = this.#valueAt(coords);
    if (typeof sqrContent == "string") {
      this.#setValue(coords, "miss")
      return "miss";
    } else {
      this.#setValue(coords, "hit")
      sqrContent.addDamage();
      return "hit";
    }
  }
}
