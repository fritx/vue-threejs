<template>
  <renderer :size="size">
    <dat-gui :setup="uiSetup" :model="ui"></dat-gui>
    <scene>
      <orbit-controls :position="ui.camera"
          :rotation="{ x: 2, y: 0, z: 3 }">
        <camera></camera>
        <audio-listener></audio-listener>
      </orbit-controls>
      <light :hex="0xefefff" :intensity="2" :position="{ x: 50, y: 50, z: 50 }"></light>
      <light :hex="0xefefff" :intensity="2" :position="{ x: -50, y: -50, z: -50 }"></light>
      <ocean :position="ui.ocean"></ocean>
      <sf03 :position="{ y: 10 }" :scale="ui.sf03.scale"></sf03>
      <positional-audio :position="{ y: 10 }" url="static/Project_Utopia.ogg"></positional-audio>

      <movement-system :key="ui.movemSysKey">
        <mass-object :rv0="{ x: 2, y: 2 }" :v0="{ x: 10 }"
            :f="{ x: -3, y: -2 }" :m="1">
          <cube texture="cobblestone" :size="1"></cube>
        </mass-object>
        <mass-object :rv0="{ x: 2, z: 2 }" :v0="{ z: 20 }"
            :f="{ y: -1, z: -8 }" :m="1.2">
          <cube texture="diamond" :size="1.2"></cube>
        </mass-object>
        <movement-object :rv0="{ x: 2, z: 2 }" :v0="{ x: 15, z: -20 }"
            :a="{ x: -6, y: .5, z: 6 }">
          <cube texture="redwool" :size="1.1"></cube>
        </movement-object>
      </movement-system>

      <oimo-world :options="{ gravity: [0, 2, 0] }">
        <oimo-body v-for="t in textures" :key="t" :options="{ move: true }">
          <cube :texture="t" :size="1"></cube>
        </oimo-body>
      </oimo-world>
    </scene>
  </renderer>
</template>

<script>
import * as gui from './gui'
import Ocean from './Ocean'
import SF03 from './SF03'
import Cube from './Cube'

export default {
  name: 'App',
  components: {
    Cube,
    Ocean,
    sf03: SF03
  },

  data () {
    let uiSetup = gui.setupPanel
    let ui = gui.getModel()
    return {
      textures: [
        'cobblestone', 'diamond', 'redwool'
      ],
      ui,
      uiSetup,
      size: {
        w: window.innerWidth,
        h: window.innerHeight
      }
    }
  },

  created () {
    // hack: loop animation via vue key prop
    setInterval(() => {
      this.ui.movemSysKey += 1
    }, 15000)
  }
}
</script>

<style>
body { margin: 0; overflow: hidden; }
</style>
