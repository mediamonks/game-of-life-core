"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Board = _interopRequireDefault(require("../Board"));

var ReferenceGame =
/*#__PURE__*/
function () {
  function ReferenceGame(renderer) {
    (0, _defineProperty2.default)(this, "gridPositionStatic", void 0);
    (0, _defineProperty2.default)(this, "renderer", void 0);
    this.renderer = renderer;
  }

  var _proto = ReferenceGame.prototype;

  _proto.onInit = function onInit(field) {
    this.renderer.onInit(field);
    this.gridPositionStatic = [];

    for (var i = 0; i <= _Board.default.WIDTH * _Board.default.HEIGHT; ++i) {
      var x = i % _Board.default.WIDTH;
      var y = Math.floor(i / _Board.default.WIDTH);

      if (field.isCellAlive(x, y)) {
        this.gridPositionStatic[i] = true;
      } else {
        this.gridPositionStatic[i] = false;
      }
    }
  };

  _proto.onCalculate = function onCalculate() {
    var clone = this.gridPositionStatic.concat();

    for (var i = 0; i <= _Board.default.WIDTH * _Board.default.HEIGHT; ++i) {
      var x = i % _Board.default.WIDTH;
      var y = Math.floor(i / _Board.default.WIDTH);
      var neighbours = this.countNeighbours(clone, x, y);

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
  };

  _proto.countNeighbours = function countNeighbours(positions, x, y) {
    var n = 0;
    var center = y * _Board.default.WIDTH + x;
    if (x > 0 && positions[center - 1]) ++n;
    if (x < _Board.default.WIDTH - 1 && positions[center + 1]) ++n;
    if (y > 0 && positions[center - _Board.default.WIDTH]) ++n;
    if (y < _Board.default.HEIGHT - 1 && positions[center + _Board.default.WIDTH]) ++n;
    if (x > 0 && y > 0 && positions[center - 1 - _Board.default.WIDTH]) ++n;
    if (x < _Board.default.WIDTH - 1 && y > 0 && positions[center + 1 - _Board.default.WIDTH]) ++n;
    if (x > 0 && y < _Board.default.HEIGHT - 1 && positions[center - 1 + _Board.default.WIDTH]) ++n;
    if (x < _Board.default.WIDTH - 1 && y < _Board.default.HEIGHT - 1 && positions[center + 1 + _Board.default.WIDTH]) ++n;
    return n;
  };

  return ReferenceGame;
}();

exports.default = ReferenceGame;