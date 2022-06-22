import { gameboardFactory } from './gameboardFactory';
import { cpuPlayer, humanPlayer } from './players';
import { DOM } from './DOM';

// INITAL LOADING - SET EVERYTHING UP

const gameloop = () => {
  const human = humanPlayer();
  const computer = cpuPlayer();

  const humanGameboard = gameboardFactory();
  const cpuGameboard = gameboardFactory();

  DOM.onload(humanGameboard, cpuGameboard, human, computer);

  const cpuCells = document.querySelectorAll('.clickable-cell');
  const humanCells = Array.from(document.querySelectorAll('.human-cell'));

  cpuCells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      const coords = DOM.getCoords(e);
      human.makeMove(cpuGameboard, coords);
      DOM.updateCell(e.target, coords, cpuGameboard);
      const [x, y] = computer.makeMove(humanGameboard);
      humanCells.forEach((cell) => {
        console.log(typeof cell.dataset.x);
      });
      const target = humanCells.find(
        (cell) => cell.dataset.x === String(x) && cell.dataset.y === String(y)
      );
      console.log(x, y, target);
      DOM.updateCell(target, [x, y], humanGameboard);
    });
  });
};

gameloop();
