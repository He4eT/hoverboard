import * as THREE from 'three'
import {toRad} from '../utils'

let size = 1
let planesCoords = [
  [-1, +1], [+0, +1], [+1, +1],
  [-1, +0], [+0, +0], [+1, +0],
  [-1, -1], [+0, -1], [+1, -1]
]
let planes = []

let createTile = ([x, y]) => {
  let geometry = new THREE.PlaneGeometry(size, size)
  // eslint-disable-next-line new-cap
  let texture = new THREE.ImageUtils.loadTexture('../images/grid.png')
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(20, 20)
  let material = new THREE.MeshBasicMaterial({map: texture})

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
  let py = plane.position.z
  let dy = 0

  if (x - px > 1.5 * size) { dx = 1 }
  if (px - x > 1.5 * size) { dx = -1 }
  plane.position.x += dx * 3 * size

  if (y - py > 1.5 * size) { dy = 1 }
  if (py - y > 1.5 * size) { dy = -1 }
  plane.position.z += dy * 3 * size
}

export let updateGround = (x, y) =>
  planes.forEach(updatePosition(x, y))
