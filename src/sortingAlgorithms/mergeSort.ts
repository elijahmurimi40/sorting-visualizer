/* eslint-disable no-await-in-loop */
import { MutableRefObject } from 'react';
import { ArrayBars } from '../helperFunctions/ArrayBars';
import { blue, red, turquoise } from '../helperFunctions/backgroundColors';
import { SortAnimations } from '../helperFunctions/SortAnimations';
import { startMergeSortTimer, timer, sortTimers } from './sortingTimers';

let arr: ArrayBars = [];
let originalArr: ArrayBars = [];

const merge = (
  a: ArrayBars,
  lowerBound: number,
  mid: number,
  upperBound: number,
  animations: SortAnimations[],
) => {
  const finalArr: ArrayBars = [];
  let i = lowerBound;
  let j = mid + 1;
  let k = lowerBound;

  while (i <= mid && j <= upperBound) {
    const anims: SortAnimations = { comparison: [], swap: [], put: [] };
    anims.comparison = [i, j];
    if (a[i].value <= a[j].value) {
      anims.swap = [i, j];
      anims.put = [i, k];
      finalArr[k] = a[i];
      i += 1;
    } else {
      anims.swap = [j, i];
      anims.put = [j, k];
      finalArr[k] = a[j];
      j += 1;
    }

    k += 1;
    animations.push(anims);
  }

  if (i > mid) {
    while (j <= upperBound) {
      animations.push({
        comparison: [j, j],
        swap: [j, upperBound],
        put: [j, k],
      });
      finalArr[k] = a[j];
      j += 1;
      k += 1;
    }
  } else {
    while (i <= mid) {
      animations.push({
        comparison: [i, i],
        swap: [i, mid],
        put: [i, k],
      });
      finalArr[k] = a[i];
      i += 1;
      k += 1;
    }
  }

  for (k = lowerBound; k <= upperBound; k += 1) {
    arr[k] = finalArr[k];
  }
};

const mergeSortHelper = (
  arry: ArrayBars,
  lowerBound: number,
  upperBound: number,
  animations: SortAnimations[],
) => {
  if (lowerBound < upperBound) {
    const mid = Math.floor((lowerBound + upperBound) / 2);
    mergeSortHelper(arry, lowerBound, mid, animations);
    mergeSortHelper(arry, mid + 1, upperBound, animations);
    merge(arry, lowerBound, mid, upperBound, animations);
  }
};

const animateMergeHelper = (auxiliaryArr: ArrayBars, swap: number[], put: number[]) => {
  const swapidx0 = swap[0];
  const swapidx1 = swap[1];
  const oArrPos = put[0];
  const auxArrPos = put[1];

  // eslint-disable-next-line no-param-reassign
  auxiliaryArr[auxArrPos] = originalArr[oArrPos];

  if (swapidx0 === swapidx1) {
    for (let i = 0; i < auxiliaryArr.length; i += 1) {
      originalArr[i] = auxiliaryArr[i];
    }
  }
};

export const animate = async (
  animations: ArrayBars | SortAnimations[],
  arrayBars: MutableRefObject<HTMLDivElement[]>,
  barValues: MutableRefObject<HTMLSpanElement[]>,
  sortingTimer: number,
  // eslint-disable-next-line no-unused-vars
  finishSortArrayHelper: (arry: ArrayBars) => void,
  // eslint-disable-next-line no-unused-vars
  hideShowValue: (value: number) => void,
) => {
  startMergeSortTimer();
  const anims = animations as SortAnimations[];
  const auxiliaryArr: ArrayBars = [];
  const isArrDivisibleBy2 = originalArr.length % 2 === 0;
  const middle = isArrDivisibleBy2 ? originalArr.length / 2 : (originalArr.length + 1) / 2;
  let isFinalMerge = false;
  for (let i = 0; i < anims.length; i += 1) {
    if (sortTimers.stopMergeSortTimer) break;
    const { comparison, swap, put } = anims[i];
    const arrayBarA = arrayBars.current[comparison[0]];
    const arrayBarB = arrayBars.current[comparison[1]];
    arrayBarA.style.backgroundColor = red;
    arrayBarB.style.backgroundColor = red;

    await timer(sortingTimer);
    if (sortTimers.stopMergeSortTimer) break;
    animateMergeHelper(auxiliaryArr, swap, put);

    const changedVal = auxiliaryArr[put[1]].value;
    const changeBar = arrayBars.current[put[1]];
    const barValue = barValues.current[put[1]];

    changeBar.style.backgroundColor = red;
    changeBar.style.height = `${changedVal}px`;
    barValue.textContent = hideShowValue(changedVal) as unknown as string;

    if (comparison[1] - comparison[0] === middle) isFinalMerge = true;

    if (isFinalMerge) {
      arrayBarA.style.backgroundColor = turquoise;
      arrayBarB.style.backgroundColor = blue;
      changeBar.style.backgroundColor = turquoise;
    } else {
      arrayBarA.style.backgroundColor = blue;
      arrayBarB.style.backgroundColor = blue;
      changeBar.style.backgroundColor = blue;
    }

    if (i === anims.length - 1) {
      finishSortArrayHelper(arr);
    }
  }
  return arr;
};

const mergeSort = (
  array: ArrayBars,
  sortingTimer: number | null = null,
) => {
  const animations: SortAnimations[] = [];
  arr = array;
  originalArr = [...array];
  mergeSortHelper(arr, 0, arr.length - 1, animations);

  if (sortingTimer === null) {
    return arr;
  }

  return animations;
};

export default mergeSort;
