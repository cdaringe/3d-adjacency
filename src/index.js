'use strict'

const Cluster = require('./cluster')
const Mass = require('./mass')

/**
 * find contingent clusters in a 3d array. touching entities
 * with truthy values are considered `Mass`. a collection
 * of mass is a `Cluster`. entites are touching IFF they share
 * a face (that is, a piece of mass may at most have 6 adjacent
 * neighbors)
 * @param {array[][]} arr
 * @returns {array} e.g. [ [{x:0,y:0,z:1}], [{x:3,y:3,z:3},{x:4,y:3,z:3}]]
 */
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

/**
 * sorts nodes. see `sort`
 * @param {object} ma { x, y, z } node
 * @param {object} mb { x, y, z } node
 * @returns {number} -1/0/1
 */
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
 * @returns {array} sorted clusterSet
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
  nodeSorter,
	Cluster,
	Mass
}