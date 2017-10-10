<template>
  <div>
    <mesh name="Ocean">
      <geometry type="Plane" :args="[10000, 10000, 40, 40]"
          :obj.sync="geom"></geometry>
      <material type="MeshBasic" :options="matOpts"></material>
    </mesh>
    <animation v-if="geomReady" :fn="animate" :speed="5"></animation>
  </div>
</template>

<script>
import { TextureLoader, RepeatWrapping } from 'three'
import { Object3D } from '@'

// http://threejs.org/examples/#webgl_geometry_dynamic
export default {
  name: 'Ocean',
  mixins: [Object3D],

  data () {
    // todo: texture child
    let texture = new TextureLoader().load(require('./water.jpg'))
    texture.wrapS = texture.wrapT = RepeatWrapping
    texture.repeat.set(5, 5)
    return {
      matOpts: { color: 0x0044ff, map: texture },
      geomReady: false,
      geom: null,
      ocean: null
    }
  },

  watch: {
    geom (g) {
      g.rotateX(-Math.PI / 2)
      for (let i = 0, l = g.vertices.length; i < l; i++) {
        g.vertices[ i ].y = 10 * Math.sin(i / 2)
      }
      this.geomReady = true
    }
  },

  methods: {
    animate (tt) {
      let g = this.geom
      for (let i = 0, l = g.vertices.length; i < l; i++) {
        g.vertices[i].y = 10 * Math.sin(i / 5 + (tt + i) / 7)
      }
      g.verticesNeedUpdate = true
    }
  }
}
</script>
