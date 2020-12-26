import insertionSort from './insertionSort';
import generateRandomArray from './generateRandomArray';
import { Bar } from '../helperFunctions/ArrayBars';

for (let i = 0; i < 100; i += 1) {
  const array = generateRandomArray();
  const jsSortedArray = array.slice().sort((a: Bar, b: Bar) => a.value - b.value);
  const insertionSortSortedArray = insertionSort(array, null, null, null, () => { }, () => {});

  test('Insertion Sort Test', () => {
    insertionSortSortedArray.then((arr) => {
      expect(JSON.stringify(arr)).toEqual(JSON.stringify(jsSortedArray));
    })
      .catch((err) => { console.log(err); });
  });
}
