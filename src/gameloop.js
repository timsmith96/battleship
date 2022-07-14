import { gameboardFactory } from './gameboardFactory';
import { cpuPlayer, humanPlayer } from './players';
import { DOM } from './DOM';

const gameloop = () => {
  const human = humanPlayer();
  const computer = cpuPlayer();

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

  const humanGameboard = gameboardFactory();
  const cpuGameboard = gameboardFactory();

  DOM.onload(humanGameboard, cpuGameboard, human, computer);

  const cpuCells = document.querySelectorAll('.clickable-cell');
  const humanCells = Array.from(document.querySelectorAll('.human-cell'));

  humanCells.forEach((cell) => {
    cell.addEventListener('mouseenter', (e) => {
      const [x, y] = DOM.getCoords(e);
      let startingCell = DOM.convertCoordsToCells([x, y], 1);
      let cellsToColor = DOM.convertCoordsToCells(
        [x, y],
        humanGameboard.getShipLength()
      );
      if (DOM.isValidShipHover(cellsToColor, [x, y], humanCells)) {
        humanCells.forEach((cell) => cell.classList.remove('invalid-hover'));
        humanCells.forEach((cell) => cell.classList.add('valid-hover'));
        const img = document.createElement('img');
        const axis = DOM.getAxis();
        if (axis) {
          img.src = shipIconsX[shipIconsX.length - 1];
          img.id = shipIconsX[shipIconsX.length - 1];
        } else {
          img.src = shipIconsY[shipIconsY.length - 1];
          img.id = shipIconsY[shipIconsY.length - 1];
        }
        humanCells[startingCell].appendChild(img);
        humanCells[startingCell].style.backgroundColor = '#2563eb';
        for (let i = 1; i < cellsToColor.length; i++) {
          humanCells[cellsToColor[i]].style.backgroundColor = 'transparent';
        }
      } else {
        humanCells.forEach((cell) => cell.classList.remove('valid-hover'));
        humanCells.forEach((cell) => cell.classList.add('invalid-hover'));
      }
    });

    cell.addEventListener('mouseleave', (e) => {
      if (cell.classList.contains('no-remove')) {
        return;
      } else {
        cell.innerHTML = '';
        cell.style.backgroundColor = '#0284c7';
        humanCells.forEach((cell) => {
          if (!cell.classList.contains('no-remove')) {
            cell.style.backgroundColor = '#334155';
          }
        });
      }
    });

    cell.addEventListener('click', (e) => {
      const axis = DOM.getAxis();
      const x = e.currentTarget.dataset.x;
      const y = e.currentTarget.dataset.y;
      const coords = [x, y];
      let cellsToColor = DOM.convertCoordsToCells(
        coords,
        humanGameboard.getShipLength()
      );
      let startingCell = DOM.convertCoordsToCells([x, y], 1);
      if (
        !humanGameboard.allShipsPlaced() &&
        DOM.isValidShipHover(cellsToColor, coords, humanCells)
      ) {
        const currentShipLength = humanGameboard.getShipLength();
        let cellsToColor = DOM.convertCoordsToCells(coords, currentShipLength);
        DOM.addClass(cellsToColor, humanCells, 'ship-cell');
        if (axis) {
          const img = document.getElementById(
            shipIconsX[shipIconsX.length - 1]
          );
          img.src = shipIconsX[shipIconsX.length - 1];
        } else {
          const img = document.getElementById(
            shipIconsY[shipIconsY.length - 1]
          );
          img.src = shipIconsY[shipIconsY.length - 1];
        }
        for (let i = 1; i < cellsToColor.length; i++) {
          humanCells[cellsToColor[i]].style.backgroundColor = 'transparent';
          humanCells[cellsToColor[i]].classList.add('no-remove');
        }
        humanCells[startingCell].classList.add('no-remove');
        humanGameboard.placeShip(currentShipLength, coords);
        humanGameboard.removeShip();
        shipIconsX.pop();
        shipIconsY.pop();
        let shipType = humanGameboard.getShipType();
        DOM.editText('instruction', `Please place your ${shipType}...`);
      }
      if (humanGameboard.allShipsPlaced()) {
        DOM.editText(
          'instruction',
          'All ships placed - game on! Take your shot...'
        );
        DOM.hideElement('change-axis');
        humanCells.forEach((cell) => (cell.style.pointerEvents = 'none'));
        cpuCells.forEach((cell) => (cell.style.pointerEvents = 'auto'));
      }
    });
  });

  cpuCells.forEach((cell) => {
    cell.style.pointerEvents = 'none';
    cell.addEventListener('click', (e) => {
      console.log(cpuGameboard);
      if (humanGameboard.allShipsPlaced()) {
        cpuCells.forEach((cell) => (cell.style.pointerEvents = 'none'));
        DOM.hideElement('instruction');
        let x = e.currentTarget.dataset.x;
        let y = e.currentTarget.dataset.y;
        const coords = [x, y];
        let attackResult = human.makeMove(cpuGameboard, coords);
        setTimeout(() => {
          // DOM.updateCell(e.target, coords, cpuGameboard);
          if (attackResult === 'SHIP HIT!') {
            if (e.target.nodeName === 'IMG') {
              e.target.parentNode.classList.add('hit');
            }
            e.target.classList.add('hit');
          } else if (attackResult === 'MISS!') {
            e.target.classList.add('miss');
          } else if (attackResult === 'SHIP SUNK!') {
            console.log('ship sunk');
            e.target.classList.add('hit');
          }
        }, 1000);
        DOM.updateNarration('human-narration', attackResult, 'cpu-narration');
        setTimeout(() => {
          const arr = computer.makeMove(humanGameboard, computer, cpuGameboard);
          const [x, y] = arr[0];
          attackResult = arr[1];
          const target = humanCells.find(
            (cell) =>
              cell.dataset.x === String(x) && cell.dataset.y === String(y)
          );
          DOM.updateNarration('cpu-narration', attackResult, 'human-narration');
          setTimeout(() => {
            console.log(attackResult);
            // DOM.updateCell(target, [x, y], humanGameboard);
            if (attackResult === 'SHIP HIT!') {
              target.classList.add('hit');
              // target.firstChild.classList.add('hit');
            } else if (attackResult === 'MISS!') {
              target.classList.add('miss');
            } else if (attackResult === 'SHIP SUNK!') {
              console.log('ship sunk');
              target.classList.add('hit');
            }
          }, 1000);
          setTimeout(() => {
            DOM.editText('cpu-narration', 'take your shot...');
            DOM.hideElement('result-of-attack');
            cpuCells.forEach((cell) => {
              if (
                !(
                  cell.classList.contains('hit') ||
                  cell.classList.contains('miss')
                )
              ) {
                cell.style.pointerEvents = 'auto';
              }
            });
          }, 3000);
        }, '2500');
        if (cpuGameboard.allShipsSunk()) {
          const text = document.querySelector('.text-container');
          text.innerHTML = `<h4>CONGRATULATIONS! You sunk all the enemies ships!</h4>`;
        } else if (humanGameboard.allShipsSunk()) {
          const text = document.querySelector('.text-container');
          text.innerHTML = `<h4>OH DEAR! The enemy sunk all your ships!</h4>`;
        }
      } else {
        return;
      }
    });
  });

  for (let i = 0; i < 5; i++) {
    cpuGameboard.placeCpuShips(cpuCells);
  }
};

gameloop();
