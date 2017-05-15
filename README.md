# 3d-adjacency

[![Greenkeeper badge](https://badges.greenkeeper.io/cdaringe/3d-adjacency.svg)](https://greenkeeper.io/)

[ ![Codeship Status for cdaringe/3d-adjacency](https://codeship.com/projects/9480c8b0-0977-0134-9cd2-02b70758e3b0/status?branch=master)](https://codeship.com/projects/155284) [![Coverage Status](https://coveralls.io/repos/github/cdaringe/3d-adjacency/badge.svg?branch=master)](https://coveralls.io/github/cdaringe/3d-adjacency?branch=master) <img src="https://img.shields.io/badge/standardjs-%E2%9C%93-green.svg" />

find "clusters" of adjacent cells from a 3d array.  the array does _not_ need to be cubic, but it does need to be a rectangular prism.

## example

suppose you had a three dimensional array, full of 0s and 1s.  0s are white, and 1s are green.  graphically, it may look like:

<img style="max-height: 125px" src="https://raw.githubusercontent.com/cdaringe/3d-adjacency/master/img/green-white-array.png" />

what you desire is the sets of connected green cells.  graphically, it may look like:

<img style="max-height: 125px" src="https://raw.githubusercontent.com/cdaringe/3d-adjacency/master/img/green-clusters.png" />

well, that's exactly what this module provides!  yahoo!

```js
const adj3d = require('3d-adjacency')
const exampleCube = [ // as shown above
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
const groups = adj3d.find(exampleCube)
// ==>
/*
[ // four groups of green blocks
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
]
*/
```

_"Hey, why is output not matching the same form as the input?"_

Valid question.  Specifically, the output is a set of objects that are coordinates+values. the input is the actual data.  Although one might expect the output to be something like `[ [0, 1, 2] ]`, where `0, 1, 2` are coordinates, the input was not coordinate sets to begin with.

## install

`npm install --save 3d-adjacency`

## usage

See example above and the [offcial API docs](http://cdaringe.github.io/3d-adjacency)


### changelog

- 0.0.2 handle much larger arrays. remove recursive calls to keep stack down
