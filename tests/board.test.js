import {Board} from "../src/board.js";
import {Ship} from "../src/ship.js";

let board;

beforeEach(()=>{
  board = new Board();
})

it("Returns an array",()=>{
  let isArray = Array.isArray(board.overview());
  expect(isArray).toBe(true);
})

it("Returns array with 10 elements",()=>{
  expect(board.overview().length).toBe(10);
})

it("Returns array where first element has 10 entries",()=>{
  expect(board.overview()[0].length).toBe(10);
})


it("Returns array where first element has 10 entries of 'water' by default",()=>{
  let allWater = board.overview()[0].every(el=>el=="water");
  expect(allWater).toBe(true);
})

it("Adds a ship of size 1 to (0,0)", ()=>{
  let coords = {x: 0, y: 0};
  let size = 1;
  let direction = "vertical";
  let ship = new Ship(size, direction);

  board.addShip(coords, ship)

  expect(board.overview()[coords.y][coords.x]).toBe("ship");
});

it("Adds a ship of size 2 starting from (0,0)", ()=>{
  let coords = {x: 0, y: 0};
  let size = 2;
  let direction = "vertical";
  let ship = new Ship(size, direction);

  board.addShip(coords, ship)

  expect(board.overview()[coords.y][coords.x]).toBe("ship");
  expect(board.overview()[coords.y+1][coords.x]).toBe("ship");
});

it("Marks adjacent squares next to the ship", ()=>{
  let coords = {x: 0, y: 0};
  let size = 2;
  let direction = "vertical";
  let ship = new Ship(size, direction);

  board.addShip(coords, ship)
  console.log(board.overview());
  expect(board.overview()[0][1]).toBe("adjacent");
  expect(board.overview()[1][1]).toBe("adjacent");
  expect(board.overview()[2][1]).toBe("adjacent");
  expect(board.overview()[2][0]).toBe("adjacent");
});

it("Does not put ship on adjacent water tiles", ()=>{
  let coords = {x: 0, y: 0};
  let adjacentCoords = {x: 1, y: 0};

  let size = 2;
  let direction = "vertical";
  let ship = new Ship(size, direction);

  board.addShip(coords, ship)
  board.addShip(adjacentCoords, ship);

  expect(board.overview()[0][1]).toBe("adjacent");
  expect(board.overview()[1][1]).toBe("adjacent");
  expect(board.overview()[2][1]).toBe("adjacent");
  expect(board.overview()[2][0]).toBe("adjacent");
});
