import {BoardHelper as helper} from "../src/board_helper.js"

it("Knows when coords are within board", ()=>{
  let coords  = {x: 0, y:0};
  expect(helper.withinBoard(coords)).toBe(true);
})


it("Knows when coords are within board II", ()=>{
  let coords  = {x: 5, y:5};
  expect(helper.withinBoard(coords)).toBe(true);
})

it("Knows when coords are within board III", ()=>{
  let coords  = {x: 1, y:5};
  expect(helper.withinBoard(coords)).toBe(true);
})

it("Knows when coords are outside the board", ()=>{
  let coords  = {x: -1, y:-1};
  expect(helper.withinBoard(coords)).toBe(false);
})

it("Knows when coords are outside the board II", ()=>{
  let coords  = {x: 0, y: 10};
  expect(helper.withinBoard(coords)).toBe(false);
})

it("Knows when coords are outside the board III", ()=>{
  let coords  = {x: 10, y: 0};
  expect(helper.withinBoard(coords)).toBe(false);
})

it("returns coordinates of all the squares around (0,0)", ()=>{
  let coords  = {x: 0, y:0};
  let answer = [{x:1, y:0}, {x:1, y:1}, {x:0, y:1}];
  expect(helper.squaresAround(coords)).toEqual(answer)
});

it("returns coordinates of all the squares around (9,9)", ()=>{
  let coords  = {x: 9, y:9};
  let answer = [{x:9, y:8}, {x:8, y:9}, {x:8, y:8}];
  expect(helper.squaresAround(coords)).toEqual(answer)
});

it("returns coordinates of all the squares around (5,5)", ()=>{
  let coords  = {x: 5, y:5};
  let answer = [{x:5, y:4}, {x:6, y:4}, {x:6, y:5},{x:6,y:6},{x:5,y:6},{x:4,y:6},{x:4,y:5},{x:4,y:4}];
  expect(helper.squaresAround(coords)).toEqual(answer)
});


it("returns one square around (-1,-1) within the board", ()=>{
  let coords  = {x: -1, y:-1};
  let answer = [{x:0,y:0}];
  expect(helper.squaresAround(coords)).toEqual(answer)
});

it("returns only squares within the board", ()=>{
  let coords  = {x: 12, y:12};
  let answer = [];
  expect(helper.squaresAround(coords)).toEqual(answer)
});


it("returns vertical line of squares from (0,0) length of 3", ()=>{
  let coords = {x: 0, y: 0};
  let len = 3
  let line = helper.squareLine(coords, len, "vertical")
  let answer = [{x:0, y:0},{x:0,y:1},{x:0,y:2}]
  expect(line).toEqual(answer);
})


it("returns horizontal line of squares from (0,0) length of 3", ()=>{
  let coords = {x: 0, y: 0};
  let len = 3
  let line = helper.squareLine(coords, len, "horizontal")
  let answer = [{x:0, y:0},{x:1,y:0},{x:2,y:0}]
  expect(line).toEqual(answer);
})
