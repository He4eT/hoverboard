import {key} from './config'
import {getPeerId, setText} from '../utils/utils'

import {initVisualisation, setAlpha, start} from './visualisation'
import Peer from 'peerjs'

console.log('playground')

let peerId = getPeerId()
let peer = new Peer(`playground${peerId}`, {key})

window.onload = () => {
  setText('.board-token', peerId)
  initVisualisation()
}

peer.on('connection', conn => {
  console.log('board:', conn.peer)

  setText('.board-token', '')
  showHUD()
  start()

  conn.on('data', ({y}) =>
    setAlpha(y || 0))
})

function showHUD () {
  let points = document.querySelector('.points')
  let angle = document.querySelector('.angle')

  points.style.visibility = 'visible'
  angle.style.visibility = 'visible'
}
