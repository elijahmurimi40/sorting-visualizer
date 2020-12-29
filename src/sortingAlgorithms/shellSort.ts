/* eslint-disable no-await-in-loop */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
import { MutableRefObject } from 'react';
import { ArrayBars } from '../helperFunctions/ArrayBars';
import { startShellSortTimer, sortTimers, timer } from './sortingTimers';
import { blue, red, turquoise } from '../helperFunctions/backgroundColors';

let arr: ArrayBars = [];

const swap = (posA: number, posB: number) => {
  const temp = arr[posA];
  arr[posA] = arr[posB];
  arr[posB] = temp;
};

const shellSort = async (
  array: ArrayBars,
  arrayBars: MutableRefObject<HTMLDivElement[]> | null,
  barValues: MutableRefObject<HTMLSpanElement[]> | null,
  sortingTimer: number | null = null,
  // eslint-disable-next-line no-unused-vars
  finishSortArrayHelper: (arry: ArrayBars) => void,
  // eslint-disable-next-line no-unused-vars
  hideShowValue: (value: number) => void,
) => {
  arr = array;
  const n = arr.length;
  startShellSortTimer();

  shellSortParentLoop:
  for (let gap = Math.floor(n / 2); gap >= 1; gap = Math.floor(gap / 2)) {
    for (let j = gap; j < n; j += 1) {
      for (let i = j - gap; i >= 0; i -= gap) {
        if (sortTimers.stopShellSortTimer) break shellSortParentLoop;
        const isSortingTimerNull = sortingTimer === null;
        const arrayBarA = arrayBars?.current[i];
        const arrayBarB = arrayBars?.current[i + gap];

        if (!isSortingTimerNull) {
          arrayBarA!!.style.backgroundColor = red;
          arrayBarB!!.style.backgroundColor = red;
          await timer(sortingTimer!! / 2);
        }

        if (sortTimers.stopShellSortTimer) break shellSortParentLoop;

        if (arr[i].value < arr[i + gap].value) {
          if (gap === 1 && !isSortingTimerNull) {
            arrayBarA!!.style.backgroundColor = turquoise;
            arrayBarB!!.style.backgroundColor = turquoise;
          } else if (!isSortingTimerNull) {
            arrayBarA!!.style.backgroundColor = blue;
            arrayBarB!!.style.backgroundColor = blue;
          }
          break;
        } else if (arr[i].value > arr[i + gap].value && isSortingTimerNull) {
          swap(i, i + gap);
        } else if (arr[i].value > arr[i + gap].value && !isSortingTimerNull) {
          await timer(sortingTimer!! / 2);
          if (sortTimers.stopShellSortTimer) break shellSortParentLoop;
          const barValueA = barValues!!.current[i];
          const barValueB = barValues!!.current[i + gap];

          arrayBarA!!.style.height = `${arr[i + gap].value}px`;
          arrayBarB!!.style.height = `${arr[i].value}px`;
          if (gap === 1) {
            arrayBarA!!.style.backgroundColor = turquoise;
            arrayBarB!!.style.backgroundColor = turquoise;
          } else {
            arrayBarA!!.style.backgroundColor = blue;
            arrayBarB!!.style.backgroundColor = blue;
          }
          barValueA.textContent = hideShowValue(arr[i + gap].value) as unknown as string;
          barValueB.textContent = hideShowValue(arr[i].value) as unknown as string;
          swap(i, i + gap);
        } else if (!isSortingTimerNull) {
          if (gap === 1) {
            arrayBarA!!.style.backgroundColor = turquoise;
            arrayBarB!!.style.backgroundColor = turquoise;
          } else {
            arrayBarA!!.style.backgroundColor = blue;
            arrayBarB!!.style.backgroundColor = blue;
          }
        }
      }
    }
    if (gap === 1 && sortingTimer !== null) finishSortArrayHelper(arr);
  }

  return arr;
};

export default shellSort;
