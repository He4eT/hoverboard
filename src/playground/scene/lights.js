import * as THREE from 'three'

export let initLights = () => {
  let ambientLight = new THREE.AmbientLight(0x444444)
  let light = new THREE.DirectionalLight(0xffffff, 1)

  light.target.position.set(0, 0, 0)
  light.position.set(0, 200, 0)
  light.position.multiplyScalar(1.3)

  light.castShadow = true
  light.shadow.mapSize.width = 1024
  light.shadow.mapSize.height = 1024

  let d = 400
  light.shadow.camera.left = -d
  light.shadow.camera.right = d
  light.shadow.camera.top = d
  light.shadow.camera.bottom = -d

  light.shadow.camera.far = 1000

  return {
    ambientLight,
    light
  }
}
