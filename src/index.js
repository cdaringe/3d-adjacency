'use strict'

const Cluster = require('./cluster')
const Mass = require('./mass')

function find(arr) {
  var knownMass = {} // { 000: 1, 001: 2 } ==> { address: value }
  var clusters = []
  var clust
  var value
  for (var x = 0; x < arr.length; ++x) {
    for (var y = 0; y < arr[0].length; ++y) {
      for (var z = 0; z < arr[0][0].length; ++z) {
        value = arr[x][y][z]
        if (value && !knownMass[`${x}${y}${z}`]) {
          knownMass[`${x}${y}${z}`] = value
          clust = new Cluster({
            domain: arr,
            knownMass,
            root: new Mass({ domain: arr, x, y, z, value }),
          })
          clust.clusterify()
          clusters.push(clust.serialize())
        }
      }
    }
  }
  return clusters
}

const SORT_PROPS = ['x', 'y', 'z']
function nodeSorter(ma, mb) {
  let axis
  for (var n in SORT_PROPS) {
    axis = SORT_PROPS[n]
    if (ma[axis] < mb[axis]) return -1
    if (ma[axis] > mb[axis]) return 1
  }
  // generally, 0 means we have two identically addressed
  // nodes. this is viably an error case, FYI!
  /* istanbul ignore next */
  return 0
}

/**
 * sort a cluster set, where x, y, z values rank
 * higher in the sort, respectively
 * @param {array[]} clusterSet array of clusters
 * @return {array} sorted clusterSet
 */
function sort (clusterSet) {
  clusterSet = clusterSet.map(clust => clust.sort(nodeSorter))
  return clusterSet.sort((cla, clb) => {
    return nodeSorter(cla[0], clb[0])
  })
}

module.exports = {
	find,
  sort,
	Cluster,
	Mass
}