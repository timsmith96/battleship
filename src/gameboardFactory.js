import { shipFactory } from './shipFactory';
import { DOM } from './DOM';

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

  const shipTypes = [
    'Destroyer',
    'Submarine',
    'Cruiser',
    'Battleship',
    'Carrier',
  ];

  const shipsToPlace = [2, 3, 3, 4, 5];

  const missedAttacks = [];

  const shipLocations = {};

  const getShipType = () => {
    return shipTypes.pop();
  };

  const getShipLength = () => {
    return shipsToPlace[shipsToPlace.length - 1];
  };

  const removeShip = () => {
    shipsToPlace.pop();
  };

  const allShipsPlaced = () => {
    return shipsToPlace.length === 0 ? true : false;
  };

  const allShipsSunk = () => {
    return ships.every((ship) => {
      return ship.isSunk();
    });
  };

  const saveLocation = (shipId, shipLength, coordinatesArray) => {
    const [x, y] = coordinatesArray;
    shipLocations[shipId] = { xStart: x, xEnd: x + (shipLength - 1) };
  };

  const placeShip = (shipLength, coordinatesArray) => {
    let [x, y] = coordinatesArray;
    const ship = shipFactory(shipLength, shipCounter);
    shipCounter++;
    for (let i = 0; i < shipLength; i++) {
      gameboard[y][x] = ship;
      DOM.getAxis() ? x++ : y++;
    }
    saveLocation(ship.id, shipLength, coordinatesArray);
    ships.push(ship);
  };

  const placeCpuShips = (cpuCells) => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const currentShipLength = shipsToPlace[shipsToPlace.length - 1];
    const rand = Math.random() < 0.5;
    rand < 0.5 ? DOM.setAxis(true) : DOM.setAxis(false);
    let cellsToColor = DOM.convertCoordsToCells([x, y], currentShipLength);
    if (DOM.isValidShipHover(cellsToColor, [x, y], cpuCells)) {
      placeShip(currentShipLength, [x, y]);
      DOM.addClass(cellsToColor, cpuCells, 'ship-cell');
      shipsToPlace.pop();
    } else {
      placeCpuShips(cpuCells);
    }
  };

  const recieveAttack = (coordinatesArray) => {
    const [x, y] = coordinatesArray;
    let result;
    let target = gameboard[y][x];
    const id = target.id;
    if (typeof target === 'object') {
      target.hit(x - shipLocations[id].xStart);
      gameboard[y][x] = 'hit a ship!';
      result = 'SHIP HIT!';
    } else if (target === 'hit a ship') {
      gameboard[y][x] = 'hit a ship';
      result = 'already hit a ship';
    } else {
      missedAttacks.push([x, y]);
      gameboard[y][x] = 'X';
      result = 'MISS!';
    }
    return result;
  };

  return {
    gameboard,
    placeShip,
    recieveAttack,
    missedAttacks,
    allShipsSunk,
    getShipLength,
    removeShip,
    allShipsPlaced,
    ships,
    shipCounter,
    placeCpuShips,
    getShipType,
  };
};

export { gameboardFactory };
