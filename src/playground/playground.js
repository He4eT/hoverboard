import Peer from 'peerjs'

console.log('playground')

let peer = new Peer('playground', {key: '4cmlwdtxffphw7b9'})

let ball = document.getElementById('ball')

let x = 500
let v = 0
var a = 0

let phys = () => {
  v *= 0.8
  v += a * 0.8
  x += v

  ball.style.left = x + 'px'
  console.log(a, v, x)
}

peer.on('connection', conn => {
  conn.on('data', ({y}) => {
    console.log(y)
    a = y || 0
  })
})

setInterval(phys, 50)
