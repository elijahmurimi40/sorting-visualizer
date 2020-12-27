/* eslint-disable no-await-in-loop */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
import { MutableRefObject } from 'react';
import { ArrayBars } from '../helperFunctions/ArrayBars';
import { startSelectionSortTimer, sortTimers, timer } from './sortingTimers';
import { red, blue, turquoise } from '../helperFunctions/backgroundColors';

let arr: ArrayBars = [];

const swap = (posA: number, posB: number) => {
  const temp = arr[posA];
  arr[posA] = arr[posB];
  arr[posB] = temp;
};

const selectionSort = async (
  array: ArrayBars,
  arrayBars: MutableRefObject<HTMLDivElement[]> | null,
  barValues: MutableRefObject<HTMLSpanElement[]> | null,
  sortingTimer: number | null,
  // eslint-disable-next-line no-unused-vars
  finishSortArrayHelper: (arry: ArrayBars) => void,
  // eslint-disable-next-line no-unused-vars
  hideShowValue: (value: number) => void,
) => {
  arr = array;
  startSelectionSortTimer();
  selectionSortParentLoop:
  for (let i = 0; i < arr.length; i += 1) {
    let minPos = i;
    for (let j = i + 1; j < arr.length; j += 1) {
      if (sortTimers.stopSelectionSortTimer) break selectionSortParentLoop;
      const isValJLessThanMinVal = arr[j].value < arr[minPos].value;
      const isSortingTimerNull = sortingTimer === null;

      if (isValJLessThanMinVal && isSortingTimerNull) {
        minPos = j;
      } else if (!isSortingTimerNull) {
        const arrayBarA = arrayBars!!.current[minPos];
        const arrayBarB = arrayBars!!.current[j];
        arrayBarA.style.backgroundColor = red;
        arrayBarB.style.backgroundColor = red;
        await timer(sortingTimer!! / 2);

        if (isValJLessThanMinVal && !sortTimers.stopSelectionSortTimer) {
          arrayBarA.style.backgroundColor = blue;
          arrayBarB.style.backgroundColor = red;
          minPos = j;
          await timer(sortingTimer!! / 2);
        } else if (!sortTimers.stopSelectionSortTimer) {
          arrayBarA.style.backgroundColor = red;
          arrayBarB.style.backgroundColor = blue;
          await timer(sortingTimer!! / 2);
        }
      }
    }

    if (minPos !== i && sortingTimer === null) swap(i, minPos);

    if (minPos !== i && !sortTimers.stopSelectionSortTimer && sortingTimer !== null) {
      const abA = arrayBars!!.current[i];
      const abB = arrayBars!!.current[minPos];
      const bvA = barValues!!.current[i];
      const bvB = barValues!!.current[minPos];

      abA.style.height = `${arr[minPos].value}px`;
      abB.style.height = `${arr[i].value}px`;
      abA.style.backgroundColor = turquoise;
      abB.style.backgroundColor = blue;
      bvA.textContent = hideShowValue(arr[minPos].value) as unknown as string;
      bvB.textContent = hideShowValue(arr[i].value) as unknown as string;
      swap(i, minPos);
    } else if (!sortTimers.stopSelectionSortTimer && sortingTimer !== null) {
      const abA = arrayBars!!.current[i];
      abA.style.backgroundColor = turquoise;
    }

    if (i === arr.length - 1 && sortingTimer !== null) { finishSortArrayHelper(arr); }
  }
  return arr;
};

export default selectionSort;
