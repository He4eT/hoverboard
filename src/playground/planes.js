import * as THREE from 'three'
import {toRad} from './utils'

let size = 1
let planesCoords = [
  [-1, +1], [+0, +1], [+1, +1],
  [-1, +0], [+0, +0], [+1, +0],
  [-1, -1], [+0, -1], [+1, -1]
]
let planes = []

let createTile = ([x, y]) => {
  let geometry = new THREE.PlaneGeometry(size, size)
  let material = new THREE.MeshBasicMaterial({color: x + y})
  let mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.x = toRad(-90)
  mesh.position.x = x * size
  mesh.position.z = y * size

  return mesh
}

export let initGround = planeSize => {
  size = planeSize
  planes = planesCoords.map(createTile)
  return planes
}

let updatePosition = (x, y) => plane => {
  let px = plane.position.x
  let dx = 0

  if (x - px > 1.5 * size) {
    dx = 1
  }
  if (px - x > 1.5 * size) {
    dx = -1
  }

  plane.position.x += dx * 3 * size
}

export let updateGround = (x, y) =>
  planes.forEach(updatePosition(x, y))
