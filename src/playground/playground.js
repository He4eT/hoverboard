import {initVisualisation, setZ} from './visualisation'
import Peer from 'peerjs'

console.log('playground')

let peer = new Peer('playground', {key: '4cmlwdtxffphw7b9'})

window.onload = function () {
  initVisualisation()
}

peer.on('connection', conn => {
  conn.on('data', ({y}) => {
    console.log(y)
    setZ(-y || 0)
  })
})
