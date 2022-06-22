import { gameboardFactory } from './gameboardFactory';
import { shipFactory } from './shipFactory';

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

test('gameboard can refuse to place a ship if there is not enough room', () => {
  const gameboard1 = gameboardFactory();
  const testObj = {
    id: expect.anything(),
    hit: expect.anything(),
    isSunk: expect.anything(),
    length: 4,
    hitArray: [],
  };
  gameboard1.placeShip(5, [8, 0]);
  expect(gameboard1.gameboard).toEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
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
    ['', '', '', '', 'hit', testObj, testObj, testObj, '', ''],
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
    [testObj, testObj, testObj, 'hit', testObj, testObj, '', '', '', ''],
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
    ['', '', '', '', '', 'hit', testObj, 'hit', 'hit', ''],
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

test('gameboard can place multiple ships when they overlap', () => {
  const gameboard1 = gameboardFactory();
  gameboard1.placeShip(4, [5, 2]);
  const testObj0 = {
    id: 0,
    hit: expect.anything(),
    isSunk: expect.anything(),
    length: 4,
    hitArray: expect.anything(),
  };
  gameboard1.placeShip(2, [4, 2]);
  const testObj1 = {
    id: 1,
    hit: expect.anything(),
    isSunk: expect.anything(),
    length: 2,
    hitArray: expect.anything(),
  };

  expect(gameboard1.gameboard).toEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
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
  gameboard1.placeShip(2, [4, 2]);
  gameboard1.recieveAttack([5, 2]);
  gameboard1.recieveAttack([6, 2]);
  gameboard1.recieveAttack([7, 2]);
  gameboard1.recieveAttack([8, 2]);
  gameboard1.recieveAttack([4, 2]);
  gameboard1.recieveAttack([5, 2]);
  expect(gameboard1.allShipsSunk()).toEqual(true);
});
