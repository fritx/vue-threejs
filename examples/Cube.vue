<template>
  <object3d :obj="cube"></object3d>
</template>

<script>
import { Object3D } from '@'
import * as THREE from 'three'

export default {
  name: 'cube',
  mixins: [Object3D],

  props: { size: Number, texture: String },

  created () {
    let { size, texture } = this
    let map = new THREE.TextureLoader()
      .load(require(`@root/static/textures/${texture}.png`))
    let geometry = new THREE.BoxGeometry(size, size, size)
    let material = new THREE.MeshBasicMaterial({ map })
    let cube = new THREE.Mesh(geometry, material)
    cube.name = 'Cube'
    this.cube = cube
  }
}
</script>
