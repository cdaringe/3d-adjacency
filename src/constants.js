'use strict'

const X_AXIS = 0
const Y_AXIS = 1
const Z_AXIS = 2
const CLUSTER_ADJACENCY_DIRS = [
  [X_AXIS, 1], [X_AXIS, -1],
  [Y_AXIS, 1], [Y_AXIS, -1],
  [Z_AXIS, 1], [Z_AXIS, -1],
]

module.exports = {
	X_AXIS,
	Y_AXIS,
	Z_AXIS,
	CLUSTER_ADJACENCY_DIRS
}