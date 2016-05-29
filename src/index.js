'use strict'

const Cluster = require('./cluster')
const Mass = require('./mass')

function find(arr) {
  var clusters = []
  var clust
  var value
  for (var x = 0; x < arr.length; ++x) {
    for (var y = 0; y < arr[0].length; ++y) {
      for (var z = 0; z < arr[0][0].length; ++z) {
        value = arr[x][y][z]
        if (!Mass.isMasslike(value) || Mass.isMass(value)) {
          // pass if content is non-massy or we've already
          // massified the cell
        } else {
          clust = new Cluster({
            domain: arr,
            root: new Mass({ domain: arr, x, y, z, value: value }),
          })
          arr[x][y][z] = clust.root
          clust.clusterify()
          clusters.push(clust.serialize())
        }
      }
    }
  }
  return clusters
}

module.exports = {
	find,
	Cluster,
	Mass
}