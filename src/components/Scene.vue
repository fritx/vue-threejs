<template>
  <slot></slot>
</template>

<script>
import * as THREE from 'three'
import Object3D from './Object3D'

export default {
  mixins: [Object3D],

  props: {
    obj: { type: THREE.Scene }
  },

  created () {
    if (!(this.obj instanceof THREE.Scene)) {
      this.obj = new THREE.Scene()
    }
    this.obj.name = this.obj.name || this.constructor.name

    // for threejs-inspector to work
    // https://github.com/jeromeetienne/threejs-inspector
    if (process.env.NODE_ENV === 'development') {
      window.THREE = THREE
      window.scene = this.obj
    }
  },

  ready () {
    this.$dispatch('setScene', this.obj)
  }
}
</script>
