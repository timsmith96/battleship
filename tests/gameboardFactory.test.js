import { gameboardFactory } from '../src/gameboardFactory.js';
import { shipFactory } from '../src/shipFactory.js';

test('gameboard can place a ship at given coordinates', () => {
  const gameboard1 = gameboardFactory();
  const testObj = {
    id: expect.anything(),
    hit: expect.anything(),
    isSunk: expect.anything(),
    length: 4,
    hitArray: [],
  };
  gameboard1.placeShip(4, [3, 5]);
  expect(gameboard1.gameboard).toEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', testObj, testObj, testObj, testObj, '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);
});

test('gameboard can place a ship at given coordinates', () => {
  const gameboard1 = gameboardFactory();
  const testObj = {
    id: expect.anything(),
    hit: expect.anything(),
    isSunk: expect.anything(),
    length: 3,
    hitArray: [],
  };
  gameboard1.placeShip(3, [7, 2]);
  expect(gameboard1.gameboard).toEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', testObj, testObj, testObj],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);
});

test('gameboard can determine if an attack hit a ship or not', () => {
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(4, [4, 1]);
  const testObj = {
    id: expect.anything(),
    hit: expect.anything(),
    isSunk: expect.anything(),
    length: 4,
    hitArray: [0],
  };
  gameboard1.recieveAttack([4, 1]);
  expect(gameboard1.gameboard).toEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', 'hit a ship', testObj, testObj, testObj, '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);
});

