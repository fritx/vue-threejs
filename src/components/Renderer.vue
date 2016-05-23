<template>
  <slot></slot>
  <div v-el:container></div>
</template>

<script>
/* global requestAnimationFrame */
import { WebGLRenderer } from 'three'

export default {
  props: {
    dim: {
      type: Object, // { width, height }
      required: true
    },
    obj: { type: WebGLRenderer }
  },

  created () {
    this.animate = this.animate.bind(this)
    if (!(this.obj instanceof WebGLRenderer)) {
      this.obj = new WebGLRenderer({ antialias: true })
    }
    this.obj.name = this.obj.name || this.constructor.name
    this.obj.setSize(this.dim.width, this.dim.height)
    this.obj.setClearColor(0x000000)
  },

  ready () {
    this.$els.container.appendChild(this.obj.domElement)
    this.animate()
  },

  methods: {
    animate () {
      requestAnimationFrame(this.animate)
      // this.obj.render(this.scene, this.camera)
      this.obj.render(window.scene, window.camera)
    }
  }
}
</script>
