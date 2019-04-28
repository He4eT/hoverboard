import {key} from './config'
import {
  showPIN,
  hidePIN,
  showHUD,
  updateHUD,
  updateAngle
} from './dom'

import {getPeerId} from '../utils/utils'

import {initVisualisation, setAlpha, start} from './visualisation'
import Peer from 'peerjs'

console.log('playground')

window.onload = initVisualisation({
  updateHUD,
  updateAngle})

let pin = getPeerId()
showPIN(pin)

let peerId = `hoverboard-playground-${pin}`
let peer = new Peer(peerId)

peer.on('connection', conn => {
  console.log('board:', conn.peer)

  hidePIN()
  showHUD()
  start()

  conn.on('data', ({y}) =>
    setAlpha(y || 0))
})
