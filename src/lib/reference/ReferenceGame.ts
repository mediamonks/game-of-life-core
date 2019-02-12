import ReferenceRenderer from './ReferenceRenderer';
import Board from '../Board';
import { Game } from '../types/Game';
import { Field } from '../types/Field';

export default class ReferenceGame implements Game {
  private gridPositionStatic: Array<boolean>;
  public renderer: ReferenceRenderer;

  constructor(renderer: ReferenceRenderer) {
    this.renderer = renderer;
  }

  onInit(field: Field): void {
    this.renderer.onInit(field);
    this.gridPositionStatic = [];

    for (let i = 0; i <= Board.WIDTH * Board.HEIGHT; ++i) {
      const x = i % Board.WIDTH;
      const y = Math.floor(i / Board.WIDTH);

      if (field.isCellAlive(x, y)) {
        this.gridPositionStatic[i] = true;
      } else {
        this.gridPositionStatic[i] = false;
      }
    }
  }

  onCalculate(): void {
    const clone = this.gridPositionStatic.concat();
    for (let i = 0; i <= Board.WIDTH * Board.HEIGHT; ++i) {
      const x = i % Board.WIDTH;
      const y = Math.floor(i / Board.WIDTH);
      const neighbours = this.countNeighbours(clone, x, y);
      if (clone[i]) {
        if (neighbours < 2 || neighbours > 3) {
          this.renderer.clearPixel(x, y);
          this.gridPositionStatic[i] = false;
        }
      }
      if (!clone[i]) {
        if (neighbours === 3) {
          this.renderer.drawPixel(x, y);
          this.gridPositionStatic[i] = true;
        }
      }
    }
  }

  countNeighbours(positions: Array<boolean>, x: number, y: number): number {
    let n = 0;
    const center = y * Board.WIDTH + x;

    if (x > 0 && positions[center - 1]) ++n;
    if (x < Board.WIDTH - 1 && positions[center + 1]) ++n;
    if (y > 0 && positions[center - Board.WIDTH]) ++n;
    if (y < Board.HEIGHT - 1 && positions[center + Board.WIDTH]) ++n;
    if (x > 0 && y > 0 && positions[center - 1 - Board.WIDTH]) ++n;
    if (x < Board.WIDTH - 1 && y > 0 && positions[center + 1 - Board.WIDTH]) ++n;
    if (x > 0 && y < Board.HEIGHT - 1 && positions[center - 1 + Board.WIDTH]) ++n;
    if (x < Board.WIDTH - 1 && y < Board.HEIGHT - 1 && positions[center + 1 + Board.WIDTH]) ++n;

    return n;
  }
}
