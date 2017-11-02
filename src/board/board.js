import {startSensors, drawPoint} from './sensors'
import Peer from 'peerjs'

console.log('board')

let peer = new Peer('board', {key: '4cmlwdtxffphw7b9'})
let conn = peer.connect('playground')

console.log(conn)

conn.on('open', () => {
  conn.send('hi!')
})

let onConnected = () => {
  let container = document.querySelector('.container')
  let point = document.querySelector('.point')

  startSensors((x, y) =>
    drawPoint(container, point, x, y))
}

onConnected()
