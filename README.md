# 3d-adjacency

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
]
*/
```

_"Hey, why is output not matching the same form as the input?"_

Valid question.  Specifically, the output is a set of objects that are coordinates+values. the input is the actual data.  Although one might expect the output to be something like `[ [0, 1, 2] ]`, where `0, 1, 2` are coordinates, the input was not coordinate sets to begin with.

## install

`npm install --save 3d-adjacency`

## usage

See example above and the [offcial API docs](http://www.cdaringe.github.io/3d-adjacency)
