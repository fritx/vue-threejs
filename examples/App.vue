<template>
  <renderer :size="size">
    <div ref="panel" class="panel"></div>
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

      <movement-system :key="movemSysKey">
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
    </scene>
  </renderer>
</template>

<script>
import PositionalAudio from '@/components/PositionalAudio'
import OrbitControls from '@/components/OrbitControls'
import MovementSystem from '@/physics/MovementSystem'
import MovementObject from '@/physics/MovementObject'
import MassObject from '@/physics/MassObject'
import Ocean from './Ocean'
import SF03 from './SF03'
import Cube from './Cube'
import { GUI } from 'dat.gui/build/dat.gui.min'

export default {
  name: 'App',
  components: {
    MovementSystem,
    MovementObject,
    MassObject,
    PositionalAudio,
    OrbitControls,
    Cube,
    Ocean,
    sf03: SF03
  },

  data () {
    return {
      ui: {
        camera: {
          x: 9, y: 21, z: 20
        },
        ocean: {
          y: -200
        },
        sf03: {
          scale: 1
        },
        replay: () => {
          this.movemSysKey += 1
        }
      },
      gui: null,
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
  },

  mounted () {
    let { ui } = this
    let gui = new GUI({ autoPlace: false })
    let fc = gui.addFolder('Camera')
    fc.add(ui.camera, 'x', -50, 50).step(.01)
    fc.add(ui.camera, 'y', -50, 50).step(.01)
    fc.add(ui.camera, 'z', -50, 50).step(.01)
    fc.open()
    let fo = gui.addFolder('Ocean')
    fo.add(ui.ocean, 'y', -250, 10).step(.01)
    fo.open()
    let fs = gui.addFolder('SF03')
    fs.add(ui.sf03, 'scale', 0.1, 7).step(0.01)
    fs.open()
    gui.add(ui, 'replay')
    this.$refs.panel.appendChild(gui.domElement)
    this.gui = gui
  },

  beforeDestroy () {
    this.$refs.panel.removeChild(this.gui.domElement)
  }
}
</script>

<style>
body { margin: 0; overflow: hidden; }
.dg.main { user-select: none; }
</style>

<style scoped>
.panel { position: absolute; right: 0 }
</style>
