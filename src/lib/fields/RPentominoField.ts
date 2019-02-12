// test for evolving R-pentomino
// http://www.conwaylife.com/wiki/R-pentomino
//
//    X X
//  X X
//    X
//
import { Field, FieldConfig } from '../..';
import Board from '../Board';

export default class RPentominoField implements Field {
  private readonly config: FieldConfig;
  private center: { x: number; y: number };

  constructor() {
    this.config = {
      id: 'r-pent',
      numIterations: 1104,
      width: Board.WIDTH / 5,
      height: Board.HEIGHT / 5,
    };

    this.center = { x: Math.floor(this.config.width / 2), y: Math.floor(this.config.height / 2) };
  }

  isCellAlive(x: number, y: number): boolean {
    return (
      (x === this.center.x && y === this.center.y - 1) ||
      (x === this.center.x + 1 && y === this.center.y - 1) ||
      (x === this.center.x - 1 && y === this.center.y) ||
      (x === this.center.x && y === this.center.y) ||
      (x === this.center.x && y === this.center.y + 1)
    );
  }

  getConfig(): FieldConfig {
    return this.config;
  }
}
