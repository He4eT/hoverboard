import * as THREE from 'three'

import {initGround, updateGround} from './scene/planes'
import {initBoard} from './scene/board'
import {initLights} from './scene/lights'
import {initCamera} from './scene/camera'
import {initRenderer} from './scene/renderer'

import {toRad} from './utils'

import {
  titleSize,
  boardSize, vy, powerMultiplier,
  damping, power, angleMultiplier,
  cameraDistantion, cameraShift
} from './config'

let {requestAnimationFrame} = window
let contentWidth, contentHeight
let scene, renderer, rendererContainer

let time = null

let camera
let lights = initLights()
let planes = initGround(titleSize)

let board = {
  model: initBoard(boardSize),
  alpha: 0,
  vx: 0,
  x: 0,
  y: 0,
  vy
}

/* Controls */
export let setAlpha = newAlpha =>
  void (board.alpha = angleMultiplier * newAlpha)

export let start = () =>
  requestAnimationFrame(compute)

/* Scene */
export let initVisualisation = () => {
  prepareScene()

  window.addEventListener('resize', onWindowResized)
  onWindowResized()
  render()
}

function prepareScene () {
  renderer = initRenderer()
  rendererContainer = document.getElementById('renderer')
  rendererContainer.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  scene.add(lights.ambientLight)
  scene.add(lights.light)
  scene.add(board.model)
  planes.map(plane =>
    scene.add(plane))

  camera = initCamera(contentWidth, contentHeight)
}

function render () {
  renderer.render(scene, camera)
}

/* Logic */
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

/* Utils */
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
