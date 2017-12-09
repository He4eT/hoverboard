export function toRad (degrees) {
  return degrees * Math.PI / 180
}

export function getPeerName () {
  let time = new Date()
  let mmss = time.getMinutes().toString() +
    time.getSeconds().toString()

  let peerName = mmss[1] + mmss[3] + mmss[0] + mmss[2]
  return `pg${peerName}`
}
