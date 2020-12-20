import { MutableRefObject } from 'react';

let arr: number[] = [];

const swap = (positionA: number, positionB: number) => {
  const temp = arr[positionA];
  arr[positionA] = arr[positionB];
  arr[positionB] = temp;
};

const bubbleSort = (
  array: Array<number>,
  barValues: MutableRefObject<HTMLSpanElement[]> | null = null,
) => {
  arr = array;
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length - i - 1; j += 1) {
      const valueA = arr[j];
      const valueB = arr[j + 1];
      const isValueAGreaterThanValueB = valueA > valueB;
      const isBarValuesNull = barValues === null;

      if (isValueAGreaterThanValueB && isBarValuesNull) {
        swap(j, j + 1);
      } else if (!isBarValuesNull) {
        swap(j, j + 1);
      }
    }
  }
  return arr;
};

export default bubbleSort;
