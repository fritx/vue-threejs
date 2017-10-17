<template>
  <object3d :position="pos" :rotation="rot">
    <slot></slot>
  </object3d>
</template>

<script>
import Object3D from '@/components/Object3D'

export default {
  name: 'MovementObject',
  mixins: [Object3D],
  components: { Object3D },
  inject: ['movemVms'],

  props: {
    a: Object,
    v0: Object,
    ra: Object,
    rv0: Object
  },

  data () {
    return {
      rot: { x: 0, y: 0, z: 0 },
      pos: { x: 0, y: 0, z: 0 },
      v: { ...this.v0 },
      rv: { ...this.rv0 }
    }
  },

  created () {
    this.movemVms.push(this)
  },

  beforeDestroy () {
    let index = this.movemVms.indexOf(this)
    if (index > -1) this.movemVms.splice(index, 1)
  }
}
</script>
