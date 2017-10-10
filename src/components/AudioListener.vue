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
  inject: ['global'],

  data () {
    let listener = new AudioListener()
    this.global.audioListener = listener // fixme
    return { listener }
  }
}
</script>
