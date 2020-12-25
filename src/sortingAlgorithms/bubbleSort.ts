/* eslint-disable no-restricted-syntax */
/* eslint-disable no-labels */
/* eslint-disable no-await-in-loop */
import { MutableRefObject } from 'react';
import { startBubbleSortTimer, timer, sortTimers } from './sortingTimers';
import { ArrayBars } from '../helperFunctions/ArrayBars';
import { blue, red, turquoise } from '../helperFunctions/backgroundColors';

let arr: ArrayBars = [];

const swap = (positionA: number, positionB: number) => {
  const temp = arr[positionA];
  arr[positionA] = arr[positionB];
  arr[positionB] = temp;
};

/**
 *
 * change from async function
 * use set timeout
 *
 */
const bubbleSort = async (
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
  startBubbleSortTimer();
  bubbleSortParentLoop:
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length - i - 1; j += 1) {
      const valueA = arr[j].value;
      const valueB = arr[j + 1].value;
      const isValueAGreaterThanValueB = valueA > valueB;
      const isSortingTimerNull = sortingTimer === null;

      if (isValueAGreaterThanValueB && isSortingTimerNull) {
        swap(j, j + 1);
      } else if (!isSortingTimerNull) {
        if (sortTimers.stopBubbleSortTimer) break bubbleSortParentLoop;
        const arrayBarA = arrayBars!!.current[j];
        const arrayBarB = arrayBars!!.current[j + 1];
        const barValueA = barValues!!.current[j];
        const barValueB = barValues!!.current[j + 1];

        arrayBarA.style.backgroundColor = red;
        arrayBarB.style.backgroundColor = red;
        await timer(sortingTimer!! / 2);

        if (isValueAGreaterThanValueB && !sortTimers.stopBubbleSortTimer) {
          arrayBarA.style.height = `${arr[j + 1].value}px`;
          arrayBarB.style.height = `${arr[j].value}px`;
          barValueA.textContent = hideShowValue(arr[j + 1].value) as unknown as string;
          barValueB.textContent = hideShowValue(arr[j].value) as unknown as string;
          swap(j, j + 1);
        }

        arrayBarA.style.backgroundColor = blue;
        // setting the next array bar color to red
        if (j < arr.length - i - 2 && !sortTimers.stopBubbleSortTimer) {
          const arrayBar = arrayBars!!.current[j + 2];
          arrayBar.style.backgroundColor = red;
        }

        // chaging color of the already solved array bars
        if (j === arr.length - i - 2 && !sortTimers.stopBubbleSortTimer) {
          const arrayBar = arrayBars!!.current[j + 1];
          arrayBar.style.backgroundColor = turquoise;
        }

        // soritng is done turing the smallest array bar color
        if (i === arr.length - 2 && !sortTimers.stopBubbleSortTimer) {
          const arrayBar = arrayBars!!.current[j];
          arrayBar.style.backgroundColor = turquoise;
        }
        await timer(sortingTimer!! / 2);
      }
    }
    if (i === arr.length - 1) {
      finishSortArrayHelper(arr);
    }
  }
  return arr;
};

export default bubbleSort;
