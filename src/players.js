const humanPlayer = () => {
  const makeMove = (enemyGameboard, coordinatesArray) => {
    enemyGameboard.recieveAttack(coordinatesArray);
  };

  return { makeMove };
};

const cpuPlayer = () => {
  const makeMove = (enemyGameboard) => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    enemyGameboard.recieveAttack([x, y]);
    return [x, y];
  };
  return { makeMove };
};

export { humanPlayer, cpuPlayer };
