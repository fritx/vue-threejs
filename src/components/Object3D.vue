<template>
  <div><slot></slot></div>
</template>

<script>
import { Object3D } from 'three'
import { assign } from '../util'

export default {
  name: 'Object3D',

  provide () {
    return {
      parentObj: this.curObj
    }
  },

  inject: ['parentObj'],

  props: {
    obj: { type: Object3D },
    scale: { type: [Object, Number] }, // { x, y, z }
    position: { type: Object }, // { x, y, z }
    rotation: { type: Object } // { x, y, z }
  },

  watch: {
    scale: {
      deep: true,
      handler (v) {
        this.setScale(v)
      }
    },
    position: {
      deep: true,
      handler (v) {
        assign(this.curObj.position, v)
      }
    },
    rotation: {
      deep: true,
      handler (v) {
        assign(this.curObj.rotation, v)
      }
    }
  },

  data () {
    // fix vue 2.0 `Avoid mutating a prop directly since the value will be overwritten
    // whenever the parent component re-renders. Instead, use a data or computed
    // property based on the prop's value.`
    // https://dotdev.co/peeking-into-vue-js-2-part-1-b457e60c88c6#.918arzkow
    let curObj = this.obj

    // this.obj = new Object3D() // holder
    if (!(curObj instanceof Object3D)) {
      curObj = new Object3D()
    }

    // fix vue 2.0 `this.constructor.name` becomes `VueComponent`
    // curObj.name = curObj.name || this.constructor.name
    curObj.name = curObj.name || curObj.type

    return { curObj }
  },

  // ready => mounted + (nextTick?)
  // http://rc.vuejs.org/guide/migration.html#ready-deprecated
  mounted () {
    this.setScale(this.scale)
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
  },

  methods: {
    setScale (v) {
      if (v && typeof v === 'number') {
        v = { x: v, y: v, z: v }
      }
      assign(this.curObj.scale, v)
    }
  }
}
</script>
