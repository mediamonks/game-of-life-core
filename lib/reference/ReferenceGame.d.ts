import ReferenceRenderer from './ReferenceRenderer';
import { Game } from '../types/Game';
import { Field } from '../types/Field';
export default class ReferenceGame implements Game {
    private gridPositionStatic;
    renderer: ReferenceRenderer;
    constructor(renderer: ReferenceRenderer);
    onInit(field: Field): void;
    onCalculate(): void;
    countNeighbours(positions: Array<boolean>, x: number, y: number): number;
}
