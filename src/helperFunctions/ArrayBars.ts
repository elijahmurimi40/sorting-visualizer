export interface Bar {
  value: number;
  state: string;
  idx: number;
}

export interface ArrayBars extends Array<Bar> {}
