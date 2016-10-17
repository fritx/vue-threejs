<template>
  <div><slot></slot></div>
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
    this._obj = this.obj

    if (!(this._obj instanceof THREE.Scene)) {
      this._obj = new THREE.Scene()
    }
    this._obj.name = this._obj.name || this.constructor.name

    // for threejs-inspector to work
    // https://github.com/jeromeetienne/threejs-inspector
    if (process.env.NODE_ENV === 'development') {
      window.THREE = THREE
      window.scene = this._obj
    }
  },

  mounted () {
    this.$dispatch('setScene', this._obj)
  }
}
</script>
