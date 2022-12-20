import {BoardHelper as helper} from "./board_helper.js"

export class Display {

  constructor () {
    this.gridButtons = []
    this.twoGrids = document.querySelector("#two-frames");
    this.#addFrame();
  }

  update(state) {
    this.gridButtons.forEach(btn=>{
      btn.textContent = state[btn.dataset.y][btn.dataset.x];
    });
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
}
