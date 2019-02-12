import { Field } from '../types/Field';
import { Renderer } from '../types/Renderer';
import Color from '../Color';

export default class ReferenceRenderer implements Renderer {
  public imageData: ImageData;
  public ctx: CanvasRenderingContext2D;

  private field: Field;
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
  }

  onInit(field: Field) {
    this.field = field;

    const canvas = document.createElement('canvas');
    this.ctx = canvas.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = false;

    this.parent.appendChild(canvas);

    canvas.width = this.field.getConfig().width;
    canvas.height = this.field.getConfig().height;

    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i <= canvas.width * canvas.height; ++i) {
      const x = i % canvas.width;
      const y = Math.floor(i / canvas.width);

      if (this.field.isCellAlive(x, y)) {
        this.drawPixel(x, y);
      }
    }

    this.onRender();
  }

  public drawPixel(x: number, y: number): void {
    const n = y * this.field.getConfig().width + x;
    this.imageData.data[n * 4 + 0] = this.imageData.data[n * 4 + 1] = this.imageData.data[
      n * 4 + 2
    ] =
      Color.WHITE;
  }

  public clearPixel(x: number, y: number): void {
    const n = y * this.field.getConfig().width + x;
    this.imageData.data[n * 4 + 0] = this.imageData.data[n * 4 + 1] = this.imageData.data[
      n * 4 + 2
    ] =
      Color.BLACK;
  }

  public onRender(): void {
    this.ctx.putImageData(this.imageData, 0, 0);
  }
}
