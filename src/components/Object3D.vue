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
      assign(this.curObj.position, v)
    },
    rotation (v) {
      assign(this.curObj.rotation, v)
    }
  },

  data () {
    return {
      curObj: null
    }
  },

  computed: {
    parentObj () {
      const { curObj: parentObj } = this.$parent
      if (parentObj instanceof Object3D) {
        return parentObj
      }
      return null
    }
  },

  created () {
    // fix vue 2.0 `Avoid mutating a prop directly since the value will be overwritten
    // whenever the parent component re-renders. Instead, use a data or computed
    // property based on the prop's value.`
    // https://dotdev.co/peeking-into-vue-js-2-part-1-b457e60c88c6#.918arzkow
    this.curObj = this.obj

    // this.obj = new Object3D() // holder
    if (!(this.curObj instanceof Object3D)) {
      this.curObj = new Object3D()
    }

    // fix vue 2.0 `this.constructor.name` becomes `VueComponent`
    // this.curObj.name = this.curObj.name || this.constructor.name
    this.curObj.name = this.curObj.name || this.curObj.type
  },

  // ready => mounted + (nextTick?)
  // http://rc.vuejs.org/guide/migration.html#ready-deprecated
  mounted () {
    assign(this.curObj.position, this.position)
    assign(this.curObj.rotation, this.rotation)
    if (this.parentObj) {
      this.parentObj.add(this.curObj)
    }
  },

  // detached => destroyed + (nextTick?)
  // http://rc.vuejs.org/guide/migration.html#detached-deprecated
  // but we use beforeDestroy to clean up
  beforeDestroy () {
    if (this.parentObj) {
      this.parentObj.remove(this.curObj)
    }
  }
}
</script>
