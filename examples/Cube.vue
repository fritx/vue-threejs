<template>
  <mesh name="Cube">
    <geometry type="Box" :args="[size, size, size]"></geometry>
    <material type="MeshBasic" :options="material"></material>
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
    let map = new TextureLoader().load(url)
    return { material: { map } }
  }
}
</script>
