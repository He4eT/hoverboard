import {
  titleSize,
  boardSize, boardY, vy, powerMultiplier,
  damping, power, angleMultiplier,
  cameraDistantion, cameraShift, cameraY
} from './config'

import * as THREE from 'three'
import {initGround, updateGround} from './scene/planes'
import {initBoard} from './scene/board'
import {toRad} from './utils'

let rendererContainer
let renderer
let scene
let camera

let contentWidth, contentHeight

let planes = initGround(titleSize)
let board = {
  model: initBoard(boardSize),
  alpha: 0,
  vx: 0,
  x: 0,
  y: 0,
  vy
}

let time = null

let {requestAnimationFrame} = window

export let setAlpha = newAlpha => {
  board.alpha = angleMultiplier * newAlpha
}

export let initVisualisation = () => {
  initGraphics()

  window.addEventListener('resize', onWindowResized)

  onWindowResized()
  render()
}

export let start = () => {
  // hide labels
  // set time
  requestAnimationFrame(compute)
}

function initGraphics () {
  rendererContainer = document.getElementById('renderer')
  renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: true })
  renderer.shadowMapEnabled = true
  renderer.shadowMapSoft = true
  renderer.setClearColor(0x000000, 0.1)

  rendererContainer.appendChild(renderer.domElement)

  scene = new THREE.Scene()

  initCamera()
  initLight()

  scene.add(board.model)
  planes.map(plane => scene.add(plane))
}

function initCamera () {
  camera = new THREE.PerspectiveCamera(60, contentWidth / contentHeight, 1, 100000)
  let cameraTarget = new THREE.Vector3(0, boardY * 2, 0)
  camera.position.set(0, cameraY, -cameraDistantion)
  camera.lookAt(cameraTarget)
}

function initLight () {
  scene.add(new THREE.AmbientLight(0x444444))
  let light = new THREE.DirectionalLight(0xdfebff, 1)
  light.target.position.set(0, 0, 0)
  light.position.set(0, 200, 0)
  light.position.multiplyScalar(1.3)

  light.castShadow = true
  light.shadowMapWidth = 1024
  light.shadowMapHeight = 1024
  let d = 400
  light.shadowCameraLeft = -d
  light.shadowCameraRight = d
  light.shadowCameraTop = d
  light.shadowCameraBottom = -d

  light.shadowCameraFar = 1000
  light.shadowDarkness = 0.5
  scene.add(light)
}

function updateWindowDimensions () {
  contentWidth = window.innerWidth
  contentHeight = window.innerHeight
}

function onWindowResized () {
  updateWindowDimensions()
  renderer.setSize(contentWidth, contentHeight)
  camera.aspect = contentWidth / contentHeight
  camera.updateProjectionMatrix()
}

function render () {
  renderer.render(scene, camera)
}

function compute (currentTime) {
  time = time || currentTime
  let dt = currentTime - time

  let angle = toRad(board.alpha)
  let ax = Math.sin(angle) * (-1)

  board.vx *= damping

  board.vx += ax * dt * power * powerMultiplier
  board.x += board.vx * dt
  board.y += board.vy * dt

  time = currentTime
  updateModel(angle, board.x, board.y)
  updateGround(board.x, board.y)
  render()

  requestAnimationFrame(compute)
}

function updateModel (a, x, y) {
  board.model.position.x = x
  board.model.position.z = y
  board.model.rotation.z =
    (board.model.rotation.z + a) / 2

  camera.position.x = x + a * cameraShift
  camera.position.z = y - cameraDistantion
}
