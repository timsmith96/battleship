import { gameboardFactory } from '../src/gameboardFactory.js';
import { humanPlayer, cpuPlayer } from '../src/players.js';

test('player can attack enemy gameboard', () => {
  const enemyGameboard = gameboardFactory();
  const player1 = humanPlayer();
  player1.makeMove(enemyGameboard, [2, 3]);
  expect(enemyGameboard.gameboard).toEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', 'X', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);
});

test('player can attack enemy gameboard nad hit a ship', () => {
  const enemyGameboard = gameboardFactory();
  const player1 = humanPlayer();
  enemyGameboard.placeShip(3, [6, 7]);
  player1.makeMove(enemyGameboard, [6, 7]);
  expect(enemyGameboard.gameboard).toEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    [
      '',
      '',
      '',
      '',
      '',
      '',
      'hit a ship',
      expect.anything(),
      expect.anything(),
      '',
    ],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);
});

// test('computer can attack enemy gameboard', () => {
//   const enemyGameboard = gameboardFactory();
//   const computerPlayer = cpuPlayer();
//   computerPlayer.makeMove(enemyGameboard);
//   expect(enemyGameboard.gameboard).toEqual([
//     ['', '', '', '', '', '', '', 'hit', '', ''],
//     ['', '', '', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', '', '', ''],
//     ['', '', '', '', '', '', '', '', '', ''],
//   ]);
// });
