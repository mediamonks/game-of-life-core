export type TStats = {
  [key: string]: {
    frames: Array<number>;
    total: number;
    min: number;
    max: number;
    average: number;
  };
};

export default class Stats {
  private stats: TStats = {};

  private time: number = 0;

  constructor(labels: Array<string>) {
    labels.forEach(label => {
      this.stats[label] = {
        frames: [],
        total: 0,
        min: Number.MAX_VALUE,
        max: 0,
        average: 0,
      };
    });
  }

  public startMeasure(): void {
    this.time = performance.now();
  }

  public measure(label: string): void {
    const mark = performance.now();
    const diff = mark - this.time;

    this.stats[label].frames.push(diff);
    this.stats[label].total += diff;
    this.stats[label].min = Math.min(this.stats[label].min, diff);
    this.stats[label].max = Math.max(this.stats[label].max, diff);

    this.time = mark;
  }

  public endMeasure(): { [key: string]: number } {
    return Object.keys(this.stats).reduce<any>((obj, label) => {
      obj[label] = this.stats[label].frames[this.stats[label].frames.length - 1];
      return obj;
    }, {});
  }

  public getResults(): TStats {
    Object.keys(this.stats).forEach(label => {
      this.stats[label].average = this.stats[label].total / this.stats[label].frames.length;
    });

    return this.stats;
  }
}
