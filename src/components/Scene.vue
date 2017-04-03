<script>
import { Scene } from 'three'
import Object3D from './Object3D'
import bus from '../bus'

export default {
  name: 'Scene',
  mixins: [Object3D],

  props: {
    obj: { type: Scene }
  },

  created () {
    this.curObj = this.obj
    if (!(this.curObj instanceof Scene)) {
      this.curObj = new Scene()
    }
    this.curObj.name = this.curObj.name || this.curObj.type
  },

  mounted () {
    bus.$emit('setScene', this.curObj)
  }
}
</script>
