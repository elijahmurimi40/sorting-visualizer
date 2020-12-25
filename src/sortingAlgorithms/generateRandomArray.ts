const randomNumber = (min: number, max: number) => Math.random() * (max - min + 1) + min;
const randomIntFromInterval = (min: number, max: number) => Math.floor(randomNumber(min, max));

const generateRandomArray = () => {
  const array = [];
  const size = randomIntFromInterval(1, 1000);

  for (let i = 0; i < size; i += 1) {
    array.push({
      value: randomIntFromInterval(-1000, 1000),
      state: 'default',
      idx: i,
    });
    array.push();
  }

  return array;
};

export default generateRandomArray;
