import * as THREE from 'three'
import {initGround, updateGround} from './planes'
import {toRad} from './utils'

let rendererContainer
let renderer
let scene
let camera
let cube
let contentWidth, contentHeight

let board = {
  alpha: 0,
  vx: 0,
  x: 0,
  vy: 0.01,
  y: 0
}

let damping = 1
let power = 0
let angleMultiplier = 1
let time = null

let planes = initGround(1000)

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

export let start = params => {
  damping = params.damping
  power = params.power
  angleMultiplier = params.angleMultiplier
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
  initBoard(10)
  planes.map(plane => scene.add(plane))
}

function initCamera () {
  camera = new THREE.PerspectiveCamera(60, contentWidth / contentHeight, 1, 100000)
  let cameraTarget = new THREE.Vector3(0, 10, 0)
  camera.position.set(0, 20, -20)
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

function initBoard (n) {
  let cubeGeometry = new THREE.BoxGeometry(n, 0.2, 2)
  let material = new THREE.MeshPhongMaterial({color: 0xFFFFFF})
  cube = new THREE.Mesh(cubeGeometry, material)
  cube.castShadow = true
  cube.position.y = 2

  scene.add(cube)
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

  board.vx += ax * dt * power / 1000
  board.x += board.vx * dt // revers
  board.y += board.vy * dt // revers

  time = currentTime
  updateModel(angle, board.x, board.y)
  updateGround(board.x, 0)
  render()

  requestAnimationFrame(compute)
}

function updateModel (a, x, y) {
  camera.position.x = x + a * 5
  cube.position.x = x
  cube.rotation.z = (cube.rotation.z + a) / 2

  camera.position.z = y - 20
  cube.position.z = y
}
