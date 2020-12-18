export const generateRandomArray = () => {
  const array: Array<number> = [];
  const size = randomIntFromInterval(1, 1000);

  for (let i = 0; i < size; i++) {
    array.push(randomIntFromInterval(-1000, 1000));
  }

  return array;
}

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}