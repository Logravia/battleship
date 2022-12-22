import {Ship} from "./ship.js"
import {BoardHelper as helper} from "./board_helper.js"

export const  AI = () => {

  let ships = [];

  const randomCoords = () => {
    return {x: randNum(0,10), y: randNum(0,10)}
  }

  const randNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const randShip = (size)=> {
    let dir = Math.random() > 0.5 ? "vertical" : "horizontal";
    return new Ship(size, dir);
  }

  const getShip = ()=> {
    return ships.pop();
  }

  helper.SHIP_LENGTHS.forEach(ln=>{
    ships.push(randShip(ln));
  })

  return {randomCoords, getShip}
}
