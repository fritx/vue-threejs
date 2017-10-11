<script>
import Base from '@/components/Base'
import * as THREE from 'three'

export default {
  name: 'Material',
  mixins: [Base],
  props: {
    options: { type: Object, default: () => ({}) },
    color: { type: Number },
    type: { type: String, default: '' }
  },

  data () {
    let mod = `${this.type}Material`
    let opts = { ...this.options }
    if (this.color) opts.color = this.color
    let material = new THREE[mod](opts)
    return { material }
  },
  provide () {
    return { material: this.material }
  },

  mounted () {
    this.$nextTick(() => {
      this.dispatchEvent('vm-material', this.material)
    })
  },
  beforeDestroy () {
    this.dispatchEvent('vm-material', null)
  }
}
</script>
