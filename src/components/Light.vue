<template>
  <object3d :obj="light"></object3d>
</template>

<script>
import * as THREE from 'three'
import Object3D from './Object3D'

export default {
  name: 'Light',
  mixins: [Object3D],
  components: { Object3D },

  props: {
    hex: Number,
    intensity: Number
  },

  created () {
    let { hex, intensity } = this
    this.light = new THREE.DirectionalLight(hex, intensity)
  }
}
</script>
