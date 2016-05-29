'use strict'

const Cluster = require('./cluster')
const Mass = require('./mass')

function find(xArr) {
  var clusters = []
  var clust
  xArr.forEach((yArr, x) => {
    yArr.forEach((zArr, y) => {
      zArr.forEach((value, z) => {
        // console.log(x + ' ' + y + ' ' + z + ' - ' + value)
        if (!Mass.isMasslike(value)) return
        if (Mass.isMass(value)) return
        clust = new Cluster({
          domain: xArr,
          root: new Mass({ domain: xArr, x: x, y: y, z: z, value: value }),
        })
        xArr[x][y][z] = clust.root
        clust.clusterify()
        clusters.push(clust.serialize())
      })
    })
  })
  return clusters
}

module.exports = {
	find,
	Cluster,
	Mass
}