/* eslint-disable no-await-in-loop */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
import { MutableRefObject } from 'react';
import { ArrayBars } from '../helperFunctions/ArrayBars';
import { red, turquoise } from '../helperFunctions/backgroundColors';
import { startInsertionSortTimer, sortTimers, timer } from './sortingTimers';

let arr: ArrayBars = [];

const insert = (j: number) => {
  arr[j + 1] = arr[j];
};

const insertionSort = async (
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
  startInsertionSortTimer();
  insertionSortParentLoop:
  for (let i = 1; i < arr.length; i += 1) {
    const current = arr[i];
    const currentVal = current.value;
    let j = i - 1;
    while (j >= 0) {
      if (sortTimers.stopInsertionSortTimer) break insertionSortParentLoop;
      const valJ = arr[j].value;
      const isValJGreaterThanCurrent = valJ > currentVal;
      const isSortingTimerNull = sortingTimer === null;

      if (!isValJGreaterThanCurrent) break;
      if (isValJGreaterThanCurrent && isSortingTimerNull) {
        insert(j);
      } else if (!isSortingTimerNull) {
        const arrayBari = arrayBars!!.current[i];
        const arrayBarj = arrayBars!!.current[j];
        arrayBari.style.backgroundColor = red;
        await timer(sortingTimer!! / 2);

        if (!sortTimers.stopInsertionSortTimer) {
          arrayBarj.style.backgroundColor = red;
          await timer(sortingTimer!! / 2);
        }

        if (isValJGreaterThanCurrent && !sortTimers.stopInsertionSortTimer) {
          arrayBarj.style.backgroundColor = turquoise;
          insert(j);
        }

        // await timer(500);
        //
      }
      j -= 1;
    }

    if (sortTimers.stopInsertionSortTimer) break;
    arr[j + 1] = current;
    if (sortingTimer !== null) {
      for (let k = 0; k <= i; k += 1) {
        const ab = arrayBars!!.current[k];
        const bv = barValues!!.current[k];
        ab.style.backgroundColor = turquoise;
        ab.style.height = `${arr[k].value}px`;
        bv.textContent = hideShowValue(arr[k].value) as unknown as string;
      }
    }

    if (i === arr.length - 1 && sortingTimer !== null) { finishSortArrayHelper(arr); }
  }
  return arr;
};

export default insertionSort;
