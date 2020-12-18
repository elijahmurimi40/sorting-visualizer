export const bubbleSort = (array: Array<number>) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      const valueA = array[j];
      const valueB = array[j + 1];
      const isValueAGreaterThanValueB = valueA > valueB;
      if (isValueAGreaterThanValueB) {
        const temp = valueA;
        array[j] = valueB;
        array[j + 1] = temp;
      }
    }
  }
  return array;
}