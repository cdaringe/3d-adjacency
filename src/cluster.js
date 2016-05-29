'use strict'

const c = require('./constants')
const Mass = require('./mass')

/**
 * @class
 * @property {array[][]} domain
 * @property {object} knownMass
 * @property {Mass} root original Mass node found
 * @property {Mass[]} massNodes
 */
class Cluster {
  constructor (conf) {
    this.domain = conf.domain
    this.knownMass = conf.knownMass
    this.root = conf.root
    this.massNodes = [this.root]
  }
  
  /**
   * searches for all connected Mass recursively, node-to-node.
   * updates the domain's `knownMass` as it goes as a side-effect.
   * @returns {array[]} `this.massNodes`. nodes that belong to this cluster
   */ 
  clusterify() {
   this.massNodes = [this.root]
   this._clusterify(this.root)
   return this.massNodes
  }
  
  /**
   * recursively probes nodes to add to the cluster
   * @private
   * @param {Mass} node
   * @returns {undefined}
   */
  _clusterify (node) {
    var massNode
    var addr
    var coords
    c.CLUSTER_ADJACENCY_DIRS.forEach((probeRequest) => {
      coords = node.probe.apply(node, probeRequest)
      if (!coords) return
      addr = `${coords.x}${coords.y}${coords.z}`
      if (this.knownMass[addr]) return
      massNode = new Mass({
        domain: this.domain,
        x: coords.x,
        y: coords.y,
        z: coords.z,
        value: this.domain[coords.x][coords.y][coords.z]
      })
      this.knownMass[addr] = massNode.value
      this.massNodes.push(massNode)
      this._clusterify(massNode)
    })
  }

  serialize() {
    return this.massNodes.map(mn => mn.serialize())
  }
}

module.exports = Cluster