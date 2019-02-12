export interface Field {
  isCellAlive(x: number, y: number): boolean;
  getConfig(): FieldConfig;
}

export type FieldConfig = {
  id: string;
  numIterations: number;
  width: number;
  height: number;
};
