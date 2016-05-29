'use strict'

const c = require('./constants')

class Mass {
  constructor (conf) {
    this.domain = conf.domain
    this.x = conf.x
    this.y = conf.y
    this.z = conf.z
    this.value = conf.value
  }

  print () {
    console.log(`${this.x} ${this.y} ${this.z}`)
  }

  /**
   * probe for uninstantiated mass
   * @param {number} see X_/Y_/Z_AXIS constants
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

  probeRequestToCoords (axis, dir) {
    switch (axis) {
      case c.X_AXIS:
        return {x: this.x + dir, y: this.y, z: this.z}
      case c.Y_AXIS:
        return {x: this.x, y: this.y + dir, z: this.z}
      case c.Z_AXIS:
        return {x: this.x, y: this.y, z: this.z + dir}
      default:
        throw new ReferenceError(axis + ' axis invalid')
    }
  }
  
  neighborToMass (coords) {
    var mass = new Mass({
      domain: this.domain,
      x: coords.x,
      y: coords.y,
      z: coords.z,
      value: this.domain[coords.x][coords.y][coords.z]
    })
    return mass
  }
  serialize() {
    return { x: this.x, y: this.y, z: this.z }
  }
}

module.exports = Mass
