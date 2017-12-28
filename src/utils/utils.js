import * as THREE from 'three'

export function toRad (degrees) {
  return degrees * Math.PI / 180
}

export function getPeerId () {
  let time = new Date()
  let mmss = time.getMinutes().toString() +
    time.getSeconds().toString()

  let n = n =>
    (mmss[n] | '0').toString()

  let peerName = `${n(1)}${n(3)}${n(0)}${n(2)}`

  return peerName
}

export let load = path => {
  let loader = new THREE.BufferGeometryLoader()
  let noop = _ => void _

  return new Promise((resolve, reject) =>
    loader.load(path, resolve, noop, reject))
}

export let setText = (selector, text) => {
  let el = document.querySelector(selector)
  el.innerHTML = text
}
