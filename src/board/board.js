import Peer from 'peerjs'
import NoSleep from 'nosleep.js'

import {startSensors, drawPoint} from './sensors'
import {getPeerId} from '../utils/utils'

let boardName = `board${getPeerId()}`
console.log(boardName)

let start = () => {
  void hideControls()

  let noSleep = new NoSleep()
  noSleep.enable()

  let peer = new Peer(boardName, {key: '4cmlwdtxffphw7b9'})
  let connection = peer.connect('playground')

  connection.on('open', () => {
    connection.send('start')
    onConnected(connection)
  })
}

let onConnected = (connection) => {
  let container = document.querySelector('.sensorContainer')
  let point = document.querySelector('.point')

  startSensors((x, y) => {
    connection.send({y})
    drawPoint(container, point, x, y)
  })
}

window.onload = () => {
  let startButton = document.querySelector('.start')
  startButton.addEventListener('click', start)
}

function hideControls () {
  let controls = document.querySelector('.controls')
  let sensorContainer = document.querySelector('.sensorContainer')

  controls.classList.add('hidden')
  sensorContainer.classList.remove('hidden')

  activateFullScreen()
}

function activateFullScreen () {
  let container = document.documentElement

  if (container.requestFullscreen) {
    container.requestFullscreen()
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen()
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen()
  }
}
