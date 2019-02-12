import { Field, FieldConfig } from '../..';
export default class Rand1500Field implements Field {
    private readonly config;
    private rand;
    constructor();
    isCellAlive(_x: number, _y: number): boolean;
    getConfig(): FieldConfig;
}
