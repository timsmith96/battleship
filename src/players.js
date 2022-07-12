const humanPlayer = () => {
  const makeMove = (enemyGameboard, coordinatesArray) => {
    return enemyGameboard.recieveAttack(coordinatesArray, enemyGameboard);
  };

  return { makeMove };
};

const cpuPlayer = () => {
  const makeMove = (enemyGameboard, cpuPlayer, cpuGameboard) => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    if (enemyGameboard.isArrayInArray(enemyGameboard.missedAttacks, [x, y])) {
      return cpuPlayer.makeMove(enemyGameboard, cpuPlayer, cpuGameboard);
    }
    const result = enemyGameboard.recieveAttack(
      [x, y],
      cpuPlayer,
      cpuGameboard,
      enemyGameboard
    );
    return [[x, y], result];
  };
  return { makeMove };
};

export { humanPlayer, cpuPlayer };
