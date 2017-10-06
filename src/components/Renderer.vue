<template>
  <div>
    <slot></slot>
    <div ref="container"></div>
  </div>
</template>

<script>
/* global requestAnimationFrame */
import { WebGLRenderer } from 'three'

export default {
  name: 'Renderer',

  provide () {
    return {
      parentObj: null, // avoid "injection not found" warning
      global: this.global
    }
  },

  props: {
    size: {
      type: Object, // { w, h }
      required: true
    },
    obj: { type: Object }
  },

  data () {
    let curObj = this.obj

    if (!curObj) {
      curObj = new WebGLRenderer({ antialias: true })
      curObj.setClearColor(0x000000)
    }
    curObj.name = curObj.name || curObj.type
    curObj.setSize(this.size.w, this.size.h)

    // fixme: better solution for global vars
    let global = {}
    global.rendererSize = this.size
    global.rendererDom = curObj.domElement

    return { curObj, global }
  },

  mounted () {
    this.$refs.container.appendChild(this.curObj.domElement)
    this.animate()
  },

  methods: {
    animate () {
      requestAnimationFrame(this.animate)
      this.curObj.render(this.global.scene, this.global.camera)
    }
  }
}
</script>
