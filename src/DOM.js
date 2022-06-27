import { humanPlayer } from './players';

const DOM = (() => {
  const humanBoardContainer = document.getElementById('human-gameboard');
  const cpuBoardContainer = document.getElementById('cpu-gameboard');

  let xAxisSelected = false;

  let shipsPlaced = false;

  const onload = (humanGameboard, cpuGameboard, human, computer) => {
    renderGameboard(humanGameboard, true);
    renderGameboard(cpuGameboard, false);
  };

  const updateCell = (target, coords, gameboard) => {
    const [x, y] = coords;
    target.textContent = gameboard.gameboard[y][x];
  };

  const editHumanCell = (cell, square) => {
    if (typeof square === 'object') {
      cell.textContent = 'ship';
    } else if (square === 'hit') {
      cell.textContent = 'X';
    }
    cell.classList.add('human-cell');
    return cell;
  };

  const editCpuCell = (cell, square, x, y) => {
    if (square === 'hit') {
      cell.textContent = 'X';
    }
    cell.classList.add('clickable-cell');
    return cell;
  };

  const renderGameboard = (gameboard, isHuman) => {
    let x = 0;
    let y = 0;
    gameboard.gameboard.forEach((row) => {
      row.forEach((square) => {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.x = x;
        cell.dataset.y = y;
        if (isHuman) {
          cell = editHumanCell(cell, square);
          humanBoardContainer.appendChild(cell);
        } else {
          cell = editCpuCell(cell, square, x, y);
          cpuBoardContainer.appendChild(cell);
        }
        x++;
      });
      x = 0;
      y++;
    });
  };

  const coordsToColor = (coords, length) => {
    let [x, y] = coords;
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push([x, y]);
      xAxisSelected ? x++ : y++;
    }
    return arr;
  };

  const convertCoordsToNums = (coords) => {
    return coords.map((arr) => {
      const [x, y] = arr;
      return +y * 10 + +x;
    });
  };

  const convertCoordsToCells = (coords, length) => {
    let coordsToColorArray = coordsToColor(coords, length);
    return convertCoordsToNums(coordsToColorArray);
  };

  const shipOverlap = (cellsToColor, cellsArray) => {
    console.log(cellsToColor);
    return cellsToColor.some((cell) => {
      return cellsArray[cell].classList.contains('ship-cell');
    });
  };

  const isValidShipHover = (cellsToColor, coords, cellsArray) => {
    const length = cellsToColor.length;
    const startingSquare = xAxisSelected ? coords[0] : coords[1];
    if (+startingSquare + +length <= 10) {
      if (!shipOverlap(cellsToColor, cellsArray)) {
        return true;
      }
    } else {
      return false;
    }
  };

  const colorCells = (cellsToColor, cellsArray, color) => {
    cellsToColor.forEach((cell) => {
      cellsArray[cell].style.backgroundColor = color;
    });
  };

  const addClass = (cellsToAddTo, cellsArray, cssClass) => {
    cellsToAddTo.forEach((cell) => {
      cellsArray[cell].classList.add(cssClass);
    });
  };

  const getCoords = (e) => {
    let x = e.target.dataset.x;
    let y = e.target.dataset.y;
    return [x, y];
  };

  const placeShip = (cells) => {
    cells.forEach((cell) => {
      cell.style.backgroundColor = 'red';
    });
  };

  const removeColor = (cells) =>
    cells.forEach((cell) => (cell.style.backgroundColor = 'white'));

  return {
    renderGameboard,
    onload,
    getCoords,
    updateCell,
    convertCoordsToCells,
    coordsToColor,
    removeColor,
    colorCells,
    isValidShipHover,
    shipsPlaced,
    placeShip,
    addClass,
  };
})();

export { DOM };
