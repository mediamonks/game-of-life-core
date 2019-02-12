export interface Field {
    isCellAlive(x: number, y: number): boolean;
    getConfig(): FieldConfig;
}
export declare type FieldConfig = {
    id: string;
    numIterations: number;
    width: number;
    height: number;
};
