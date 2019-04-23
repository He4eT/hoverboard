import * as THREE from 'three'

import {
  initCubes, updateCubes
} from './scene/cubes'
import {initGround, updateGround} from './scene/planes'
import {initBoard} from './scene/board'
import {initLights} from './scene/lights'
import {initCamera} from './scene/camera'
import {initRenderer} from './scene/renderer'

import {toRad, setText} from '../utils/utils'

import {
  fogPower,
  titleSize,
  cubeNumber, cubeDistance, cubeColor, cubeHandicap,
  cubeWidth, cubeHeight,
  vy, powerMultiplier,
  damping, power, angleMultiplier,
  cameraDistantion, cameraShift
} from './config'

let {requestAnimationFrame} = window
let contentWidth, contentHeight
let scene, renderer, rendererContainer

let time = null
let checkedPoints = 0

let camera
let lights = initLights()
let planes = initGround(titleSize)
let cubes = initCubes(
  cubeNumber,
  cubeDistance,
  cubeWidth,
  cubeHeight,
  cubeColor,
  cubeHandicap)

let loadBoard = initBoard()
let board = {
  model: null,
  alpha: 0,
  vx: 0,
  x: 0,
  y: 0,
  vy
}

let onScore = console.log

/* Controls */
export let setAlpha = newAlpha =>
  void (board.alpha = angleMultiplier * newAlpha)

export let start = () =>
  requestAnimationFrame(compute)

/* Scene */

let setCallback = fn =>
  void (onScore = fn)

let loadModels = () =>
  loadBoard
  .then(model =>
    void (board.model = model))

let addListeners = () => {
  window.addEventListener('resize', onWindowResized)
  onWindowResized()
}

export let initVisualisation = updateHUD => _ => {
  Promise.resolve(updateHUD)
  .then(setCallback)
  .then(loadModels)
  .then(prepareScene)
  .then(addListeners)
  .then(render)
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
  cubes.map(cube =>
    scene.add(cube))
  scene.fog = new THREE.FogExp2(0xffffff, fogPower)

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
  updateScene(angle, board.x, board.y)
  requestAnimationFrame(compute)
}

function updateScore (collision, y) {
  checkedPoints += 1 * collision
  let total =
    Math.max(0, parseInt((y - cubeHandicap) / cubeDistance))

  onScore({checkedPoints, total})
}

function updateScene (a, x, y) {
  updateGround(x, y)
  updateCubes(x, y, updateScore)
  setText('.angle', a.toFixed(2).padStart(5, '+'))

  board.model.position.x = x
  board.model.position.z = y
  board.model.rotation.z =
    (board.model.rotation.z + a) / 2

  camera.position.x = x + a * cameraShift
  camera.position.z = y - cameraDistantion

  render()
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
  render()
}
