<script>
/* global requestAnimationFrame */
import * as THREE from 'three'
import Object3D from '../components/Object3D'

// http://threejs.org/examples/#webgl_geometry_dynamic
export default {
  name: 'Ocean',

  mixins: [Object3D],

  created () {
    this.clock = new THREE.Clock()
    this._obj = this.createOcean()
  },

  mounted () {
    this.animate()
  },

  methods: {
    createOcean () {
      const geometry = new THREE.PlaneGeometry(10000, 10000, 40, 40)
      geometry.rotateX(-Math.PI / 2)
      for (let i = 0, l = geometry.vertices.length; i < l; i++) {
        geometry.vertices[ i ].y = 10 * Math.sin(i / 2)
      }

      const texture = new THREE.TextureLoader().load(require('./water.jpg'))
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(5, 5)
      const material = new THREE.MeshBasicMaterial({ color: 0x0044ff, map: texture })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.name = 'Ocean'
      return mesh
    },

    animate () {
      requestAnimationFrame(this.animate)
      const time = this.clock.getElapsedTime() * 5
      for (let i = 0, l = this._obj.geometry.vertices.length; i < l; i++) {
        this._obj.geometry.vertices[i].y = 10 * Math.sin(i / 5 + (time + i) / 7)
      }
      this._obj.geometry.verticesNeedUpdate = true
    }
  }
}
</script>
