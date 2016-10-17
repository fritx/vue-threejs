<template>
  <div><slot></slot></div>
</template>

<script>
import { Camera, PerspectiveCamera } from 'three'
import Object3D from './Object3D'
import bus from '../bus'

export default {
  name: 'Camera',

  mixins: [Object3D],

  props: {
    obj: { type: Camera }
  },

  created () {
    this._obj = this.obj

    const { w, h } = this.$root.__rendererSize // fixme
    if (!(this._obj instanceof Camera)) {
      this._obj = new PerspectiveCamera(75, w / h, 0.1, 1000)
    }
    this._obj.name = this._obj.name || this.constructor.name
  },

  mounted () {
    bus.$emit('setCamera', this._obj)
  }
}
</script>
