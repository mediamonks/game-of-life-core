"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Color = _interopRequireDefault(require("../Color"));

var ReferenceRenderer =
/*#__PURE__*/
function () {
  function ReferenceRenderer(parent) {
    (0, _defineProperty2.default)(this, "imageData", void 0);
    (0, _defineProperty2.default)(this, "ctx", void 0);
    (0, _defineProperty2.default)(this, "field", void 0);
    (0, _defineProperty2.default)(this, "parent", void 0);
    this.parent = parent;
  }

  var _proto = ReferenceRenderer.prototype;

  _proto.onInit = function onInit(field) {
    this.field = field;
    var canvas = document.createElement('canvas');
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.parent.appendChild(canvas);
    canvas.width = this.field.getConfig().width;
    canvas.height = this.field.getConfig().height;
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (var i = 0; i <= canvas.width * canvas.height; ++i) {
      var x = i % canvas.width;
      var y = Math.floor(i / canvas.width);

      if (this.field.isCellAlive(x, y)) {
        this.drawPixel(x, y);
      }
    }

    this.onRender();
  };

  _proto.drawPixel = function drawPixel(x, y) {
    var n = y * this.field.getConfig().width + x;
    this.imageData.data[n * 4 + 0] = this.imageData.data[n * 4 + 1] = this.imageData.data[n * 4 + 2] = _Color.default.WHITE;
  };

  _proto.clearPixel = function clearPixel(x, y) {
    var n = y * this.field.getConfig().width + x;
    this.imageData.data[n * 4 + 0] = this.imageData.data[n * 4 + 1] = this.imageData.data[n * 4 + 2] = _Color.default.BLACK;
  };

  _proto.onRender = function onRender() {
    this.ctx.putImageData(this.imageData, 0, 0);
  };

  return ReferenceRenderer;
}();

exports.default = ReferenceRenderer;