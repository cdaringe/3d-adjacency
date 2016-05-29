'use strict'

const c = require('./constants')

class Cluster {
  constructor (conf) {
    this.domain = conf.domain
    this.root = conf.root
    this.massNodes = [this.root]
  }
  
  clusterify() {
   this.massNodes = [this.root]
   this._clusterify(this.root)
  }
  
  _clusterify (node) {
    c.CLUSTER_ADJACENCY_DIRS.forEach(function _clusterChild(probeRequest) {
      var massNode
      var massyCoords = node.probe.apply(node, probeRequest)
      if (!massyCoords) return
      massNode = node.neighborToMass(massyCoords)
      this.massNodes.push(massNode)
      this._clusterify(massNode)
    }.bind(this))
  }

  serialize() {
    return this.massNodes.map(mn => mn.serialize())
  }

  print() {
    this.massNodes.forEach(mn => mn.print())
  }
}

module.exports = Cluster