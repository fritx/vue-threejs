<style>
  body { margin: 0; overflow: hidden; }
</style>

<template>
  <renderer :size="size">
    <scene>
      <orbit-controls :position="{ x: 9, y: 21, z: 20 }"
          :rotation="{ x: 2, y: 0, z: 3 }">
        <camera></camera>
        <audio-listener></audio-listener>
      </orbit-controls>
      <light :hex="0xefefff" :intensity="2" :position="{ x: 50, y: 50, z: 50 }"></light>
      <light :hex="0xefefff" :intensity="2" :position="{ x: -50, y: -50, z: -50 }"></light>
      <ocean :position="{ y: -200 }"></ocean>
      <sf03 :position="{ y: 10 }"></sf03>
      <positional-audio :position="{ y: 10 }" url="static/Project_Utopia.ogg"></positional-audio>
    </scene>
  </renderer>
</template>

<script>
import PositionalAudio from '../components/PositionalAudio'
import OrbitControls from '../components/OrbitControls'
import Ocean from './Ocean'
import SF03 from './SF03'

export default {
  name: 'App',
  components: {
    PositionalAudio,
    OrbitControls,
    Ocean,
    sf03: SF03
  },

  data () {
    return {
      size: {
        w: window.innerWidth,
        h: window.innerHeight
      }
    }
  }
}
</script>
