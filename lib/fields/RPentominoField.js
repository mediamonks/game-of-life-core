"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Board = _interopRequireDefault(require("../Board"));

// test for evolving R-pentomino
// http://www.conwaylife.com/wiki/R-pentomino
//
//    X X
//  X X
//    X
//
var RPentominoField =
/*#__PURE__*/
function () {
  function RPentominoField() {
    (0, _defineProperty2.default)(this, "config", void 0);
    (0, _defineProperty2.default)(this, "center", void 0);
    this.config = {
      id: 'r-pent',
      numIterations: 1104,
      width: _Board.default.WIDTH / 5,
      height: _Board.default.HEIGHT / 5
    };
    this.center = {
      x: Math.floor(this.config.width / 2),
      y: Math.floor(this.config.height / 2)
    };
  }

  var _proto = RPentominoField.prototype;

  _proto.isCellAlive = function isCellAlive(x, y) {
    return x === this.center.x && y === this.center.y - 1 || x === this.center.x + 1 && y === this.center.y - 1 || x === this.center.x - 1 && y === this.center.y || x === this.center.x && y === this.center.y || x === this.center.x && y === this.center.y + 1;
  };

  _proto.getConfig = function getConfig() {
    return this.config;
  };

  return RPentominoField;
}();

exports.default = RPentominoField;