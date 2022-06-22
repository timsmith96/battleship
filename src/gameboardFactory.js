import { shipFactory } from './shipFactory';

const gameboardFactory = () => {
  const gameboard = [
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
  ];

  let shipCounter = 0;

  const ships = [];

  const missedAttacks = [];

  const shipLocations = {};

  const allShipsSunk = () => {
    return ships.every((ship) => {
      return ship.isSunk();
    });
  };

  const isSquareEmpty = (coordinatesArray) => {
    let [x, y] = coordinatesArray;
    return gameboard[y][x] === '' ? true : false;
  };

  const isNotOverlap = (shipLength, coordinatesArray) => {
    let [x, y] = coordinatesArray;
    for (let i = 0; i < shipLength; i++) {
      if (gameboard[y][x] !== '') {
        return false;
      }
      x++;
    }
    return true;
  };

  const isValidLength = (shipLength, coordinatesArray) => {
    let [x, y] = coordinatesArray;
    return shipLength + x <= 10 && y <= 10 ? true : false;
  };

  const isValidPlacement = (shipLength, coordinatesArray) => {
    return (
      isSquareEmpty(coordinatesArray) &&
      isValidLength(shipLength, coordinatesArray) &&
      isNotOverlap(shipLength, coordinatesArray)
    );
  };

  const saveLocation = (shipId, shipLength, coordinatesArray) => {
    const [x, y] = coordinatesArray;
    shipLocations[shipId] = { xStart: x, xEnd: x + (shipLength - 1) };
  };

  const placeShip = (shipLength, coordinatesArray) => {
    let [x, y] = coordinatesArray;
    const ship = shipFactory(shipLength, shipCounter);
    shipCounter++;
    if (isValidPlacement(shipLength, coordinatesArray)) {
      for (let i = 0; i < shipLength; i++) {
        gameboard[y][x] = ship;
        x++;
      }
      saveLocation(ship.id, shipLength, coordinatesArray);
      ships.push(ship);
    }
  };

  const recieveAttack = (coordinatesArray) => {
    const [x, y] = coordinatesArray;
    let target = gameboard[y][x];
    const id = target.id;
    if (typeof target === 'object') {
      target.hit(x - shipLocations[id].xStart);
    } else {
      missedAttacks.push([x, y]);
    }
    gameboard[y][x] = 'hit';
  };

  return {
    gameboard,
    placeShip,
    recieveAttack,
    missedAttacks,
    allShipsSunk,
  };
};

export { gameboardFactory };
