'use strict'

const c = require('./constants')

class Cluster {
  constructor (conf) {
    this.domain = conf.domain
    this.knownMass = conf.knownMass
    this.root = conf.root
    this.massNodes = [this.root]
  }
  
  clusterify() {
   this.massNodes = [this.root]
   this._clusterify(this.root)
  }
  
  _clusterify (node) {
    var massNode
    var addr
    var coords
    c.CLUSTER_ADJACENCY_DIRS.forEach((probeRequest) => {
      coords = node.probe.apply(node, probeRequest)
      if (!coords) return
      addr = `${coords.x}${coords.y}${coords.z}`
      if (this.knownMass[addr]) return
      massNode = node.neighborToMass(coords)
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