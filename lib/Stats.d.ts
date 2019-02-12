export declare type TStats = {
    [key: string]: {
        frames: Array<number>;
        total: number;
        min: number;
        max: number;
        average: number;
    };
};
export default class Stats {
    private stats;
    private time;
    constructor(labels: Array<string>);
    startMeasure(): void;
    measure(label: string): void;
    endMeasure(): {
        [key: string]: number;
    };
    getResults(): TStats;
}
