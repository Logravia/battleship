import {Display} from "./display.js"
import {Board} from "./board.js"

let playerDisplay = new Display();
let board = new Board();

playerDisplay.update(board.overview());
