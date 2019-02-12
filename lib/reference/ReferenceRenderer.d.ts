import { Field } from '../types/Field';
import { Renderer } from '../types/Renderer';
export default class ReferenceRenderer implements Renderer {
    imageData: ImageData;
    ctx: CanvasRenderingContext2D;
    private field;
    private parent;
    constructor(parent: HTMLElement);
    onInit(field: Field): void;
    drawPixel(x: number, y: number): void;
    clearPixel(x: number, y: number): void;
    onRender(): void;
}
