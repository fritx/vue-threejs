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
      curObj: null
    }
  },

  created () {
    this.curObj = this.obj

    if (!(this.curObj instanceof WebGLRenderer)) {
      this.curObj = new WebGLRenderer({ antialias: true })
    }
    this.curObj.name = this.curObj.name || this.curObj.type
    this.curObj.setSize(this.size.w, this.size.h)
    this.$root.__rendererSize = this.size // fixme

    this.curObj.setClearColor(0x000000)
    this.scene = null
    this.camera = null

    bus.$on('setScene', this.setScene)
    bus.$on('setCamera', this.setCamera)
  },

  mounted () {
    this.$refs.container.appendChild(this.curObj.domElement)
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
      this.curObj.render(this.scene, this.camera)
    }
  }
}
</script>
