import {BoardHelper as helper} from "./board_helper.js"

export class Display {

  constructor () {
    this.gridButtons = [];
    this.ships = [];
    this.twoGrids = document.querySelector("#two-frames");
    this.selectionContainer = document.querySelector(".selection-container")
    this.#addFrame();
    this.addShips();
  }

  update(state) {
    this.gridButtons.forEach(btn=>{
      btn.textContent = state[btn.dataset.y][btn.dataset.x];
    });
  }

  addShips () {
    helper.SHIP_LENGTHS.forEach(len=>{
      let ship = this.#makeShip(len);
      this.ships.push(ship);
      this.selectionContainer.appendChild(ship)
    })
  }

  #makeShip(len) {
    let ship = document.createElement("div");
    ship.className = "ship";

    for (let i = 0; i < len; i++) {
      ship.innerHTML += '<div class="ship-section" data-vertical="true" data-len="${len}"></div>'
    }

    return ship
  }

  reset() {
    this.twoGrids.replaceChildren();
    this.#addFrame();
  }

  #addFrame () {
    this.twoGrids.appendChild(this.#frame());
  }

  #frame() {
    let frame = document.createElement("div");
    frame.className = "frame"

    for (let y = 0; y < helper.HEIGHT; y++) {
      frame.appendChild(this.#newRow(y))
    }

    return frame;
  }

  #newRow(y){
    let rowDiv = document.createElement("div");
    rowDiv.className = "rowDiv";

    for (let x = 0; x < helper.WIDTH; x++){
      let btn = document.createElement("button")
      btn.dataset.x = x
      btn.dataset.y = y
      btn.class = "grid-btn"
      rowDiv.appendChild(btn);
      this.gridButtons.push(btn);
    }

    return rowDiv
  }

  highlightShipArea (sqr, ship) {
    console.log("HighlightShip", sqr);
  }

  removeShipHighlight (sqr, ship) {
    console.log("Remove highlight", sqr);
  }

  highlightPreShot (sqr) {
    //TODO add class to sqr
  }

  removePreShotHighlight (sqr) {
    //TODO remove class from sqr
  }

  highlightShip (ship) {
   //TODO
  }

  removeShipHighlight (ship){
    //TODO
  }

}
