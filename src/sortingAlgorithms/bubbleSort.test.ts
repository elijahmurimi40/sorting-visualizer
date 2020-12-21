import bubbleSort from './bubbleSort';
import generateRandomArray from './generateRandomArray';

for (let i = 0; i < 100; i += 1) {
  const array = generateRandomArray();
  const jsSortedArray = array.slice().sort((a, b) => a - b);
  const bubbleSortSortedArray = bubbleSort(array);

  test('Bubble Sort Test', () => {
    expect(bubbleSortSortedArray).toEqual(jsSortedArray);
  });
}
