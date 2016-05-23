<template>
  <slot></slot>
</template>

<script>
import { Camera, PerspectiveCamera } from 'three'
import Object3D from './Object3D'

export default {
  mixins: [Object3D],

  props: {
    dim: {
      type: Object, // { width, height }
      required: true
    },
    obj: {
      type: Camera
    }
  },

  created () {
    const { width, height } = this.dim
    if (!(this.obj instanceof Camera)) {
      this.obj = new PerspectiveCamera(75, width / height, 0.1, 1000)
    }
    this.obj.name = this.obj.name || this.constructor.name
    window.camera = this.obj
  }
}
</script>
