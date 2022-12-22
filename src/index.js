import {Display} from "./display.js"
import {Board} from "./board.js"
import {Listeners} from "./listeners.js"
import {BoardHelper as helper} from "./board_helper.js"
import {AI} from "./ai.js"
import "./reset.css"
import "./style.css"

let playerDisplay = new Display();
let board = new Board();

playerDisplay.update(board.overview());

let listeners = new Listeners(board, playerDisplay);
listeners.placementMode();

let botDisplay = new Display(false);
let botBoard = new Board();
let botListeners = new Listeners(botBoard, botDisplay);
botListeners.shootMode()


let ai = AI();

helper.SHIP_LENGTHS.forEach(_=>{
  let ship = ai.getShip();
 while (true)  {
   let success = botBoard.addShip(ai.randomCoords(), ship);
   if (success) {break;}
 }
});
