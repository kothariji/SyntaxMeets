'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Given two points and a length, calculate and draw the catenary.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * JavaScript implementation:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2018 Jan Hug <me@dulnan.net>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Released under the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ----------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Original ActionScript implementation:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright poiasd ( http://wonderfl.net/user/poiasd )
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * MIT License ( http://www.opensource.org/licenses/mit-license.php )
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Downloaded from: http://wonderfl.net/c/8Bnl
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ----------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Archived by and downloaded from:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://wa.zozuar.org/code.php?c=8Bnl
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EPSILON = 1e-6;

var Catenary = function () {
  /**
   * constructor
   *
   * @param {Object} settings
   * @param {Number} settings.segments Number of segments of the chain.
   * @param {Number} settings.iterationLimit Maximum amount iterations for getting catenary parameters.
   */
  function Catenary() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$segments = _ref.segments,
        segments = _ref$segments === undefined ? 50 : _ref$segments,
        _ref$iterationLimit = _ref.iterationLimit,
        iterationLimit = _ref$iterationLimit === undefined ? 100 : _ref$iterationLimit;

    _classCallCheck(this, Catenary);

    this.p1 = new _Point2.default();
    this.p2 = new _Point2.default();

    this.segments = segments;
    this.iterationLimit = iterationLimit;
  }

  /**
   * Draws a catenary given two coordinates, a length and a context.
   * 
   * @param {CanvasRenderingContext2D} context The canvas context to draw the catenary on to.
   * @param {Point} p1 First point
   * @param {Point} p2 Second point
   * @param {Number} chainLength The length of the catenary
   */


  _createClass(Catenary, [{
    key: 'drawToCanvas',
    value: function drawToCanvas(context, point1, point2, chainLength) {
      this.p1.update(point1);
      this.p2.update(point2);

      var isFlipped = this.p1.x > this.p2.x;

      var p1 = isFlipped ? this.p2 : this.p1;
      var p2 = isFlipped ? this.p1 : this.p2;

      var distance = p1.getDistanceTo(p2);

      var curveData = [];
      var isStraight = true;

      // Prevent "expensive" catenary calculations if it would only result
      // in a straight line.
      if (distance < chainLength) {
        var diff = p2.x - p1.x;

        // If the distance on the x axis of both points is too small, don't
        // calculate a catenary.
        if (diff > 0.01) {
          var h = p2.x - p1.x;
          var v = p2.y - p1.y;
          var a = -this.getCatenaryParameter(h, v, chainLength, this.iterationLimit);
          var x = (a * Math.log((chainLength + v) / (chainLength - v)) - h) * 0.5;
          var y = a * Math.cosh(x / a);
          var offsetX = p1.x - x;
          var offsetY = p1.y - y;
          curveData = this.getCurve(a, p1, p2, offsetX, offsetY, this.segments);
          isStraight = false;
        } else {
          var mx = (p1.x + p2.x) * 0.5;
          var my = (p1.y + p2.y + chainLength) * 0.5;

          curveData = [[p1.x, p1.y], [mx, my], [p2.x, p2.y]];
        }
      } else {
        curveData = [[p1.x, p1.y], [p2.x, p2.y]];
      }

      if (isStraight) {
        this.drawLine(curveData, context);
      } else {
        this.drawCurve(curveData, context);
      }

      return curveData;
    }

    /**
     * Determines catenary parameter.
     * 
     * @param {Number} h Horizontal distance of both points.
     * @param {Number} v Vertical distance of both points.
     * @param {Number} length The catenary length.
     * @param {Number} limit Maximum amount of iterations to find parameter.
     */

  }, {
    key: 'getCatenaryParameter',
    value: function getCatenaryParameter(h, v, length, limit) {
      var m = Math.sqrt(length * length - v * v) / h;
      var x = Math.acosh(m) + 1;
      var prevx = -1;
      var count = 0;

      while (Math.abs(x - prevx) > EPSILON && count < limit) {
        prevx = x;
        x = x - (Math.sinh(x) - m * x) / (Math.cosh(x) - m);
        count++;
      }

      return h / (2 * x);
    }

    /**
     * Calculate the catenary curve.
     * Increasing the segments value will produce a catenary closer
     * to reality, but will require more calcluations.
     * 
     * @param {Number} a The catenary parameter.
     * @param {Point} p1 First point
     * @param {Point} p2 Second point
     * @param {Number} offsetX The calculated offset on the x axis.
     * @param {Number} offsetY The calculated offset on the y axis.
     * @param {Number} segments How many "parts" the chain should be made of.
     */

  }, {
    key: 'getCurve',
    value: function getCurve(a, p1, p2, offsetX, offsetY, segments) {
      var data = [p1.x, a * Math.cosh((p1.x - offsetX) / a) + offsetY];

      var d = p2.x - p1.x;
      var length = segments - 1;

      for (var i = 0; i < length; i++) {
        var x = p1.x + d * (i + 0.5) / length;
        var y = a * Math.cosh((x - offsetX) / a) + offsetY;
        data.push(x, y);
      }

      data.push(p2.x, a * Math.cosh((p2.x - offsetX) / a) + offsetY);

      return data;
    }

    /**
     * Draws a straight line between two points.
     *
     * @param {Array} data Even indices are x, odd are y.
     * @param {CanvasRenderingContext2D} context The context to draw to.
     */

  }, {
    key: 'drawLine',
    value: function drawLine(data, context) {
      context.moveTo(data[0][0], data[0][1]);

      context.lineTo(data[1][0], data[1][1]);
    }

    /**
     * Draws a quadratic curve between every calculated catenary segment,
     * so that the segments don't look like straight lines.
     *
     * @param {Array} data Even indices are x, odd are y.
     * @param {CanvasRenderingContext2D} context The context to draw to.
     * 
     * @returns {Array} The original segment coordinates.
     */

  }, {
    key: 'drawCurve',
    value: function drawCurve(data, context) {
      var length = data.length * 0.5 - 1;
      var ox = data[2];
      var oy = data[3];

      var temp = [];

      context.moveTo(data[0], data[1]);

      for (var i = 2; i < length; i++) {
        var x = data[i * 2];
        var y = data[i * 2 + 1];
        var mx = (x + ox) * 0.5;
        var my = (y + oy) * 0.5;
        temp.push([ox, oy, mx, my]);
        context.quadraticCurveTo(ox, oy, mx, my);
        ox = x;
        oy = y;
      }

      length = data.length;
      context.quadraticCurveTo(data[length - 4], data[length - 3], data[length - 2], data[length - 1]);

      return temp;
    }
  }]);

  return Catenary;
}();

exports.default = Catenary;