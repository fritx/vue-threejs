<script>
import * as THREE from 'three'
import Object3D from './Object3D'

export default {
  name: 'Light',
  mixins: [Object3D],

  props: {
    hex: Number,
    intensity: Number
  },

  data () {
    let curObj = this.obj
    if (!curObj) {
      curObj = new THREE.DirectionalLight(this.hex, this.intensity)
    }
    curObj.name = curObj.name || curObj.type
    return { curObj }
  }
}
</script>
