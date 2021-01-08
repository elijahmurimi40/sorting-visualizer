import mergeSort from './mergeSort';
import generateRandomArray from './generateRandomArray';
import { Bar } from '../helperFunctions/ArrayBars';

for (let i = 0; i < 100; i += 1) {
  const array = generateRandomArray();
  const jsSortedArray = array.slice().sort((a: Bar, b: Bar) => a.value - b.value);
  const mergeSortSortedArray = mergeSort(array, null);

  test('Merge Sort Test', () => {
    expect(JSON.stringify(mergeSortSortedArray)).toEqual(JSON.stringify(jsSortedArray));
  });
}
