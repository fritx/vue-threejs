<template>
  <mesh name="Cube">
    <geometry type="Box" :args="[size, size, size]"></geometry>
    <material type="MeshBasic" :options="matOpts"></material>
  </mesh>
</template>

<script>
import { TextureLoader } from 'three'
import { Object3D } from '@'

export default {
  name: 'cube',
  mixins: [Object3D],
  props: { size: Number, texture: String },

  data () {
    let url = require(`@root/static/textures/${this.texture}.png`)
    let texture = new TextureLoader().load(url)
    return {
      matOpts: { map: texture }
    }
  }
}
</script>
