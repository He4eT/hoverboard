import Peer from 'peerjs'

import {watchSensors} from './sensors'
import {
  drawPoint,
  hideControls,
  activateFullScreen,
  preventSleep
} from './dom'

import {get} from '../utils/utils'

let start = () => {
  void hideControls()
  void activateFullScreen()
  void preventSleep()

  let boardPin = get('.token').value
  let boardId = `hoverboard-playground-${boardPin}`

  connect(boardId)
}

let connect = boardId => {
  let peer = new Peer()
  let connection = peer.connect(boardId)

  connection.on('open', () => {
    console.log('playground:', connection.peer)
    connection.send('start')
    onConnected(connection)
  })
}

let onConnected = connection => {
  let container = get('.sensorContainer')
  let point = get('.point')

  watchSensors((x, y) => {
    connection.send({y})
    drawPoint(container, point, x, y)
  })
}

window.onload = () => {
  let startButton = get('.start')
  startButton.addEventListener('click', start)
}
