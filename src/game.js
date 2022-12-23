import {Display} from "./display.js"
import {Board} from "./board.js"
import {Listeners} from "./listeners.js"
import {Ship} from "./ship.js"
import {BoardHelper as helper} from "./board_helper.js"
import {AI} from "./ai.js"

export class Game  {

  left;
  right;
  ai;

  // Set ups side of the game board, since Battleships are composed of two boards
  #setUpSide(showShips="false") {
    const display = new Display(showShips)
    const board = new Board()
    const listeners = new Listeners(board, display, this);
    return {display, board, listeners}
  }

  // Invokes AI to place ships
  #setUpAiBoard(ai, board) {
    helper.SHIP_LENGTHS.forEach(_ => {
      let ship = ai.getShip();
      while (true) {
        let success = board.addShip(ai.randomCoords(), ship);
        if (success) { break; }
      }
    });
  }

  playerVsAI() {
    this.left = this.#setUpSide(true);
    this.right = this.#setUpSide(false);
    this.ai = AI();
    this.#setUpAiBoard(this.ai, this.right.board);

    this.left.listeners.placementMode();
    this.right.listeners.shootMode();
  }

  takeShot (coords, board, display) {
    board.shootAt(coords);
    display.shootModeUpdate(board.overview());
    //Check if you won
    this.letAiTakeShot()
    this.left.display.update(this.left.board.overview());
    // check if AI won
  }

  letAiTakeShot() {
    while (true) {
      let coords = this.ai.randomCoords();
      if (this.left.board.legalShot(coords)){
        this.left.board.shootAt(coords)
        break;
      }
    }
  }

  putShip (coords, board, display, selectedShip) {
    let ship = this.reconstructShip(selectedShip);
    if (!board.legalSpotForShip(coords, ship)) { return false }
    board.addShip(coords, ship);
    display.update(board.overview())
    return true
  }

  reconstructShip(selectedShip) {
    let len = Number(selectedShip.dataset.len)
    let dir = selectedShip.dataset.dir;
    let ship = new Ship(len, dir);
    return ship
  }

}
