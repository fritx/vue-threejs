<template>
  <div><slot></slot></div>
</template>

<script>
import { Object3D } from 'three'
import { assign } from '../util'

export default {
  props: {
    obj: { type: Object3D },
    position: { type: Object }, // { x, y, z }
    rotation: { type: Object } // { x, y, z }
  },

  watch: {
    position (v) {
      if (v) assign(this.obj.position, v)
    },
    rotation (v) {
      if (v) assign(this.obj.rotation, v)
    }
  },

  data () {
    return {
      parent: this.$parent.obj instanceof Object3D
        ? this.$parent.obj : null
    }
  },

  created () {
    // this.obj = new Object3D() // holder
    if (!(this.obj instanceof Object3D)) {
      this.obj = new Object3D()
    }
    this.obj.name = this.obj.name || this.constructor.name
  },

  mounted () {
    if (this.position) assign(this.obj.position, this.position)
    if (this.rotation) assign(this.obj.rotation, this.rotation)
    if (this.parent) this.parent.add(this.obj)
  },

  beforeDestroy () {
    if (this.parent) this.parent.remove(this.obj)
  }
}
</script>
