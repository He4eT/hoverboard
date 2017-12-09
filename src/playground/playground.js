import {
  key
} from './config'

import {initVisualisation, setAlpha, start} from './visualisation'
import Peer from 'peerjs'

console.log('playground')

let peer = new Peer('playground', {key})

window.onload = initVisualisation

peer.on('connection', conn => {
  console.log('board:', conn.peer)

  // show countdown
  // wait
  start()

  conn.on('data', ({y}) =>
    setAlpha(y || 0))
})
