import Peer from 'peerjs'

console.log('playground')

let peer = new Peer('playground', {key: '4cmlwdtxffphw7b9'})

peer.on('connection', conn => {
  conn.on('data', console.log)
})
