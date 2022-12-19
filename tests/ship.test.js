import {Ship} from '../src/ship.js';

it("It has default direction of vertical",()=>{
  let ship = new Ship();
  expect(ship.direction).toBe("vertical")
})

it("Direction toggles",()=>{
  let ship = new Ship();
  ship.toggleDirection();
  expect(ship.direction).toBe("horizontal")
})

it("Direction toggles multiple times",()=>{
  let ship = new Ship();
  ship.toggleDirection();
  ship.toggleDirection();
  ship.toggleDirection();
  expect(ship.direction).toBe("horizontal")
})

it("is alive without damage",()=>{
  let ship = new Ship();
  expect(ship.isDead()).toBe(false)
})

it("is alive with one damage below size",()=>{
  let size = 2;
  let ship = new Ship(size);
  ship.addDamage();
  expect(ship.isDead()).toBe(false)
})

it("is dead with damage equal to size",()=>{
  let size = 2;
  let ship = new Ship(size);
  ship.addDamage();
  ship.addDamage();
  expect(ship.isDead()).toBe(true)
})
