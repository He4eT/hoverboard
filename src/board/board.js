import Peer from 'peerjs'
import NoSleep from 'nosleep.js'

import {startSensors, drawPoint} from './sensors'

console.log('board')

let start = () => {
  // document.body.style.backgroundColor = 'red'
  let noSleep = new NoSleep()
  noSleep.enable()

  let peer = new Peer('board2', {key: '4cmlwdtxffphw7b9'})
  let connection = peer.connect('playground')

  connection.on('open', () => {
    connection.send('start')
    onConnected(connection)
  })
}

let onConnected = (connection) => {
  let container = document.querySelector('.container')
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
