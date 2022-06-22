import { gameboardFactory } from '../src/gameboardFactory';
import { humanPlayer, cpuPlayer } from './players';

test('player can attack enemy gameboard', () => {
  const enemyGameboard = gameboardFactory();
  const player1 = humanPlayer();
  player1.makeMove(enemyGameboard, [2, 3]);
  expect(enemyGameboard.gameboard).toEqual([
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', 'hit', '', '', '', '', '', '', ''],
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
    ['', '', '', '', '', '', 'hit', expect.anything(), expect.anything(), ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);
});

test('computer can attack enemy gameboard', () => {
  const enemyGameboard = gameboardFactory();
  const computerPlayer = cpuPlayer();
  computerPlayer.makeMove(enemyGameboard);
  expect(enemyGameboard.gameboard).toEqual([
    ['', '', '', '', '', '', '', 'hit', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);
});
