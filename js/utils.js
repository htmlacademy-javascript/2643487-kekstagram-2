const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];
const generateUniqueId = () => {
  let lastId = 0;
  return () => ++lastId;
};

export { generateUniqueId, getRandomArrayItem, getRandomInteger };
