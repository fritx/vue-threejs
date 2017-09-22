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
      global: this.global
    }
  },

  props: {
    size: {
      type: Object, // { w, h }
      required: true
    },
    obj: { type: WebGLRenderer }
  },

  data () {
    let curObj = this.obj

    if (!(curObj instanceof WebGLRenderer)) {
      curObj = new WebGLRenderer({ antialias: true })
    }
    curObj.name = curObj.name || curObj.type
    curObj.setSize(this.size.w, this.size.h)

    // fixme: better solution for global vars
    let global = {}
    global.rendererSize = this.size
    global.rendererDom = curObj.domElement
    curObj.setClearColor(0x000000)

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
