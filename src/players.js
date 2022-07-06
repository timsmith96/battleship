const humanPlayer = () => {
  const makeMove = (enemyGameboard, coordinatesArray) => {
    return enemyGameboard.recieveAttack(coordinatesArray);
  };

  return { makeMove };
};

const cpuPlayer = () => {
  const makeMove = (enemyGameboard) => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const result = enemyGameboard.recieveAttack([x, y]);
    return [[x, y], result];
  };
  return { makeMove };
};

export { humanPlayer, cpuPlayer };
