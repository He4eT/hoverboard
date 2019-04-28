export let watchSensors = (handler) => {
  window.addEventListener('deviceorientation', (event) => {
    let x = event.beta
    let y = event.gamma

    if (x > 90) { x = 90 }
    if (x < -90) { x = -90 }

    handler(x, y)
  })
}
