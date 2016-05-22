<template>
  <slot></slot>
</template>

<script>
import THREE, { Scene } from 'three'
import Object3D from './Object3D'

export default {
  mixins: [Object3D],

  props: {
    obj: { type: Scene }
  },

  created () {
    if (!(this.obj instanceof Scene)) {
      this.obj = new Scene()
    }
    this.obj.name = this.obj.name || this.constructor.name
    window.scene = this.obj

    // for threejs-inspector to work
    // https://github.com/jeromeetienne/threejs-inspector
    if (process.env.NODE_ENV === 'development') {
      window.THREE = THREE
      // window.scene = this.obj
    }
  }
}
</script>
