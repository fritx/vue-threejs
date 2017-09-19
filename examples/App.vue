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

      <movement-system :key="movemSysKey">
        <mass-system>
          <mass-object :rv0="{ x: 2, y: 2 }" :v0="{ x: 10 }"
              :f="{ x: -3, y: -2 }" :m="1">
            <cube texture="cobblestone" :size="1"></cube>
          </mass-object>
          <mass-object :rv0="{ x: 2, z: 2 }" :v0="{ z: 20 }"
              :f="{ y: -1, z: -8 }" :m="1.2">
            <cube texture="diamond" :size="1.2"></cube>
          </mass-object>
        </mass-system>
        <movement-object :rv0="{ x: 2, z: 2 }" :v0="{ x: 15, z: -20 }"
            :a="{ x: -6, y: .5, z: 6 }">
          <cube texture="redwool" :size="1.1"></cube>
        </movement-object>
      </movement-system>
    </scene>
  </renderer>
</template>

<script>
import PositionalAudio from '@/components/PositionalAudio'
import OrbitControls from '@/components/OrbitControls'
import MovementSystem from '@/physics/MovementSystem'
import MovementObject from '@/physics/MovementObject'
import MassSystem from '@/physics/MassSystem'
import MassObject from '@/physics/MassObject'
import Ocean from './Ocean'
import SF03 from './SF03'
import Cube from './Cube'

export default {
  name: 'App',
  components: {
    MovementSystem,
    MovementObject,
    MassSystem,
    MassObject,
    PositionalAudio,
    OrbitControls,
    Cube,
    Ocean,
    sf03: SF03
  },

  data () {
    return {
      movemSysKey: 1,
      size: {
        w: window.innerWidth,
        h: window.innerHeight
      }
    }
  },

  created () {
    // hack: loop animation via vue key prop
    setInterval(() => {
      this.movemSysKey += 1
    }, 15000)
  }
}
</script>
