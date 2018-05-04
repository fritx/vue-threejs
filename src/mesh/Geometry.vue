<script>
import Base from '@/components/Base'
import * as THREE from 'three'

export default {
  name: 'Geometry',
  mixins: [Base],
  inject: ['meshVm'],
  props: {
    args: { type: Array, default: () => [] },
    type: { type: String, default: '' }
  },

  data () {
    let mod = `${this.type}Geometry`
    let geometry = new THREE[mod](...this.args)
    return { geometry }
  },

  mounted () {
    this.meshVm.curObj.geometry = this.geometry
  },

  beforeDestroy () {
    this.meshVm.curObj.geometry = null
  }
}
</script>
