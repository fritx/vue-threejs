<template>
  <div>
    <slot></slot>
    <div v-el:container></div>
  </div>
</template>

<script>
/* global requestAnimationFrame */
import { WebGLRenderer } from 'three'

export default {
  props: {
    size: {
      type: Object, // { w, h }
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
    this.obj.setSize(this.size.w, this.size.h)
    this.$root.__rendererSize = this.size // fixme

    this.obj.setClearColor(0x000000)
    this.scene = null
    this.camera = null
  },

  ready () {
    this.$els.container.appendChild(this.obj.domElement)
    this.animate()
  },

  events: {
    setScene (scene) {
      this.scene = scene
    },
    setCamera (camera) {
      this.camera = camera
    }
  },

  methods: {
    animate () {
      requestAnimationFrame(this.animate)
      this.obj.render(this.scene, this.camera)
    }
  }
}
</script>
