import NoSleep from 'nosleep.js'

export let drawPoint =
(container, point, x, y) => {
  let pointRadius = point.clientWidth / 2

  var maxY = container.clientWidth - 2 * pointRadius
  var maxX = container.clientHeight - 2 * pointRadius

  x = 90 - x
  y = 90 - y

  let translate = (max, value) =>
    max * value / 180 - pointRadius

  point.style.top = `${translate(maxX, x)}px`
  point.style.left = `${translate(maxY, y)}px`
}

export let hideControls = () => {
  let controls = document.querySelector('.controls')
  let sensorContainer = document.querySelector('.sensorContainer')

  controls.classList.add('hidden')
  sensorContainer.classList.remove('hidden')
}

export let activateFullScreen = () => {
  let container = document.documentElement

  if (container.requestFullscreen) {
    container.requestFullscreen()
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen()
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen()
  }
}

export let preventSleep = () => {
  let noSleep = new NoSleep()
  noSleep.enable()
}
