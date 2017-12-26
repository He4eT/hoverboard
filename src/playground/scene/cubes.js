import * as THREE from 'three'

let cubes = []
let distance = 0
let number = 0

export let initCubes =
(cubeNumber, cubeDistance, cubeWidth, cubeHeight, cubeColor) => {
  let initCube = i => {
    var geometry =
      new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeWidth)
    var material =
      new THREE.MeshPhongMaterial({color: cubeColor})
    var cube = new THREE.Mesh(geometry, material)

    cube.position.x = 0
    cube.position.y = 0
    cube.position.z = cubeDistance * (i + 1)

    return cube
  }

  distance = cubeDistance
  number = cubeNumber

  cubes = Array.from(' '.repeat(cubeNumber))
  cubes = cubes.map((_, i) => initCube(i))

  return cubes
}

let updateCube = (x, y) => cube => {
  let cy = cube.position.z

  if (cy < y - distance) {
    cube.position.z += distance * number
    cube.position.x = x
  }
}

export let updateCubes = (x, y) =>
  cubes.forEach(updateCube(x, y))
