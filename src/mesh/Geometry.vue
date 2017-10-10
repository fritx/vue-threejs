<script>
import Base from '@/components/Base'
import * as THREE from 'three'

export default {
  name: 'Geometry',
  mixins: [Base],
  props: {
    obj: { type: Object },
    args: { type: Array, default: () => [] },
    type: { type: String, default: '' }
  },

  data () {
    let mod = `${this.type}Geometry`
    let geometry = new THREE[mod](...this.args)
    return { geometry }
  },

  mounted () {
    this.$emit('update:obj', this.geometry)
    this.$nextTick(() => {
      this.dispatchEvent('vm-geometry', this.geometry)
    })
  },

  beforeDestroy () {
    this.dispatchEvent('vm-geometry', null)
    this.$emit('update:obj', null)
  }
}
</script>
