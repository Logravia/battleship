import {Board} from "./board.js"
import {Display} from "./display.js"
import { Ship } from "./ship.js";

export class Listeners {
  constructor (board = new Board(), display = new Display(), game) {
    this.board = board;
    this.display = display;
    this.game = game;
    this.btns = display.gridButtons;
    this.ships = display.ships;
    this.selectedShip = undefined;
    console.log(game);
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

        e.currentTarget.textContent = ""
        if (this.selectedShip) {
          let success = this.game.putShip(coords, this.board, this.display, this.selectedShip);
          if (success) {
            this.selectedShip.remove()
            this.selectedShip = undefined;
          }
        }
        console.log(this.ships);
      })
      //Highlight where ship will be placed based on cursor, shipSize
      btn.addEventListener("mouseenter", e=>{
        if (this.selectedShip) {
          let x = e.currentTarget.dataset.x
          let y = e.currentTarget.dataset.y
          let coords = {x: Number(x), y: Number(y)}
          this.display.update(this.board.tempOverview(coords, this.game.reconstructShip(this.selectedShip)))
          // Shows X when illegal to put the ship
          if (e.currentTarget.className == "adjacent grid-btn" ||
              (e.currentTarget.className == "water grid-btn" && this.selectedShip)) {
            e.currentTarget.textContent = "X"
          }
        }
      })
      // Remove highlight
      btn.addEventListener("mouseleave", e=>{
        if(this.selectedShip){
          this.display.update(this.board.overview())
          e.currentTarget.textContent = ""
        }
      })
    })
    //for ships to be placed
    this.ships.forEach(ship=>{
      ship.addEventListener("click", e=>{
        if (this.selectedShip) {this.selectedShip.className = "ship"}
        e.currentTarget.className = "selected-ship ship"
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
        this.game.takeShot(coords, this.board, this.display);
      })
      //Highlight where the shot will take place
      btn.addEventListener("mouseenter", e=>{
        this.display.highlightPreShot(e.currentTarget)
        e.currentTarget.textContent = "X"
      })
      //Remove the highlight
      btn.addEventListener("mouseleave", e=>{
        this.display.removePreShotHighlight(e.target)
        e.currentTarget.textContent = ""
      })
    })
  }
}
