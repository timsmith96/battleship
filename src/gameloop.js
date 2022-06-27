import { gameboardFactory } from './gameboardFactory';
import { cpuPlayer, humanPlayer } from './players';
import { DOM } from './DOM';

const gameloop = () => {
  const human = humanPlayer();
  const computer = cpuPlayer();

  const humanGameboard = gameboardFactory();
  const cpuGameboard = gameboardFactory();

  DOM.onload(humanGameboard, cpuGameboard, human, computer);

  const cpuCells = document.querySelectorAll('.clickable-cell');
  const humanCells = Array.from(document.querySelectorAll('.human-cell'));

  cpuCells.forEach((cell) => {
    cell.addEventListener('mouseover', (e) => {
      const [x, y] = DOM.getCoords(e);
      let cellsToColor = DOM.convertCoordsToCells([x, y], 4);
      if (DOM.isValidShipHover(cellsToColor, [x, y], cpuCells)) {
        DOM.colorCells(cellsToColor, cpuCells, 'red');
      }
    });

    cell.addEventListener('mouseout', (e) => {
      DOM.removeColor(cpuCells);
    });

    cell.addEventListener('click', (e) => {
      const coords = DOM.getCoords(e);
      if (!DOM.shipsPlaced) {
        let cellsToColor = DOM.convertCoordsToCells(coords, 4);
        DOM.addClass(cellsToColor, cpuCells, 'ship-cell');
      } else {
        human.makeMove(cpuGameboard, coords);
        DOM.updateCell(e.target, coords, cpuGameboard);
        const [x, y] = computer.makeMove(humanGameboard);
        const target = humanCells.find(
          (cell) => cell.dataset.x === String(x) && cell.dataset.y === String(y)
        );
        DOM.updateCell(target, [x, y], humanGameboard);
        if (cpuGameboard.allShipsSunk() && humanGameboard.allShipsSunk()) {
          console.log('Game over! All ships sunk');
        }
      }
    });
  });

  cpuGameboard.placeShip(3, [3, 8]);
  humanGameboard.placeShip(4, [2, 2]);
};

gameloop();
