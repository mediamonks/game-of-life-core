import { Renderer } from './Renderer';
import { Field } from './Field';
export interface Game {
    renderer: Renderer;
    onInit(field: Field): void;
    onCalculate(): void;
}
