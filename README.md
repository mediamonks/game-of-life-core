# game-of-life-core

A set of composable classes to build a Game of Life implementation.


## Installation

```sh
yarn add mediamonks/game-of-life-core#master
```

## Basic Usage

```ts
import Board, {
  ReferenceGame,
  ReferenceRenderer,
  RPentominoField,
  Rand400Field,
  Rand1500Field,
} from 'game-of-life-core';

// create a new Board
const board = new Board();

// Add fields to choose from in the URL
board.addField(new RPentominoField());
board.addField(new Rand400Field());
board.addField(new Rand1500Field());

// init the board with a Renderer and a Game
board.init(new ReferenceGame(new ReferenceRenderer(this.getElement('.stage'))));
```


## Documentation

View the [generated API documentation](http://mediamonks.github.io/game-of-life-core/).

### Board

The Board has a default size of `1200px` x `600px`. This can be changed by the `Field` config. 

It fetches several parameters from the URL to apply some settings:

* **field** - select one of the added fields (by id). If not in the URL, will select the first field
  that has been added. (e.g. `?field=r-pento`)
* **debug** - add additional debug output to the console, values are `on,1,true` (e.g. `?debug=1`)
* **interval** - set the amount of time (in ms) between game ticks, allowing for better visual debugging
  (e.g. `?interval=500`)
  
After `board.init()` has been called with the proper parameters, the `board` is set up, and will
call `game.onInit()` before starting the game ticket `500ms` later.

On each game `tick` it will call `game.onCalculate()` and `game.renderer.onRender()` and will
measure the execution time of both.

When the amount of iterations that is set in the `Field` config has completed, it will stop the
ticker and output the benchmark results in the console.

### Game

The `Game` should have a `onInit(field:Field)` and a `onCalculate()` method that are called by the
`Board` instance.

In the `onInit()` it should call the `renderer.onInit()` and set up the initial board frame using
`field.isCellAlive(x, y)` to see which pixels are on.

Each `tick` the `onCalculate()` is called, where the algorithm should do its thing. At the end
of this method the renderer should have all the information needed to execute the render pass.
This can be done by passing individual pixel updates, or by passing a complete data structure of
the new frame.

Just have a look at [./src/lib/reference/ReferenceGame.ts](./src/lib/reference/ReferenceGame.ts)
to see how you can implement one yourself.

### Renderer

The `Renderer` should have a `onInit(field:Field)` and a `onRender()` method that are called by the
`Game` and `Board` instance respectively.

In the `onInit()` it should set up the view with information from the `Field` config (e.g. width
and height) and potentially set the right pixels using `field.isCellAlive(x, y)` if not done in the
`Game`.

Each `tick` the `onRender()` is called, where the new frame should be outputted to the screen.

Just have a look at [./src/lib/reference/ReferenceRenderer.ts](./src/lib/reference/ReferenceRenderer.ts)
to see how you can implement one yourself.

### Field

A `Field` should have a `isCellAlive(x: number, y: number): boolean` and a `getConfig(): FieldConfig`
method that are called by the other instances.

An example field config:
```ts
const config = {
  id: 'r-pent', // The ID, can be set in the URL
  numIterations: 1104, // how many iterations this field should run
  width: Board.WIDTH / 5, // the width
  height: Board.HEIGHT / 5, // the height
}
``` 

The `isCellAlive` should return if a specific grid tile is alive or dead in the initial
configuration. This can be a fixed pattern, or set to random.

If you use random in your Fields (or game/renderer), you should use a random seed generator:
```ts
// import generator
import gen from 'random-seed';

// create generator with a specified seed that is the same every execution
this.rand = gen.create('97f32a5bb3fea3a2f78112b96a1e831d845d3bac');

// create a random number between 0-1
this.rand.random();
```

Every time you call `rand.random()` it will generate the same sequence of random numbers.


## Building

In order to build game-of-life-core, ensure that you have [Git](http://git-scm.com/downloads)
and [Node.js](http://nodejs.org/) installed.

Clone a copy of the repo:
```sh
git clone https://github.com/mediamonks/game-of-life-core.git
```

Change to the game-of-life-core directory:
```sh
cd game-of-life-core
```

Install dev dependencies:
```sh
yarn
```

Use one of the following main scripts:
```sh
yarn build            # build this project
yarn dev              # run compilers in watch mode, both for babel and typescript
yarn test             # run the unit tests incl coverage
yarn test:dev         # run the unit tests in watch mode
yarn lint             # run eslint and tslint on this project
yarn doc              # generate typedoc documentation
```

When installing this module, it adds a pre-commit hook, that runs lint and prettier commands
before committing, so you can be sure that everything checks out.


## Contribute

View [CONTRIBUTING.md](./CONTRIBUTING.md)


## Changelog

View [CHANGELOG.md](./CHANGELOG.md)


## Authors

View [AUTHORS.md](./AUTHORS.md)


## LICENSE

[MIT](./LICENSE) © MediaMonks


