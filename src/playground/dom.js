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
