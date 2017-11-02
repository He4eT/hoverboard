import {startSensors, drawPoint} from './sensors'

console.log('board')

let onConnected = () => {
  let container = document.querySelector('.container')
  let point = document.querySelector('.point')

  startSensors((x, y) =>
    drawPoint(container, point, x, y))
}

onConnected()
