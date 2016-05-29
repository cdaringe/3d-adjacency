'use strict'

const mc = require('../')
const test = require('tape')

const clustersToString = (clusters) => {
  clusters = clusters.map(clust => {
    return clust.map(mass => `${mass.x} ${mass.y} ${mass.z}`).sort()
  })
  return clusters.sort()
}

test('clusters', (t) => {
  const in1 = [ [[1, 1], [1, 0]], [[0, 0], [0, 1]]]

  t.deepEqual(
    mc.find(in1),
    [
      [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
        { x: 0, y: 0, z: 1 },
      ], [
        { x: 1, y: 1, z: 1 }
      ]
    ],
    'simple cluster'
  )
  // const in2 = [
  //   [
  //     [1, 0, 1], [0, 0, 0], [1, 0, 1],
  //   ],
  //   [
  //     [1, 0, 1], [0, 0, 0], [1, 0, 1],
  //   ],
  //   [
  //     [1, 0, 1], [0, 0, 0], [1, 0, 1],
  //   ],
  // ]
  // console.log(clustersToString(mc.find(in1)))
  t.end()
})
  