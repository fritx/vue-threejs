<script>
import Base from '@/components/Base'
import * as THREE from 'three'

export default {
  name: 'Material',
  mixins: [Base],
  props: {
    options: { type: Object, default: () => {} },
    type: { type: String, default: '' }
  },

  data () {
    let mod = `${this.type}Material`
    let material = new THREE[mod](this.options)
    return { material }
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
