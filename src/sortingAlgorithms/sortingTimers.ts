export const sortTimers = {
  stopBubbleSortTimer: false,
  stopInsertionSortTimer: false,
  stopMergeSortTimer: false,
  stopQuickSortTimer: false,
  stopSelectionSortTimer: false,
  stopShellSortTimer: false,
};

export const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const startBubbleSortTimer = () => { sortTimers.stopBubbleSortTimer = false; };
export const startInsertionSortTimer = () => { sortTimers.stopInsertionSortTimer = false; };
export const startMergeSortTimer = () => { sortTimers.stopMergeSortTimer = false; };
export const startQuickSortTimer = () => { sortTimers.stopQuickSortTimer = false; };
export const startSelectionSortTimer = () => { sortTimers.stopSelectionSortTimer = false; };
export const startShellSortTimer = () => { sortTimers.stopShellSortTimer = false; };

export const stopSortTimers = () => {
  sortTimers.stopBubbleSortTimer = true;
  sortTimers.stopInsertionSortTimer = true;
  sortTimers.stopMergeSortTimer = true;
  sortTimers.stopQuickSortTimer = true;
  sortTimers.stopSelectionSortTimer = true;
  sortTimers.stopShellSortTimer = true;
};
