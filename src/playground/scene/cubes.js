import * as THREE from 'three'

let cubes = []
let period = 0
let number = 0
let radius = 0
let handicap = 0

export let initCubes = (
  cubeNumber,
  cubeDistance,
  cubeWidth,
  cubeHeight,
  cubeColor,
  cubeHandicap
) => {
  let initCube = i => {
    var geometry =
      new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeWidth)
    var material =
      new THREE.MeshPhongMaterial({color: cubeColor})
    var cube = new THREE.Mesh(geometry, material)

    cube.position.x = 0
    cube.position.y = 0
    cube.position.z = cubeHandicap + cubeDistance * (i + 1)

    return cube
  }

  radius = cubeWidth
  period = cubeDistance
  number = cubeNumber
  handicap = cubeHandicap

  cubes = Array.from(' '.repeat(cubeNumber))
  cubes = cubes.map((_, i) => initCube(i))

  return cubes
}

let updateCube = (x, y, cb) => cube => {
  let cy = cube.position.z
  let cx = cube.position.x

  let distance =
    Math.sqrt((cy - y) * (cy - y) + (cx - x) * (cx - x))

  let collision = (distance < (radius / 2))

  if (collision) {
    // for prevent double check
    cube.position.x = x + handicap
  }

  if (cy < y - period) {
    cube.position.z += period * number
    cube.position.x = x
  }

  cb(collision, y)
}

export let updateCubes = (x, y, cb) =>
  cubes.forEach(updateCube(x, y, cb))
