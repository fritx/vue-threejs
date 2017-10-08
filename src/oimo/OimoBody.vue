<script>
import Object3D from '@/components/Object3D'

export default {
  name: 'oimo-body',
  mixins: [Object3D],
  inject: ['world'],
  props: { options: Object },

  data () {
    return { body: null }
  },

  mounted () {
    let opts = {}
    Object.assign(opts, this.options)

    let body = this.world.add(opts)
    body.connectMesh(this.curObj)

    this.body = body
    this.dispatchEvent('vm-oimo-body', this)
  },

  beforeDestroy () {
    this.body.dispose()
    this.dispatchEvent('vm-oimo-body', null)
  }
}
</script>
