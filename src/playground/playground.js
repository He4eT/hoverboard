import {initVisualisation, setAlpha, start} from './visualisation'
import Peer from 'peerjs'

console.log('playground')

let peer = new Peer('playground', {key: '4cmlwdtxffphw7b9'})

window.onload = function () {
  initVisualisation()
  // show labels
}

peer.on('connection', conn => {
	console.log('board:', conn.peer)

	// show countdown
	// wait
	start({
		damping: 0.9,
		power: 5
	})

  conn.on('data', ({y}) => {
    console.log(y)
    setAlpha(-y || 0)
  })
})

function getPeerName () {
	let time = new Date()
	let mmss = time.getMinutes().toString()
		+ time.getSeconds().toString()
	
	let peerName = mmss[1] + mmss[3] + mmss[0] + mmss[2]
	return `pg${peerName}`
}