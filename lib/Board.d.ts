import { Field } from './types/Field';
import { Game } from './types/Game';
export default class Board {
    static WIDTH: number;
    static HEIGHT: number;
    static LOG: boolean;
    static INTERVAL: number;
    private stats;
    private game;
    private fields;
    private field;
    private currentIteration;
    constructor();
    addField(field: Field): void;
    init(game: Game): void;
    isCellAlive(x: number, y: number): boolean;
    private update;
}
export declare function getQueryParam(key: string): string | null;
