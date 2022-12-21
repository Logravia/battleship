import {Board} from "./board.js"
import {Display} from "./display.js"
import { Ship } from "./ship.js";

export class Listeners {
  constructor (board = new Board(), display = new Display()) {
    this.board = board;
    this.display = display;
    this.btns = display.gridButtons;
    this.ships = display.ships;
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
    display.reset();
  }

  placementListeners () {
    // for grid buttons
    this.btns.forEach(btn=>{
      // Allow click to place the ship
      btn.addEventListener("click", e=>{
        let sqr = e.currentTarget;
        let coords = {x: Number(sqr.dataset.x), y: Number(sqr.dataset.y)}
        this.#putShip(coords);
      })
      //Highlight where ship will be placed based on cursor, shipSize
      btn.addEventListener("mouseenter", e=>{
        if (this.selectedShip) {
          this.display.highlightShipArea(e.currentTarget, this.selectedShip)
        }
      })
      // Remove highlight
      btn.addEventListener("mouseleave", e=>{
        if(this.selectedShip){
          this.display.removeShipHighlight(e.target, this.selectedShip)
        }
      })
    })
    //for ships to be placed
    this.ships.forEach(ship=>{
      ship.addEventListener("click", e=>{
        this.selectedShip = e.currentTarget;
      })

      ship.addEventListener("dblclick", e=>{
        this.display.rotateShip(e.currentTarget);
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

  makeShip() {
    let len = Number(this.selectedShip.dataset.len)
    let dir = this.selectedShip.dataset.dir;
    let ship = new Ship(len, dir);
    return ship
  }

  #putShip (coords) {
    if (this.selectedShip) {

      let ship = this.makeShip();

      if(!this.board.legalSpotForShip(coords, ship)){return}

      this.board.addShip(coords, ship);
      this.display.update(this.board.overview())
      this.selectedShip.remove()
      this.selectedShip = undefined;
    }
  }
}
