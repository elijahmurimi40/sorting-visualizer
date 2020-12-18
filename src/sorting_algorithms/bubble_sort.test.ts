import { bubbleSort } from './bubble_sort';
import { generateRandomArray } from './generate_random_array';

for (let i = 0; i < 100; i++) {
  const array = generateRandomArray();
  const jsSortedArray = array.slice().sort((a, b) => a - b);
  const _bubbleSort = bubbleSort(array);

  test('Bubble Sort Test', () => {
    expect(_bubbleSort).toEqual(jsSortedArray);
  })
}