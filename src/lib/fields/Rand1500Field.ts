import gen, { RandomSeed } from 'random-seed';
import { Field, FieldConfig } from '../..';
import Board from '../Board';

export default class Rand1500Field implements Field {
  private readonly config: FieldConfig;
  private rand: RandomSeed;

  constructor() {
    this.rand = gen.create('97f32a5bb3fea3a2f78112b96a1e831d845d3bac');

    this.config = {
      id: 'rand-1500',
      numIterations: 1500,
      width: Board.WIDTH,
      height: Board.HEIGHT,
    };
  }

  isCellAlive(_x: number, _y: number): boolean {
    return this.rand.random() > 0.5;
  }

  getConfig() {
    return this.config;
  }
}
