import { humanPlayer } from './players';

const DOM = (() => {
  const humanBoardContainer = document.getElementById('human-gameboard');
  const cpuBoardContainer = document.getElementById('cpu-gameboard');

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

  const getCoords = (e) => {
    let x = e.target.dataset.x;
    let y = e.target.dataset.y;
    return [x, y];
  };

  return { renderGameboard, onload, getCoords, updateCell };
})();

export { DOM };
