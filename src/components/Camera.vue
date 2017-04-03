<script>
import { Camera, PerspectiveCamera } from 'three'
import Object3D from './Object3D'
import bus from '../bus'

export default {
  name: 'Camera',
  mixins: [Object3D],

  props: {
    obj: { type: Camera }
  },

  created () {
    this.curObj = this.obj

    const { w, h } = this.$root.__rendererSize // fixme
    if (!(this.curObj instanceof Camera)) {
      this.curObj = new PerspectiveCamera(75, w / h, 0.1, 1000)
    }
    this.curObj.name = this.curObj.name || this.curObj.type
  },

  mounted () {
    bus.$emit('setCamera', this.curObj)
  }
}
</script>
