<script>
import * as THREE from 'three'
import Object3D from './Object3D'
import bus from '../bus'

export default {
  name: 'Scene',

  mixins: [Object3D],

  props: {
    obj: { type: THREE.Scene }
  },

  created () {
    this._obj = this.obj

    if (!(this._obj instanceof THREE.Scene)) {
      this._obj = new THREE.Scene()
    }
    this._obj.name = this._obj.name || this._obj.type
  },

  mounted () {
    bus.$emit('setScene', this._obj)
  }
}
</script>
