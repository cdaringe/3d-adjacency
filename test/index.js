'use strict'

const mc = require('../')
const test = require('tape')

test('clusters', (t) => {
  const in1 = [ [[1, 1], [1, 0]], [[0, 0], [0, 1]]]

  t.deepEqual(
    mc.find(in1),
    [
      [
        { x: 0, y: 0, z: 0, value: 1 },
        { x: 0, y: 1, z: 0, value: 1 },
        { x: 0, y: 0, z: 1, value: 1 },
      ], [
        { x: 1, y: 1, z: 1, value: 1 }
      ]
    ],
    'simple cluster'
  )
  const in2 = [
    [
      [1, 0, 1], [0, 0, 0], [1, 0, 1],
    ],
    [
      [1, 0, 1], [0, 0, 0], [1, 0, 1],
    ],
    [
      [1, 0, 1], [0, 0, 0], [1, 0, 2],
    ],
  ]
  t.deepEquals(
    mc.find(in2),
    [
      [
        { x: 0, y: 0, z: 0, value: 1 },
        { x: 1, y: 0, z: 0, value: 1 },
        { x: 2, y: 0, z: 0, value: 1 }
      ],
      [
        { x: 0, y: 0, z: 2, value: 1 },
        { x: 1, y: 0, z: 2, value: 1 },
        { x: 2, y: 0, z: 2, value: 1 }
      ],
      [ 
        { x: 0, y: 2, z: 0, value: 1 },
        { x: 1, y: 2, z: 0, value: 1 },
        { x: 2, y: 2, z: 0, value: 1 }
      ],
      [
        { x: 0, y: 2, z: 2, value: 1 },
        { x: 1, y: 2, z: 2, value: 1 },
        { x: 2, y: 2, z: 2, value: 2 }
      ] 
    ],
    'large cluster (e.g. chair legs shape)'
  )
  t.end()
})

test('sort', (t) => {
  const unsorted = [
    [ 
      { x: 1, y: 1, z: 1 } 
    ],
    [
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 1 } 
    ]
  ]
  const sorted = [
    [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 1 },
      { x: 0, y: 1, z: 0 },
    ],
    [ 
      { x: 1, y: 1, z: 1 } 
    ],
  ]
  t.deepEquals(
    mc.sort(unsorted),
    sorted,
    'sorts'
  )
  t.end()
})
