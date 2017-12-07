import * as THREE from 'three'

export let initRenderer = () => {
  let renderer = new THREE.WebGLRenderer({
    antialias: true,
    preserveDrawingBuffer: true,
    alpha: true})
  renderer.shadowMap.enabled = true
  renderer.shadowMapSoft = true
  renderer.setClearColor(0x000000, 0.1)
  return renderer
}
