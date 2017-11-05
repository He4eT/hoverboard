import * as THREE from 'three'
import Peer from 'peerjs'

console.log('playground')

var rendererContainer;
var renderer;
var scene;
var camera;
var cube;
var contentWidth, contentHeight;

let peer = new Peer('playground', {key: '4cmlwdtxffphw7b9'})

window.onload = function() {
  init();
};


function init() {
  initGraphics();

  window.addEventListener('resize', onWindowResized);

  onWindowResized();

  requestAnimationFrame(render);
}


function initGraphics() {

  rendererContainer = document.getElementById('renderer');
  renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: true });
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  renderer.setClearColor(0x000000, 0.1);

  rendererContainer.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0x444444));


  camera = new THREE.PerspectiveCamera(60, contentWidth / contentHeight, 1, 100000);
  var cameraTarget = new THREE.Vector3( 0, 0, 0 );
  camera.position.set(0, 10, 20);
  camera.lookAt(cameraTarget);

  
  var light = new THREE.DirectionalLight(0xdfebff, 1);
  light.target.position.set(0, 0, 0);
  light.position.set(0, 200, 0);
  light.position.multiplyScalar(1.3);

  light.castShadow = true;
  light.shadowMapWidth = 1024;
  light.shadowMapHeight = 1024;
  var d = 400;
  light.shadowCameraLeft = -d;
  light.shadowCameraRight = d;
  light.shadowCameraTop = d;
  light.shadowCameraBottom = -d;

  light.shadowCameraFar = 1000;
  light.shadowDarkness = 0.5;
  scene.add(light);

  var n = 10;
  var cubeGeometry = new THREE.BoxGeometry(n, 0.2, 2);
  var material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
  cube = new THREE.Mesh(cubeGeometry, material);
  // cube.rotation.x = Math.PI / 4;
  cube.castShadow = true;

  scene.add(cube);

}


function updateWindowDimensions() {
  contentWidth = window.innerWidth;
  contentHeight = window.innerHeight;
}


function onWindowResized() {
  updateWindowDimensions();
  renderer.setSize( contentWidth, contentHeight );
  camera.aspect = contentWidth / contentHeight;
  camera.updateProjectionMatrix();
}


var lastTime = 0;
window.z = 0

function toRad (degrees) {
  return degrees * Math.PI / 180;
}

function render(t) {
  var delta = t - lastTime;

  cube.rotation.z -= delta * 0.01
  cube.rotation.z = toRad(window.z)
  // cube.translateZ(delta * 0.001)

  // camera.position.z -= delta * 0.01
  // debugger
  renderer.render(scene, camera);
  lastTime = t;
  requestAnimationFrame(render);
}

peer.on('connection', conn => {
  conn.on('data', ({y}) => {
    console.log(y)
    window.z = - y || 0
  })
})

