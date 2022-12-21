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
      btn.className = `${state[btn.dataset.y][btn.dataset.x]} grid-btn`
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
    ship.dataset.len = len;
    ship.dataset.dir = "vertical"

    for (let i = 0; i < len; i++) {
      ship.innerHTML += '<div class="ship-section"></div>'
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
    frame.appendChild(this.#letters());


    for (let y = 0; y < helper.HEIGHT; y++) {
      frame.appendChild(this.#newRow(y))
    }

    return frame;
  }

  #letters () {
    let letters = document.createElement("div")
    letters.className = "rowDiv"
    letters.innerHTML = `
    <button class="letter"></button>
    <button class="letter">A</button>
    <button class="letter">B</button>
    <button class="letter">C</button>
    <button class="letter">D</button>
    <button class="letter">E</button>
    <button class="letter">F</button>
    <button class="letter">G</button>
    <button class="letter">H</button>
    <button class="letter">J</button>
    <button class="letter">K</button>
    `
    return letters;
  }

  #newRow(y){
    let rowDiv = document.createElement("div");
    rowDiv.className = "rowDiv";
    let number = document.createElement("button")
    number.className = "number"

    number.textContent = y;

    rowDiv.appendChild(number);

    for (let x = 0; x < helper.WIDTH; x++){
      let btn = document.createElement("button")
      btn.dataset.x = x
      btn.dataset.y = y
      btn.className = "grid-btn"
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
