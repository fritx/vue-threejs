<template>
  <object3d :obj="listener" :position="position"></object3d>
</template>

<script>
import { AudioListener } from 'three'
import Object3D from './Object3D'

export default {
  name: 'AudioListener',
  mixins: [Object3D],
  components: { Object3D },

  data () {
    return { listener: null }
  },

  created () {
    let listener = new AudioListener()
    this.listener = listener
    this.$root.__audioListener = listener // fixme
  }
}
</script>
