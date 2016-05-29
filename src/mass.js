'use strict'

const c = require('./constants')

/**
 * @class
 * @property {array[][]} domain
 * @property {number} x/y/z coordinates
 * @property {*} value
 */
class Mass {
  constructor (conf) {
    this.domain = conf.domain
    this.x = conf.x
    this.y = conf.y
    this.z = conf.z
    this.value = conf.value
  }

  /**
   * probe for uninstantiated mass
   * @param {number} axis see X_/Y_/Z_AXIS constants
   * @param {number} 1/-1
   * @returns {object|undefined} probed coords
   */
  probe (axis, dir) {
    var coords = this.probeRequestToCoords.apply(this, arguments)
    var massCandidate
    switch (axis) {
      case c.X_AXIS:
        if (coords.x < 0 || coords.x >= this.domain.length) return
        massCandidate = this.domain[coords.x][this.y][this.z]
        break
      case c.Y_AXIS:
        if (coords.y < 0 || coords.y >= this.domain[0].length) return
        massCandidate = this.domain[this.x][coords.y][this.z]
        break
      case c.Z_AXIS:
        if (coords.z < 0 || coords.z >= this.domain[0][0].length) return
        massCandidate = this.domain[this.x][this.y][coords.z]
        break
    }
    return massCandidate ? coords : undefined

  }

  /**
   * convert a probe direction request into a set of coordinates
   * even if out-of-range
   * @param {number} axis axis constant
   * @param {number} dir direction to probe (1/-1 only)
   * @returns {object} coordinates {x, y, z} form
   */
  probeRequestToCoords (axis, dir) {
    switch (axis) {
      case c.X_AXIS:
        return {x: this.x + dir, y: this.y, z: this.z}
      case c.Y_AXIS:
        return {x: this.x, y: this.y + dir, z: this.z}
      case c.Z_AXIS:
        return {x: this.x, y: this.y, z: this.z + dir}
      default:
        /* istanbul ignore next */
        throw new ReferenceError(axis + ' axis invalid')
    }
  }

  /**
   * convert the Mass node to it's pure address object
   * representation
   * @returns {object}
   */
  serialize() {
    return { x: this.x, y: this.y, z: this.z, value: this.value }
  }
}

module.exports = Mass
