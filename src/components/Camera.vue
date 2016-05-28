<template>
  <slot></slot>
</template>

<script>
import { Camera, PerspectiveCamera } from 'three'
import Object3D from './Object3D'

export default {
  mixins: [Object3D],

  props: {
    obj: { type: Camera }
  },

  created () {
    const { w, h } = this.$root.__rendererSize // fixme
    if (!(this.obj instanceof Camera)) {
      this.obj = new PerspectiveCamera(75, w / h, 0.1, 1000)
    }
    this.obj.name = this.obj.name || this.constructor.name
  },

  ready () {
    this.$dispatch('setCamera', this.obj)
  }
}
</script>
