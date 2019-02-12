import { Field, FieldConfig } from '../..';
export default class RPentominoField implements Field {
    private readonly config;
    private center;
    constructor();
    isCellAlive(x: number, y: number): boolean;
    getConfig(): FieldConfig;
}
