import {startSensors, drawPoint} from './sensors'
import Peer from 'peerjs'

console.log('board')

let peer = new Peer('board', {key: '4cmlwdtxffphw7b9'})
let conn = peer.connect('playground')

conn.on('open', () => {
  conn.send('hi!')
  onConnected(conn)
})

let onConnected = (conn) => {
  let container = document.querySelector('.container')
  let point = document.querySelector('.point')

  startSensors((x, y) => {
    conn.send({y})
    drawPoint(container, point, x, y)
  })
}
