<template>
  <div>
    <object3d v-if="audio" :obj="audio"></object3d>
  </div>
</template>

<script>
import { PositionalAudio } from 'three'
import Object3D from './Object3D'

export default {
  name: 'PositionalAudio',
  mixins: [Object3D],
  components: { Object3D },
  inject: ['global'],
  props: { url: String },

  data () {
    return { audio: null }
  },

  // mounted to ensure audioListener
  mounted () {
    let listener = this.global.audioListener // fixme
    let audio = new PositionalAudio(listener)
    audio.name = 'PositionalAudio'
    this.audio = audio

    // fixme: r76?
    // https://github.com/mrdoob/three.js/blob/master/examples/misc_sound.html
    // audioLoader.load(props.url, function (buffer) {
    // r75:
    audio.load(this.url)
    audio.autoplay = true
    audio.setLoop(true)
    audio.setVolume(0.5)
    audio.setRefDistance(10)
    // audio.setBuffer(buffer)
    // audio.play()
    // })
  }
}
</script>
