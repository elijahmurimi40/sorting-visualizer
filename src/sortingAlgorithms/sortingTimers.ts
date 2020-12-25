export const sortTimers = {
  stopBubbleSortTimer: false,
};

export const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const startBubbleSortTimer = () => { sortTimers.stopBubbleSortTimer = false; };

export const stopSortTimers = () => { sortTimers.stopBubbleSortTimer = true; };
