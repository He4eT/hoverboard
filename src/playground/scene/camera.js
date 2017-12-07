import * as THREE from 'three'
import {
  boardY, cameraY, cameraDistantion
} from '../config'

export let initCamera = (contentWidth, contentHeight) => {
  let camera = new THREE.PerspectiveCamera(
    60, contentWidth / contentHeight, 1, 100000)

  let cameraTarget = new THREE.Vector3(0, boardY * 2, 0)

  camera.position.set(0, cameraY, -cameraDistantion)
  camera.lookAt(cameraTarget)

  return camera
}
