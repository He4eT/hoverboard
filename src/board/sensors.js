export let startSensors = (handler) => {
  window.addEventListener('deviceorientation', (event) => {
    let x = event.beta
    let y = event.gamma

    if (x > 90) { x = 90 }
    if (x < -90) { x = -90 }

    handler(x, y)
  })
}

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
