import { humanPlayer } from './players';

const DOM = (() => {
  const humanBoardContainer = document.getElementById('human-gameboard');
  const cpuBoardContainer = document.getElementById('cpu-gameboard');
  const changeAxis = document.querySelector('#change-axis');

  document.addEventListener('DOMContentLoaded', function () {
    xAxisSelected = true;
    changeAxis.addEventListener('click', () => {
      xAxisSelected = xAxisSelected === true ? false : true;
      changeAxis.textContent =
        changeAxis.textContent === 'X axis' ? 'Y axis' : 'X axis';
    });
  });

  let xAxisSelected = true;

  const getAxis = () => {
    return xAxisSelected;
  };

  const setAxis = (rand) => {
    xAxisSelected = rand ? true : false;
  };

  let shipsPlaced = false;

  const onload = (humanGameboard, cpuGameboard, human, computer) => {
    renderGameboard(humanGameboard, true);
    renderGameboard(cpuGameboard, false);
    updateInstructions(humanGameboard.getShipType());
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
    cells.forEach((cell) => (cell.style.backgroundColor = '#1e3a8a'));

  const updateInstructions = (shipType) => {
    const shipText = document.getElementById('ship-type');
    shipText.textContent = shipType;
  };

  const updateNarration = (narration, attackResult, otherPlayer) => {
    const text = document.getElementById(narration);
    const result = document.getElementById('result-of-attack');
    const otherPlayerText = document.getElementById(otherPlayer);
    otherPlayerText.style.visibility = 'hidden';
    if (narration === 'human-narration') {
      text.textContent = 'You fire a shot into enemy waters... ';
      text.style.visibility = 'visible';
    } else if (narration === 'cpu-narration') {
      text.textContent = 'The enemy fires a shot into your waters...';
      text.style.visibility = 'visible';
    }
    setTimeout(() => {
      result.style.visibility = 'visible';
      result.textContent = attackResult;
    }, 1000);
    result.style.visibility = 'hidden';
  };

  const editText = (idToEdit, newText) => {
    const toEdit = document.getElementById(idToEdit);
    toEdit.textContent = newText;
  };

  const hideElement = (idToHide) => {
    const toHide = document.getElementById(idToHide);
    toHide.style.visibility = 'hidden';
  };

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
    getAxis,
    setAxis,
    updateInstructions,
    updateNarration,
    editText,
    hideElement,
  };
})();

export { DOM };
