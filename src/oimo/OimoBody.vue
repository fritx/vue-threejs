<template>
  <div><slot></slot></div>
</template>

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
  },

  beforeDestroy () {
    this.body.dispose()
  }
}

// function radianToDegree (radian) {
//   return radian * (180 / Math.PI)
// }
</script>
