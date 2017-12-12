import * as THREE from 'three'
import {
  boardY, boardColor
} from '../config'

import {load} from '../../utils/utils'

export let initBoard = () => {
  return load('../models/board.json')
    .then(model => {
      let material = new THREE.MeshPhongMaterial({color: boardColor})
      let board = new THREE.Mesh(model, material)
      board.position.y = boardY
      return board
    })
}
