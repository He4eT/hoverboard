import * as THREE from 'three'

let rendererContainer
let renderer
let scene
let camera
let cube
let contentWidth, contentHeight


let board = { 
  alpha: 0,
  vx: 0,
  x: 0
}

let time = null

let {requestAnimationFrame} = window

export let setAlpha = newAlpha => {
  board.alpha = newAlpha
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
  scene.add(new THREE.AmbientLight(0x444444))

  camera = new THREE.PerspectiveCamera(60, contentWidth / contentHeight, 1, 100000)
  var cameraTarget = new THREE.Vector3(0, 0, 0)
  camera.position.set(0, 10, 20)
  camera.lookAt(cameraTarget)

  var light = new THREE.DirectionalLight(0xdfebff, 1)
  light.target.position.set(0, 0, 0)
  light.position.set(0, 200, 0)
  light.position.multiplyScalar(1.3)

  light.castShadow = true
  light.shadowMapWidth = 1024
  light.shadowMapHeight = 1024
  var d = 400
  light.shadowCameraLeft = -d
  light.shadowCameraRight = d
  light.shadowCameraTop = d
  light.shadowCameraBottom = -d

  light.shadowCameraFar = 1000
  light.shadowDarkness = 0.5
  scene.add(light)

  var n = 10
  var cubeGeometry = new THREE.BoxGeometry(n, 0.2, 2)
  var material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF })
  cube = new THREE.Mesh(cubeGeometry, material)
  cube.castShadow = true

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

function toRad (degrees) {
  return degrees * Math.PI / 180
}

function render () {
  renderer.render(scene, camera)
}

function compute (currentTime) {
  time = time || currentTime

  let angle = toRad(board.alpha)

  board.vx *= 0.5
  board.vx += Math.sin(angle)
  board.x += board.vx

  updateModel(angle, -board.x)
  
  render()

  time = currentTime
  requestAnimationFrame(compute)
}

function updateModel (a, x) {
  cube.rotation.z = a
  cube.position.x = x
}
