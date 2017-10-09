<template>
  <div @vm-geometry="handleGeometry"
      @vm-material="handleMaterial">
    <slot></slot>
  </div>
</template>

<script>
import Object3D from '@/components/Object3D'

export default {
  name: 'Mesh',
  mixins: [Object3D],
  props: {
    type: { type: String, default: 'Mesh' }
  },

  methods: {
    handleGeometry (e) {
      e.stopPropagation()
      this.curObj.geometry = e.detail
    },
    handleMaterial (e) {
      e.stopPropagation()
      this.curObj.material = e.detail
    }
  }
}
</script>
