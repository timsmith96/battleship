import { shipFactory } from './shipFactory';

test('ship factory returns ship object with appropriate properties', () => {
  expect(shipFactory(3)).toEqual({
    hit: expect.anything(),
    isSunk: expect.anything(),
    length: 3,
    hitArray: [],
  });
});

test('ship object method hit works correctly', () => {
  const ship1 = shipFactory(2);
  ship1.hit(4);
  expect(ship1.hitArray).toEqual([4]);
});

test('ship object method isSunk works correctly', () => {
  const ship1 = shipFactory(3);
  ship1.hit(0);
  ship1.hit(1);
  ship1.hit(2);
  expect(ship1.isSunk()).toEqual(true);
});

test('ship object method isSunk works correctly', () => {
  const ship1 = shipFactory(6);
  ship1.hit(0);
  ship1.hit(1);
  ship1.hit(2);
  ship1.hit(3);
  ship1.hit(4);
  ship1.hit(5);
  expect(ship1.isSunk()).toEqual(true);
});

test('ship object method isSunk works correctly', () => {
  const ship1 = shipFactory(6);
  ship1.hit(0);
  ship1.hit(1);
  ship1.hit(2);
  ship1.hit(3);
  expect(ship1.isSunk()).toEqual(false);
});
