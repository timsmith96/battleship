import { shipFactory } from './shipFactory';
import { DOM } from './DOM';
import { cpuPlayer } from './players';

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

  const shipIconsX = [
    './destroyer.png',
    './submarine.png',
    './cruiser.png',
    './battleship.png',
    './warship.png',
  ];

  const shipIconsY = [
    './destroyer-y.png',
    './submarine-y.png',
    './cruiser-y.png',
    './battleship-y.png',
    './warship-y.png',
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

  const isArrayInArray = (arr, item) => {
    const itemAsString = JSON.stringify(item);

    const contains = arr.some((element) => {
      return JSON.stringify(element) === itemAsString;
    });
    return contains;
  };

  const saveLocation = (shipId, shipLength, coordinatesArray) => {
    const [x, y] = coordinatesArray;
    shipLocations[shipId] = {
      xStart: x,
      xEnd: x + (shipLength - 1),
      isXAxis: DOM.getAxis(),
      startingCoords: [x, y],
      length: shipLength,
      id: shipId,
    };
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
    let startingCell = DOM.convertCoordsToCells([x, y], 1);
    const currentShipLength = shipsToPlace[shipsToPlace.length - 1];
    const rand = Math.random() < 0.5;
    rand < 0.5 ? DOM.setAxis(true) : DOM.setAxis(false);
    let cellsToColor = DOM.convertCoordsToCells([x, y], currentShipLength);
    if (DOM.isValidShipHover(cellsToColor, [x, y], cpuCells)) {
      const img = document.createElement('img');
      img.classList.add('hide-me');
      const axis = DOM.getAxis();
      if (axis) {
        img.src = shipIconsX[shipIconsX.length - 1];
        img.id = shipIconsX[shipIconsX.length - 1];
      } else {
        img.src = shipIconsY[shipIconsY.length - 1];
        img.id = shipIconsY[shipIconsY.length - 1];
      }
      cpuCells[startingCell].appendChild(img);
      // cpuCells[startingCell].style.backgroundColor = 'rgb(51, 65, 85)';
      // for (let i = 1; i < cellsToColor.length; i++) {
      //   cpuCells[cellsToColor[i]].style.backgroundColor = 'rgb(51, 65, 85)';
      // }
      shipIconsX.pop();
      shipIconsY.pop();
      placeShip(currentShipLength, [x, y]);
      DOM.addClass(cellsToColor, cpuCells, 'ship-cell');
      shipsToPlace.pop();
      console.log(gameboard);
    } else {
      placeCpuShips(cpuCells);
    }
  };

  const recieveAttack = (coordinatesArray) => {
    let [x, y] = coordinatesArray;
    let result;
    console.log(gameboard[y][x]);
    let target = gameboard[y][x];
    const id = target.id;
    if (typeof target === 'object') {
      target.hit(x - shipLocations[id].xStart);
      gameboard[y][x] = 'hit a ship!';
      if (target.isSunk()) {
        console.log(target);
        console.log(shipLocations);
        const shipStartCoords = shipLocations[target.id].startingCoords;
        let [x, y] = shipStartCoords;
        const arr = [];
        for (let i = 0; i < shipLocations[target.id].length; i++) {
          arr.push([x, y]);
          shipLocations[target.id].isXAxis ? x++ : y++;
        }
        const cells = DOM.convertCoordsToNums(arr);
        console.log(cells);
        const cpuCells = document.querySelectorAll('.clickable-cell');
        cells.forEach((cell, index) => {
          if (index === 0) {
            cpuCells[cell].firstElementChild.style.visibility = 'visible';
          }
          cpuCells[cell].style.backgroundColor = 'transparent';
        });
        result = 'SHIP SUNK!';
      } else {
        result = 'SHIP HIT!';
      }
    } else if (target === 'hit a ship') {
      gameboard[y][x] = 'hit a ship';
      result = 'already hit a ship';
    } else {
      gameboard[y][x] = 'X';
      result = 'MISS!';
    }
    missedAttacks.push([x, y]);
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
    missedAttacks,
    isArrayInArray,
    shipLocations,
  };
};

export { gameboardFactory };
