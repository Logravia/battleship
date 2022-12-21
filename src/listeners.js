import {Board} from "./board.js"
import {Display} from "./display.js"

export class Listeners {
  constructor (board = new Board(), display = new Display()) {
    this.board = board;
    this.display = display;
    this.btns = display.gridButtons
    this.selectedShip = undefined;
  }


  // Allows ships to be placed
  placementMode() {
    this.placementListeners();
  }

  // Allows shots to be taken at
  shootMode() {
    this.shootingListeners();
  }

  // Removes all listeners
  disabled() {

  }

  placementListeners () {
    this.btns.forEach(btn=>{
      // Allow click to place the ship
      btn.addEventListener("click", e=>{
        let sqr = e.currentTarget;
        let coords = {x: sqr.dataset.x, y: sqr.dataset.y}
        this.#putShip(coords);
      })
      //Highlight where ship will be placed based on cursor, shipSize
      btn.addEventListener("mouseenter", e=>{
        this.display.highlightShipArea(e.currentTarget, this.selectedShip)
      })
      // Remove highlight
      btn.addEventListener("mouseleave", e=>{
        this.display.removeShipHighlight(e.target, this.selectedShip)
      })
    })
  }

  shootingListeners () {
    this.btns.forEach(btn=>{
      // Allow click to place to make the shot
      btn.addEventListener("click", e=>{
        let sqr = e.currentTarget;
        let coords = {x: sqr.dataset.x, y: sqr.dataset.y}
        this.#takeShot(coords);
      })
      //Highlight where the shot will take place
      btn.addEventListener("mouseenter", e=>{
        this.display.highlightPreShot(e.currentTarget)
      })
      //Remove the highlight
      btn.addEventListener("mouseleave", e=>{
        this.display.removePreShotHighlight(e.target)
      })
    })
  }

  #takeShot (coords) {
    this.board.shootAt(coords);
    this.display.update(this.board.overview());
  }

  #putShip (coords) {
    if (this.selectedShip) {
      this.board.addShip(coords, this.selectedShip);
      this.display.update(this.board.overview())
      this.selectedShip = undefined;
    }
  }
}
