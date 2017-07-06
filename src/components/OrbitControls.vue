<template>
  <object3d :rotation="{ y: Math.PI }">
    <slot></slot>
  </object3d>
</template>

<script>
/* global requestAnimationFrame, cancelAnimationFrame */
import _OrbitControls from '../threex/controls/OrbitControls'
import Object3D from './Object3D'
import { Clock } from 'three'

export default {
  name: 'OrbitControls',
  mixins: [Object3D],
  components: { Object3D },

  data () {
    return {
      controls: null,
      timer: null,
      frame: null
    }
  },

  mounted () {
    let domElement = this.$root.__rendererDom // fixme
    this.controls = new _OrbitControls(this.curObj, domElement)
    this.timer = new Clock()
    this.frame = this.animate()
  },

  beforeDestroy () {
    if (this.frame) {
      cancelAnimationFrame(this.frame)
    }
    if (this.controls) {
      this.controls.dispose()
    }
  },

  methods: {
    animate () {
      this.frame = requestAnimationFrame(this.animate)
      this.controls.update(this.timer.getDelta())
    }
  }
}
</script>
