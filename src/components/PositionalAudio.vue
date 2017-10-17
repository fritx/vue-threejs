<template>
  <div>
    <object3d v-if="audio" :obj="audio"></object3d>
  </div>
</template>

<script>
import { PositionalAudio, AudioLoader } from 'three'
import Object3D from './Object3D'

export default {
  name: 'PositionalAudio',
  mixins: [Object3D],
  components: { Object3D },

  inject: [
    ...Object3D.inject,
    'global'
  ],

  props: {
    refDistance: { type: Number, default: 10 },
    volume: { type: Number, default: 1 },
    paused: Boolean,
    loop: Boolean,
    url: String
  },

  data () {
    return { audio: null }
  },

  watch: {
    paused (v) {
      if (this.audio) {
        if (v) this.audio.pause()
        else this.audio.play()
      }
    }
  },

  // mounted to ensure audioListener
  mounted () {
    let listener = this.global.audioListener // fixme
    let audio = new PositionalAudio(listener)
    audio.name = 'PositionalAudio'
    audio.setRefDistance(this.refDistance)
    audio.setVolume(this.volume)
    audio.setLoop(this.loop)

    new AudioLoader().load(this.url, buffer => {
      audio.setBuffer(buffer)
      if (!this.paused) audio.play()
    })
    this.audio = audio
  },

  beforeDestroy () {
    this.audio.stop()
  }
}
</script>
