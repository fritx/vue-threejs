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

  data () {
    let { hex, intensity } = this
    let light = new THREE.DirectionalLight(hex, intensity)
    return { light }
  }
}
</script>
