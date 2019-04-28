import * as THREE from 'three'

/* Math */

export function toRad (degrees) {
  return degrees * Math.PI / 180
}

/* THREE */

export let load = path => {
  let loader = new THREE.BufferGeometryLoader()
  let noop = _ => void _

  return new Promise((resolve, reject) =>
    loader.load(path, resolve, noop, reject))
}

/* DOM */

export let get = selector =>
  document.querySelector(selector)

export let setText = (selector, text) =>
  void (get(selector).innerHTML = text)

export let showBySelector = selector =>
  void (get(selector).style.visibility = 'visible')

export let hideBySelector = selector =>
  void (get(selector).style.display = 'none')

/* etc */

export function getPin () {
  let time = new Date()
  let mmss = time.getMinutes().toString() +
    time.getSeconds().toString()

  let n = n =>
    (mmss[n] | '0').toString()

  let peerName = `${n(1)}${n(3)}${n(0)}${n(2)}`

  return peerName
}
