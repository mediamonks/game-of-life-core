"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getQueryParam = getQueryParam;
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Stats = _interopRequireDefault(require("./Stats"));

var Board =
/*#__PURE__*/
function () {
  function Board() {
    (0, _defineProperty2.default)(this, "stats", void 0);
    (0, _defineProperty2.default)(this, "game", void 0);
    (0, _defineProperty2.default)(this, "fields", []);
    (0, _defineProperty2.default)(this, "field", void 0);
    (0, _defineProperty2.default)(this, "currentIteration", -1);
    this.stats = new _Stats.default(['calculate', 'render']);
    var log = getQueryParam('log');
    var interval = getQueryParam('interval');
    if (log) Board.LOG = ['1', 'true', 'on'].includes(log);
    if (interval) Board.INTERVAL = parseInt(interval, 10);
  }

  var _proto = Board.prototype;

  _proto.addField = function addField(field) {
    this.fields.push(field);
  };

  _proto.init = function init(game) {
    var _this = this;

    this.game = game;
    var test = getQueryParam('test');

    if (test) {
      this.field = this.fields.find(function (field) {
        return field.getConfig().id === test;
      });
    }

    if (!this.field && this.fields.length) {
      this.field = this.fields[0];
    }

    if (!this.field) {
      return;
    }

    this.game.onInit(this.field);
    setTimeout(function () {
      _this.update();
    }, 500);
  };

  _proto.isCellAlive = function isCellAlive(x, y) {
    if (this.field) {
      return this.field.isCellAlive(x, y);
    }

    return false;
  };

  _proto.update = function update() {
    var _this2 = this;

    this.stats.startMeasure();
    this.game.onCalculate();
    this.stats.measure('calculate');
    this.game.renderer.onRender();
    this.stats.measure('render');

    if (Board.DEBUG) {
      // tslint:disable-next-line no-console
      console.log(this.stats.endMeasure());
    } // UPDATE


    if (++this.currentIteration < this.field.getConfig().numIterations) {
      if (Board.INTERVAL) {
        setTimeout(function () {
          _this2.update();
        }, Board.INTERVAL);
      } else {
        window.requestAnimationFrame(function () {
          return _this2.update();
        });
      }
    } // END
    else {
        var results = this.stats.getResults(); // tslint:disable-next-line no-console

        console.log("\n========== DONE ==========\n\n---------- CALC ----------\n\ntotal duration : " + results['calculate'].total.toFixed(3) + "\n average frame : " + results['calculate'].average.toFixed(3) + "\n     min frame : " + results['calculate'].min.toFixed(3) + "\n     max frame : " + results['calculate'].max.toFixed(3) + "\n\n--------- RENDER ---------\n\ntotal duration : " + results['render'].total.toFixed(3) + "\n average frame : " + results['render'].average.toFixed(3) + "\n     min frame : " + results['render'].min.toFixed(3) + "\n     max frame : " + results['render'].max.toFixed(3) + "\n\n==========================\n      "); // tslint:disable-next-line no-console

        console.log('frame log calculate', results['calculate'].frames); // tslint:disable-next-line no-console

        console.log('frame log render', results['render'].frames);
      }
  };

  return Board;
}();

exports.default = Board;
(0, _defineProperty2.default)(Board, "WIDTH", 1200);
(0, _defineProperty2.default)(Board, "HEIGHT", 600);
(0, _defineProperty2.default)(Board, "DEBUG", false);
(0, _defineProperty2.default)(Board, "INTERVAL", 0);

function getQueryParam(key) {
  return decodeURIComponent((new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || ['', ''])[1].replace(/\+/g, '%20')) || null;
}
