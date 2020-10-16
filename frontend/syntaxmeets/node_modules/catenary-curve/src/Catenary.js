/**
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
import Point from './Point'

const EPSILON = 1e-6

class Catenary {
  /**
   * constructor
   *
   * @param {Object} settings
   * @param {Number} settings.segments Number of segments of the chain.
   * @param {Number} settings.iterationLimit Maximum amount iterations for getting catenary parameters.
   */
  constructor ({ segments = 50, iterationLimit = 100 } = {}) {
    this.p1 = new Point()
    this.p2 = new Point()

    this.segments = segments
    this.iterationLimit = iterationLimit
  }

  /**
   * Draws a catenary given two coordinates, a length and a context.
   * 
   * @param {CanvasRenderingContext2D} context The canvas context to draw the catenary on to.
   * @param {Point} p1 First point
   * @param {Point} p2 Second point
   * @param {Number} chainLength The length of the catenary
   */
  drawToCanvas (context, point1, point2, chainLength) {
    this.p1.update(point1)
    this.p2.update(point2)

    const isFlipped = this.p1.x > this.p2.x

    const p1 = isFlipped ? this.p2 : this.p1
    const p2 = isFlipped ? this.p1 : this.p2

    const distance = p1.getDistanceTo(p2)

    let curveData = []
    let isStraight = true

    // Prevent "expensive" catenary calculations if it would only result
    // in a straight line.
    if (distance < chainLength) {
      const diff = p2.x - p1.x

      // If the distance on the x axis of both points is too small, don't
      // calculate a catenary.
      if (diff > 0.01) {
        let h = p2.x - p1.x
        let v = p2.y - p1.y
        let a = -this.getCatenaryParameter(h, v, chainLength, this.iterationLimit)
        let x = (a * Math.log((chainLength + v) / (chainLength - v)) - h) * 0.5
        let y = a * Math.cosh(x / a)
        let offsetX = p1.x - x
        let offsetY = p1.y - y
        curveData = this.getCurve(a, p1, p2, offsetX, offsetY, this.segments)
        isStraight = false
      } else {
        let mx = (p1.x + p2.x) * 0.5
        let my = (p1.y + p2.y + chainLength) * 0.5

        curveData = [
          [p1.x, p1.y],
          [mx, my],
          [p2.x, p2.y]
        ]
      }
    } else {
      curveData = [
        [p1.x, p1.y],
        [p2.x, p2.y]
      ]
    }

    if (isStraight) {
      this.drawLine(curveData, context)
    } else {
      this.drawCurve(curveData, context)
    }

    return curveData
  }

  /**
   * Determines catenary parameter.
   * 
   * @param {Number} h Horizontal distance of both points.
   * @param {Number} v Vertical distance of both points.
   * @param {Number} length The catenary length.
   * @param {Number} limit Maximum amount of iterations to find parameter.
   */
  getCatenaryParameter (h, v, length, limit) {
    let m = Math.sqrt(length * length - v * v) / h
    let x = Math.acosh(m) + 1
    let prevx = -1
    let count = 0

    while (Math.abs(x - prevx) > EPSILON && count < limit) {
      prevx = x
      x = x - (Math.sinh(x) - m * x) / (Math.cosh(x) - m)
      count++
    }

    return h / (2 * x)
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
  getCurve (a, p1, p2, offsetX, offsetY, segments) {
    let data = [p1.x, a * Math.cosh((p1.x - offsetX) / a) + offsetY]

    const d = p2.x - p1.x
    const length = segments - 1

    for (let i = 0; i < length; i++) {
      let x = p1.x + d * (i + 0.5) / length
      let y = a * Math.cosh((x - offsetX) / a) + offsetY
      data.push(x, y)
    }

    data.push(p2.x, a * Math.cosh((p2.x - offsetX) / a) + offsetY)

    return data
  }

  /**
   * Draws a straight line between two points.
   *
   * @param {Array} data Even indices are x, odd are y.
   * @param {CanvasRenderingContext2D} context The context to draw to.
   */
  drawLine (data, context) {
    context.moveTo(data[0][0], data[0][1])

    context.lineTo(data[1][0], data[1][1])
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
  drawCurve (data, context) {
    let length = data.length * 0.5 - 1
    let ox = data[2]
    let oy = data[3]

    let temp = []

    context.moveTo(data[0], data[1])

    for (let i = 2; i < length; i++) {
      let x = data[i * 2]
      let y = data[i * 2 + 1]
      let mx = (x + ox) * 0.5
      let my = (y + oy) * 0.5
      temp.push([ox,oy,mx,my])
      context.quadraticCurveTo(ox, oy, mx, my)
      ox = x
      oy = y
    }

    length = data.length
    context.quadraticCurveTo(data[length - 4], data[length - 3], data[length - 2], data[length - 1])

    return temp
  }
}

export default Catenary
