import * as THREE from 'three'

import {initGround, updateGround} from './scene/planes'
import {initBoard} from './scene/board'
import {initLights} from './scene/lights'
import {initCamera} from './scene/camera'

import {toRad} from './utils'

import {
  titleSize,
  boardSize, vy, powerMultiplier,
  damping, power, angleMultiplier,
  cameraDistantion, cameraShift
} from './config'

let rendererContainer
let renderer
let scene

let contentWidth, contentHeight

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
  renderer.shadowMap.enabled = true
  renderer.shadowMapSoft = true
  renderer.setClearColor(0x000000, 0.1)

  rendererContainer.appendChild(renderer.domElement)

  scene = new THREE.Scene()

  camera = initCamera(contentWidth, contentHeight)
  scene.add(lights.ambientLight)
  scene.add(lights.light)

  scene.add(board.model)

  planes.map(plane => scene.add(plane))
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
