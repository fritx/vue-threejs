<template>
  <div><slot></slot></div>
</template>

<script>
import { Object3D } from 'three'
import { assign } from '../util'

export default {
  name: 'Object3D',

  props: {
    obj: { type: Object3D },
    position: { type: Object }, // { x, y, z }
    rotation: { type: Object } // { x, y, z }
  },

  watch: {
    position (v) {
      assign(this._obj.position, v)
    },
    rotation (v) {
      assign(this._obj.rotation, v)
    }
  },

  data () {
    return {
      _obj: null,
      parent: this.$parent._obj instanceof Object3D
        ? this.$parent._obj : null
    }
  },

  created () {
    // fix vue 2.0 `Avoid mutating a prop directly since the value will be overwritten
    // whenever the parent component re-renders. Instead, use a data or computed
    // property based on the prop's value.`
    // https://dotdev.co/peeking-into-vue-js-2-part-1-b457e60c88c6#.918arzkow
    this._obj = this.obj

    // this.obj = new Object3D() // holder
    if (!(this._obj instanceof Object3D)) {
      this._obj = new Object3D()
    }

    // fix vue 2.0 `this.constructor.name` becomes `VueComponent`
    // this._obj.name = this._obj.name || this.constructor.name
    this._obj.name = this._obj.name || this._obj.type
  },

  // ready => mounted + (nextTick?)
  // http://rc.vuejs.org/guide/migration.html#ready-deprecated
  mounted () {
    assign(this._obj.position, this.position)
    assign(this._obj.rotation, this.rotation)
    if (this.parent) this.parent.add(this._obj)
  },

  // detached => destroyed + (nextTick?)
  // http://rc.vuejs.org/guide/migration.html#detached-deprecated
  // but we use beforeDestroy to clean up
  beforeDestroy () {
    if (this.parent) this.parent.remove(this._obj)
  }
}
</script>
