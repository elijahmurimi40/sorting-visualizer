/* eslint-disable no-await-in-loop */
import { MutableRefObject } from 'react';
import { ArrayBars } from '../helperFunctions/ArrayBars';
import { red, blue, turquoise } from '../helperFunctions/backgroundColors';
import { SortAnimations } from '../helperFunctions/SortAnimations';
import { startQuickSortTimer, timer, sortTimers } from './sortingTimers';

let arr: ArrayBars = [];
let originalArr: ArrayBars = [];

const swapValues = (arry: ArrayBars, posA: number, posB: number) => {
  const temp = arry[posA];
  // eslint-disable-next-line no-param-reassign
  arry[posA] = arry[posB];
  // eslint-disable-next-line no-param-reassign
  arry[posB] = temp;
};

const comparisonAnims = (
  animations: SortAnimations[],
  lowerBound: number,
  startOrEnd: number,
  swap: number = -1,
) => {
  animations.push({
    comparison: [lowerBound, startOrEnd, swap], swap: [], put: [],
  });
};

const swapAnims = (
  animations: SortAnimations[],
  startOrLowerBound: number,
  end: number,
  lowerBound: number = -1,
  finalSwap: number = -1,
) => {
  animations.push({
    comparison: [startOrLowerBound, end, lowerBound],
    swap: [startOrLowerBound, end, finalSwap],
    put: [],
  });
};

const partitiion = (
  arry: ArrayBars,
  lowerBound: number,
  upperBound: number,
  animations: SortAnimations[],
) => {
  const pivot = arry[lowerBound].value;
  let start = lowerBound;
  let end = upperBound;
  while (start < end) {
    while (start < arry.length - 1 && arry[start].value <= pivot) {
      comparisonAnims(animations, lowerBound, start, end);
      start += 1;
    }
    comparisonAnims(animations, lowerBound, start, start);

    while (arry[end].value > pivot) {
      comparisonAnims(animations, lowerBound, end);
      end -= 1;
    }
    comparisonAnims(animations, lowerBound, end);

    if (start < end) {
      swapAnims(animations, start, end, lowerBound);
      swapValues(arr, start, end);
    }
  }

  swapAnims(animations, lowerBound, end, -1, -8);
  swapValues(arr, lowerBound, end);
  return end;
};

const quickSortHelper = (
  arry: ArrayBars,
  lowerBound: number,
  upperBound: number,
  animations: SortAnimations[],
) => {
  if (lowerBound < upperBound) {
    const end = partitiion(arry, lowerBound, upperBound, animations);
    quickSortHelper(arry, lowerBound, end - 1, animations);
    quickSortHelper(arry, end + 1, upperBound, animations);
  }
};

const quickSort = (
  array: ArrayBars,
  sortingTimer: number | null = null,
) => {
  const animations: SortAnimations[] = [];
  arr = array;
  originalArr = [...array];
  quickSortHelper(arr, 0, arr.length - 1, animations);

  if (sortingTimer === null) {
    return arr;
  }

  return animations;
};

const animateQuickSort = async (
  animations: ArrayBars | SortAnimations[],
  arrayBars: MutableRefObject<HTMLDivElement[]>,
  barValues: MutableRefObject<HTMLSpanElement[]>,
  sortingTimer: number,
  // eslint-disable-next-line no-unused-vars
  finishSortArrayHelper: (arry: ArrayBars) => void,
  // eslint-disable-next-line no-unused-vars
  hideShowValue: (value: number) => void,
) => {
  startQuickSortTimer();
  const anims = animations as SortAnimations[];
  let arrayBarCPosH = 0;
  for (let i = 0; i < anims.length; i += 1) {
    if (sortTimers.stopQuickSortTimer) break;
    const { comparison, swap } = anims[i];
    const arrayBarA = arrayBars.current[comparison[0]];
    const arrayBarB = arrayBars.current[comparison[1]];
    arrayBarA.style.backgroundColor = red;
    arrayBarB.style.backgroundColor = red;

    const arrayBarCPos: number | null = comparison[2] === -1 ? null : comparison[2];
    if (arrayBarCPos !== null) {
      arrayBarCPosH = arrayBarCPos;
      const arrayBarC = arrayBars.current[arrayBarCPos];
      arrayBarC.style.backgroundColor = red;
    }

    if (arrayBarCPosH !== 0) {
      const arrayBarC = arrayBars.current[arrayBarCPosH];
      arrayBarC.style.backgroundColor = red;
    }

    await timer(sortingTimer);
    if (sortTimers.stopQuickSortTimer) break;
    if (swap.length !== 0) {
      swapValues(originalArr, swap[0], swap[1]);
      const arrayBarAa = arrayBars.current[comparison[0]];
      const arrayBarBb = arrayBars.current[comparison[1]];
      const barValueAa = barValues.current[comparison[0]];
      const barValueBb = barValues.current[comparison[1]];

      arrayBarAa.style.height = `${originalArr[swap[0]].value}px`;
      arrayBarBb.style.height = `${originalArr[swap[1]].value}px`;
      barValueAa.textContent = hideShowValue(originalArr[swap[0]].value) as unknown as string;
      barValueBb.textContent = hideShowValue(originalArr[swap[1]].value) as unknown as string;

      const arrayBarC = arrayBars.current[arrayBarCPosH];
      arrayBarC.style.backgroundColor = blue;
    }

    arrayBarA.style.backgroundColor = blue;
    arrayBarB.style.backgroundColor = blue;

    if (i === anims.length - 1) {
      finishSortArrayHelper(arr);
      return arr;
    }

    if (swap[2] === -8) {
      const arrayBar = arrayBars.current[swap[1]];
      arrayBar.style.backgroundColor = turquoise;
    }
    /**
     * passing -8 when the pivot element is swapped to its position
     * and -1 as lower bound and adding them together results to -9
     * when this happens check the next anims i.e `anims[i + 1].comparison[0]`
     * the value there is the number of items solved on the left side
     */
    const swapPos = swap.length !== 0 ? swap[2] : 0;
    const comparisonPos = comparison[2];
    const sum = swapPos + comparisonPos;
    if (9 + sum === 0) {
      const animsH = i + 1 <= anims.length ? i + 1 : -1;
      if (animsH === -1) return arr;
      const comparisonH = anims[animsH].comparison;
      for (let j = 0; j < comparisonH[0]; j += 1) {
        const arrayBar = arrayBars.current[j];
        arrayBar.style.backgroundColor = turquoise;
      }
    }
  }
  return arr;
};

export { quickSort, animateQuickSort };
