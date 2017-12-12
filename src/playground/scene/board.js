import * as THREE from 'three'
import {
  boardY
} from '../config'

import {load} from '../../utils/utils'

export let initBoard = boardSize => {
  return load('../models/board.json')
    .then(model => {
      let material = new THREE.MeshPhongMaterial({color: 0xaaaaaa})

      model.material = material
      model.position.y = boardY
      return model
    })
}
