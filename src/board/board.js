import Peer from 'peerjs'
import NoSleep from 'nosleep.js'

import {startSensors, drawPoint} from './sensors'

console.log('board')

let peer = new Peer('board', {key: '4cmlwdtxffphw7b9'})
// let connection

window.onload = () => {
  // let startButton = document.querySelector('.start')
  // startButton.addEventListener('click', () => {
    let connection = peer.connect('playground')

    connection.on('open', () => {
      connection.send('hi!')
      onConnected(connection)
    })
  // })
}

let onConnected = (connection) => {
  let noSleep = new NoSleep()
  noSleep.enable()
  alert(3)

  let container = document.querySelector('.container')
  let point = document.querySelector('.point')

  startSensors((x, y) => {
    connection.send({y})
    drawPoint(container, point, x, y)
  })
}
