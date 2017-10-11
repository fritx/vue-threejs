<template>
  <mesh name="Cube">
    <geometry type="Box" :args="[size, size, size]"></geometry>
    <material type="MeshBasic">
      <texture :url="texUrl"></texture>
    </material>
  </mesh>
</template>

<script>
import { Object3D } from '@'

export default {
  name: 'cube',
  mixins: [Object3D],
  props: { size: Number, texture: String },

  data () {
    return {
      texUrl: require(`@root/static/textures/${this.texture}.png`)
    }
  }
}
</script>
