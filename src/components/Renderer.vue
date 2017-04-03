<template>
  <div>
    <slot></slot>
    <div ref="container"></div>
  </div>
</template>

<script>
/* global requestAnimationFrame */
/* eslint-disable no-duplicate-imports */
import { WebGLRenderer } from 'three'
import * as THREE from 'three'

import bus from '../bus'

export default {
  name: 'Renderer',

  props: {
    size: {
      type: Object, // { w, h }
      required: true
    },
    obj: { type: WebGLRenderer }
  },

  data () {
    return {
      _obj: null
    }
  },

  created () {
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

    bus.$on('setScene', this.setScene)
    bus.$on('setCamera', this.setCamera)
  },

  mounted () {
    this.$refs.container.appendChild(this._obj.domElement)
    this.animate()
  },

  // It's good to clean up event listeners before
  // a component is destroyed.
  // http://rc.vuejs.org/guide/migration.html#ready-deprecated
  beforeDestroy () {
    bus.$off('setScene', this.setScene)
    bus.$off('setCamera', this.setCamera)
  },

  methods: {
    setScene (scene) {
      this.scene = scene

      // for threejs-inspector to work
      // https://github.com/jeromeetienne/threejs-inspector
      if (process.env.NODE_ENV === 'development') {
        window.THREE = THREE
        window.scene = scene
      }
    },
    setCamera (camera) {
      this.camera = camera
    },
    animate () {
      requestAnimationFrame(this.animate)
      this._obj.render(this.scene, this.camera)
    }
  }
}
</script>
