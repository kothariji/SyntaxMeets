class Point {
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  /**
   * Update the x and y values
   *
   * @param {Point} point
   */
  update (point) {
    this.x = point.x
    this.y = point.y
  }

  /**
   * Get the difference for x and y axis to another point
   *
   * @param {Point} point
   * @returns {Point}
   */
  getDifferenceTo (point) {
    return new Point(this.x - point.x, this.y - point.y)
  }

  /**
   * Calculate distance to another point
   *
   * @param {Point} point
   * @returns {Point}
   */
  getDistanceTo (point) {
    const diff = this.getDifferenceTo(point)

    return Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2))
  }
}

export default Point
