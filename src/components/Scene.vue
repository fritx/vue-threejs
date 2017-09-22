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

  data () {
    let curObj = this.obj
    if (!(curObj instanceof Scene)) {
      curObj = new Scene()
    }
    curObj.name = curObj.name || curObj.type
    return { curObj }
  },

  mounted () {
    bus.$emit('setScene', this.curObj)
  }
}
</script>
