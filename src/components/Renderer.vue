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
    this._obj = this.obj

    if (!(this._obj instanceof WebGLRenderer)) {
      this._obj = new WebGLRenderer({ antialias: true })
    }
    this._obj.name = this._obj.name || this._obj.type
    this._obj.setSize(this.size.w, this.size.h)
    this.$root.__rendererSize = this.size // fixme

    this._obj.setClearColor(0x000000)
    this.scene = null
    this.camera = null
  },

  mounted () {
    this.$els.container.appendChild(this._obj.domElement)
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
      this._obj.render(this.scene, this.camera)
    }
  }
}
</script>
