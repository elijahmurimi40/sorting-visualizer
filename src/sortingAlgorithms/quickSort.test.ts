import { quickSort } from './quickSort';
import generateRandomArray from './generateRandomArray';
import { Bar } from '../helperFunctions/ArrayBars';

for (let i = 0; i < 100; i += 1) {
  const array = generateRandomArray();
  const jsSortedArray = array.slice().sort((a: Bar, b: Bar) => a.value - b.value);
  jsSortedArray.map((bar: Bar) => {
    // eslint-disable-next-line no-param-reassign
    bar.idx = 0;
    return jsSortedArray;
  });

  const quickSortSortedArray = quickSort(array);
  quickSortSortedArray.map((bar: Bar) => {
    // eslint-disable-next-line no-param-reassign
    bar.idx = 0;
    return quickSortSortedArray;
  });

  test('Quick Sort Test', () => {
    expect(JSON.stringify(quickSortSortedArray)).toEqual(JSON.stringify(jsSortedArray));
  });
}