test('gameboard can determine which position a ship was hit in', () => {
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(6, [0, 5]);
  const testObj = {
    id: expect.anything(),
    hit: expect.anything(),
    isSunk: expect.anything(),
    length: 6,
    hitArray: [3],
  };
  gameboard1.recieveAttack([3, 5]);
  expect(gameboard1.gameboard).toEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    [testObj, testObj, testObj, 'hit a ship', testObj, testObj, '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);
});

test('gameboard can deal with multiple attacks to the same ship', () => {
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(4, [5, 2]);
  const testObj = {
    id: expect.anything(),
    hit: expect.anything(),
    isSunk: expect.anything(),
    length: 4,
    hitArray: [0, 2, 3],
  };
  gameboard1.recieveAttack([5, 2]);
  gameboard1.recieveAttack([7, 2]);
  gameboard1.recieveAttack([8, 2]);
  expect(gameboard1.gameboard).toEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', 'hit a ship', testObj, 'hit a ship', 'hit a ship', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);
});

test('gameboard can deal with hits to same place on a ship', () => {
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(4, [5, 2]);
  const testObj = {
    id: expect.anything(),
    hit: expect.anything(),
    isSunk: expect.anything(),
    length: 4,
    hitArray: [0],
  };
  gameboard1.recieveAttack([5, 2]);
  gameboard1.recieveAttack([5, 2]);
  gameboard1.recieveAttack([5, 2]);
  expect(gameboard1.gameboard).toEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', 'hit a ship', testObj, testObj, testObj, ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);
});

test('gameboard can save missed attacks', () => {
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(4, [5, 2]);
  gameboard1.recieveAttack([1, 8]);
  expect(gameboard1.missedAttacks).toEqual([[1, 8]]);
});

test('gameboard can tell if all ships have sunk', () => {
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(4, [5, 2]);
  gameboard1.recieveAttack([5, 2]);
  gameboard1.recieveAttack([6, 2]);
  gameboard1.recieveAttack([7, 2]);
  gameboard1.recieveAttack([8, 2]);
  expect(gameboard1.allShipsSunk()).toEqual(true);
});

test('gameboard can tell if all ships have sunk', () => {
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(4, [5, 2]);
  gameboard1.recieveAttack([5, 2]);
  gameboard1.recieveAttack([6, 2]);
  gameboard1.recieveAttack([7, 2]);
  expect(gameboard1.allShipsSunk()).toEqual(false);
});

test('gameboard can tell if all ships have sunk', () => {
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(4, [5, 2]);
  gameboard1.placeShip(2, [4, 2]);
  gameboard1.recieveAttack([5, 2]);
  gameboard1.recieveAttack([6, 2]);
  gameboard1.recieveAttack([7, 2]);
  expect(gameboard1.allShipsSunk()).toEqual(false);
});

test('gameboard can place multiple ships', () => {
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(4, [5, 2]);
  const testObj0 = {
    id: 0,
    hit: expect.anything(),
    isSunk: expect.anything(),
    length: 4,
    hitArray: expect.anything(),
  };
  gameboard1.placeShip(2, [1, 1]);
  const testObj1 = {
    id: 1,
    hit: expect.anything(),
    isSunk: expect.anything(),
    length: 2,
    hitArray: expect.anything(),
  };

  expect(gameboard1.gameboard).toEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', testObj1, testObj1, '', '', '', '', '', '', ''],
    ['', '', '', '', '', testObj0, testObj0, testObj0, testObj0, ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);
});

test('gameboard can tell if all ships have sunk', () => {
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(4, [5, 2]);
  gameboard1.recieveAttack([5, 2]);
  gameboard1.recieveAttack([6, 2]);
  gameboard1.recieveAttack([7, 2]);
  gameboard1.recieveAttack([8, 2]);
  expect(gameboard1.allShipsSunk()).toEqual(true);
});

test('gameboard can tell if all ships have sunk', () => {
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(2, [4, 2]);
  gameboard1.recieveAttack([4, 2]);
  gameboard1.recieveAttack([5, 2]);
  expect(gameboard1.allShipsSunk()).toEqual(true);
});

test('gameboard pushes ships onto ship array after placing', () => {
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(4, [5, 2]);
  gameboard1.placeShip(2, [4, 2]);
  gameboard1.recieveAttack([5, 2]);
  gameboard1.recieveAttack([6, 2]);
  gameboard1.recieveAttack([7, 2]);
  gameboard1.recieveAttack([8, 2]);
  gameboard1.recieveAttack([4, 2]);
  gameboard1.recieveAttack([5, 2]);
  expect(gameboard1.ships.length).toEqual(2);
});

test('gameboard pushes ships onto ship array after placing', () => {
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(4, [5, 2]);
  gameboard1.shipCounter++;
  gameboard1.placeShip(2, [7, 7]);
  gameboard1.recieveAttack([5, 2]);
  gameboard1.recieveAttack([6, 2]);
  gameboard1.recieveAttack([7, 2]);
  gameboard1.recieveAttack([8, 2]);
  gameboard1.recieveAttack([7, 7]);
  gameboard1.recieveAttack([7, 7]);
  expect(gameboard1.shipCounter).toEqual(1);
  gameboard1.ships.forEach((ship) => {
    console.log(ship);
    expect(ship.isSunk()).toEqual(true);
  });
});

test('gameboard can tell if all ships have sunk', () => {
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(4, [5, 2]);
  gameboard1.placeShip(2, [4, 2]);
  gameboard1.recieveAttack([5, 2]);
  gameboard1.recieveAttack([6, 2]);
  gameboard1.recieveAttack([7, 2]);
  gameboard1.recieveAttack([8, 2]);
  gameboard1.recieveAttack([4, 2]);
  gameboard1.recieveAttack([5, 2]);
  expect(gameboard1.allShipsSunk()).toEqual(true);
});

test('hits are being stored on a ships hit array correctly', () => {
  const testObj1 = {
    id: 0,
    hit: expect.anything(),
    isSunk: expect.anything(),
    length: 4,
    hitArray: [0, 1, 2],
  };
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(4, [5, 2]);
  gameboard1.recieveAttack([5, 2]);
  gameboard1.recieveAttack([6, 2]);
  gameboard1.recieveAttack([7, 2]);
  expect(gameboard1.gameboard).toEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    [
      '',
      '',
      '',
      '',
      '',
      'hit a ship',
      'hit a ship',
      'hit a ship',
      testObj1,
      '',
    ],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);
});
