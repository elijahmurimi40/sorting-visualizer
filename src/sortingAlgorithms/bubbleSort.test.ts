import bubbleSort from './bubbleSort';
import generateRandomArray from './generateRandomArray';
import { Bar } from '../helperFunctions/ArrayBars';

for (let i = 0; i < 100; i += 1) {
  const array = generateRandomArray();
  const jsSortedArray = array.slice().sort((a: Bar, b: Bar) => a.value - b.value);
  const bubbleSortSortedArray = bubbleSort(
    array,
    null,
    null,
    null,
    () => { },
    () => { },
  );

  test('Bubble Sort Test', () => {
    bubbleSortSortedArray.then((arr) => {
      expect(JSON.stringify(arr)).toEqual(JSON.stringify(jsSortedArray));
    });
  });
  // test('Bubble Sort Test', () => {
  // expect(bubbleSortSortedArray).toEqual(jsSortedArray);
  // expect(JSON.stringify(bubbleSortSortedArray)).toEqual(JSON.stringify(jsSortedArray));
  // });
}
