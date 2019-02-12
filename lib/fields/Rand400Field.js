"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _randomSeed = _interopRequireDefault(require("random-seed"));

var _Board = _interopRequireDefault(require("../Board"));

var Rand400Field =
/*#__PURE__*/
function () {
  function Rand400Field() {
    (0, _defineProperty2.default)(this, "config", void 0);
    (0, _defineProperty2.default)(this, "rand", void 0);
    this.rand = _randomSeed.default.create('97f32a5b831d845d3bacb3fea3a2f78112b96a1e');
    this.config = {
      id: 'rand-400',
      numIterations: 400,
      width: _Board.default.WIDTH,
      height: _Board.default.HEIGHT
    };
  }

  var _proto = Rand400Field.prototype;

  _proto.isCellAlive = function isCellAlive(_x, _y) {
    return this.rand.random() > 0.5;
  };

  _proto.getConfig = function getConfig() {
    return this.config;
  };

  return Rand400Field;
}();

exports.default = Rand400Field;