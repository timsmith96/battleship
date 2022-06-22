const shipFactory = (length, id) => {
  const hitArray = [];
  const hit = (num) => {
    hitArray.push(num);
  };
  const isSunk = () => hitArray.length === length;
  return { length, hitArray, hit, isSunk, id };
};

export { shipFactory };
