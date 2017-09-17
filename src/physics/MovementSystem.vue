<template>
  <object3d>
    <slot></slot>
    <animation :fn="animate"></animation>
  </object3d>
</template>

<script>
import Animation from '@/components/Animation'
import Object3D from '@/components/Object3D'
import { $vec } from '@/util'

export default {
  name: 'movement-system',
  mixins: [Object3D],
  components: { Object3D, Animation },

  provide () {
    return {
      movemVms: this.vms
    }
  },

  data () {
    return { vms: [] }
  },

  methods: {
    animate (tt, dt) {
      this.vms.forEach(vm => {
        // position
        let dv = $vec.multiplyScalar(vm.a, dt)
        vm.v = $vec.add(vm.v, dv)
        let dx = $vec.multiplyScalar(vm.v, dt)
        vm.pos = $vec.add(vm.pos, dx)
        // rotation
        let drv = $vec.multiplyScalar(vm.ra, dt)
        vm.rv = $vec.add(vm.rv, drv)
        let drx = $vec.multiplyScalar(vm.rv, dt)
        vm.rot = $vec.add(vm.rot, drx)
      })
    }
  }
}
</script>
