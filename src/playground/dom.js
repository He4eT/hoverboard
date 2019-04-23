import {
  showBySelector,
  hideBySelector,
  setText
} from '../utils/utils'

export let showHUD = () => {
  ['.points', '.angle']
  .map(showBySelector)
}

export let showPIN = peerId =>
  setText('.board-token', peerId)

export let hidePIN = () =>
  hideBySelector('.board-token')

export let updateHUD = ({checkedPoints, total}) => {
  setText('.check', checkedPoints.toString().padStart(3, '0'))
  setText('.all', total.toString().padStart(3, '0'))
}
