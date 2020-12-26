export const sortTimers = {
  stopBubbleSortTimer: false,
  stopInsertionSortTimer: false,
};

export const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const startBubbleSortTimer = () => { sortTimers.stopBubbleSortTimer = false; };
export const startInsertionSortTimer = () => { sortTimers.stopInsertionSortTimer = false; };

export const stopSortTimers = () => {
  sortTimers.stopBubbleSortTimer = true;
  sortTimers.stopInsertionSortTimer = true;
};
