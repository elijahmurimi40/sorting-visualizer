import shellSort from './shellSort';
import generateRandomArray from './generateRandomArray';
import { Bar } from '../helperFunctions/ArrayBars';

for (let i = 0; i < 100; i += 1) {
  const array = generateRandomArray();
  const jsSortedArray = array.slice().sort((a: Bar, b: Bar) => a.value - b.value);
  const shellSortSortedArray = shellSort(array, null, null, null, () => { }, () => { });

  test('Shell Sort Test', () => {
    shellSortSortedArray.then((arr) => {
      // changing all Bar idx to 0 since we only worry about the value eeeey
      arr.map((val: Bar) => {
        // eslint-disable-next-line no-param-reassign
        val.idx = 0;
        return arr;
      });
      expect(JSON.stringify(arr)).toEqual(JSON.stringify(jsSortedArray));
    })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  });
}
