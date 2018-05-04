<script>
import Object3D from '@/components/Object3D'

export default {
  name: 'Mesh',
  mixins: [Object3D],
  props: {
    type: { type: String, default: 'Mesh' }
  },

  provide () {
    return { meshVm: this }
  }
}
</script>
