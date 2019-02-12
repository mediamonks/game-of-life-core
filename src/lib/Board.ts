import Stats from './Stats';
import { Field } from './types/Field';
import { Game } from './types/Game';

export default class Board {
  public static WIDTH: number = 1200;
  public static HEIGHT: number = 600;

  public static DEBUG: boolean = false;
  public static INTERVAL: number = 0;

  private stats: Stats;
  private game: Game;

  private fields: Array<Field> = [];
  private field: Field | undefined;

  private currentIteration: number = -1;

  constructor() {
    this.stats = new Stats(['calculate', 'render']);

    const debug = getQueryParam('debug');
    const interval = getQueryParam('interval');

    if (debug) Board.DEBUG = ['1', 'true', 'on'].includes(debug);
    if (interval) Board.INTERVAL = parseInt(interval, 10);
  }

  public addField(field: Field) {
    this.fields.push(field);
  }

  public init(game: Game): void {
    this.game = game;

    const fieldId = getQueryParam('field');
    if (fieldId) {
      this.field = this.fields.find(field => field.getConfig().id === fieldId);
    }
    if (!this.field && this.fields.length) {
      this.field = this.fields[0];
    }

    if (!this.field) {
      return;
    }

    this.game.onInit(this.field);

    setTimeout(() => {
      this.update();
    }, 500);
  }

  public isCellAlive(x: number, y: number): boolean {
    if (this.field) {
      return this.field.isCellAlive(x, y);
    }
    return false;
  }

  private update(): void {
    this.stats.startMeasure();

    this.game.onCalculate();
    this.stats.measure('calculate');

    this.game.renderer.onRender();
    this.stats.measure('render');

    if (Board.DEBUG) {
      // tslint:disable-next-line no-console
      console.log(this.stats.endMeasure());
    }

    // UPDATE
    if (++this.currentIteration < this.field!.getConfig().numIterations) {
      if (Board.INTERVAL) {
        setTimeout(() => {
          this.update();
        }, Board.INTERVAL);
      } else {
        window.requestAnimationFrame(() => this.update());
      }
    } else {
      // END
      const results = this.stats.getResults();

      // tslint:disable-next-line no-console
      console.log(`
========== DONE ==========

---------- CALC ----------

total duration : ${results['calculate'].total.toFixed(3)}
 average frame : ${results['calculate'].average.toFixed(3)}
     min frame : ${results['calculate'].min.toFixed(3)}
     max frame : ${results['calculate'].max.toFixed(3)}

--------- RENDER ---------

total duration : ${results['render'].total.toFixed(3)}
 average frame : ${results['render'].average.toFixed(3)}
     min frame : ${results['render'].min.toFixed(3)}
     max frame : ${results['render'].max.toFixed(3)}

==========================
      `);

      // tslint:disable-next-line no-console
      console.log('frame log calculate', results['calculate'].frames);
      // tslint:disable-next-line no-console
      console.log('frame log render', results['render'].frames);
    }
  }
}

export function getQueryParam(key: string): string | null {
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [
        '',
        '',
      ])[1].replace(/\+/g, '%20'),
    ) || null
  );
}
