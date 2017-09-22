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

  data () {
    let curObj = this.obj

    const { w, h } = this.$root.__rendererSize // fixme
    if (!(curObj instanceof Camera)) {
      curObj = new PerspectiveCamera(75, w / h, 0.1, 1000)
    }
    curObj.name = curObj.name || curObj.type

    return { curObj }
  },

  mounted () {
    bus.$emit('setCamera', this.curObj)
  }
}
</script>
