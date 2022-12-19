import {Board} from "../src/board.js";

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
