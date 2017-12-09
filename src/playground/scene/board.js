import * as THREE from 'three'
import {
  boardY
} from '../config'

export let initBoard = boardSize => {
  let boardGeometry = new THREE.BoxGeometry(
    boardSize,
    boardSize * 0.02,
    boardSize * 0.2)

  let material = new THREE.MeshPhongMaterial({color: 0xaaaaaa})

  let board = new THREE.Mesh(boardGeometry, material)
  board.castShadow = true
  board.position.y = boardY

  return board
}
