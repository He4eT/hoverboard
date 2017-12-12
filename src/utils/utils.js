import * as THREE from 'three'

export function toRad (degrees) {
  return degrees * Math.PI / 180
}

export function getPeerId () {
  let time = new Date()
  let mmss = time.getMinutes().toString() +
    time.getSeconds().toString()

  let peerName = mmss[1] + mmss[3] + mmss[0] + mmss[2]
  return peerName
}

export let load = path => {
  let loader = new THREE.BufferGeometryLoader()
  let noop = _ => void _

  return new Promise((resolve, reject) =>
    loader.load(path, resolve, noop, reject))
}
