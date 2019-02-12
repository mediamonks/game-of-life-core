"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Stats =
/*#__PURE__*/
function () {
  function Stats(labels) {
    var _this = this;

    (0, _defineProperty2.default)(this, "stats", {});
    (0, _defineProperty2.default)(this, "time", 0);
    labels.forEach(function (label) {
      _this.stats[label] = {
        frames: [],
        total: 0,
        min: Number.MAX_VALUE,
        max: 0,
        average: 0
      };
    });
  }

  var _proto = Stats.prototype;

  _proto.startMeasure = function startMeasure() {
    this.time = performance.now();
  };

  _proto.measure = function measure(label) {
    var mark = performance.now();
    var diff = mark - this.time;
    this.stats[label].frames.push(diff);
    this.stats[label].total += diff;
    this.stats[label].min = Math.min(this.stats[label].min, diff);
    this.stats[label].max = Math.max(this.stats[label].max, diff);
    this.time = mark;
  };

  _proto.endMeasure = function endMeasure() {
    var _this2 = this;

    return Object.keys(this.stats).reduce(function (obj, label) {
      obj[label] = _this2.stats[label].frames[_this2.stats[label].frames.length - 1];
      return obj;
    }, {});
  };

  _proto.getResults = function getResults() {
    var _this3 = this;

    Object.keys(this.stats).forEach(function (label) {
      _this3.stats[label].average = _this3.stats[label].total / _this3.stats[label].frames.length;
    });
    return this.stats;
  };

  return Stats;
}();

exports.default = Stats;