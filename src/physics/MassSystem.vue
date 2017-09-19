<template>
  <div>
    <slot></slot>
    <animation :fn="animate"></animation>
  </div>
</template>

<script>
import Animation from '@/components/Animation'
import Object3D from '@/components/Object3D'
import { $vec } from '@/util'

export default {
  name: 'mass-system',
  mixins: [Object3D],
  components: { Animation },

  provide () {
    return {
      massVms: this.vms
    }
  },

  data () {
    return { vms: [] }
  },

  // todo: via HTML native events
  methods: {
    animate (tt, dt) {
      this.vms.forEach(vm => {
        // acc
        vm.a = $vec.multiplyScalar(vm.sumF, 1 / vm.m)
      })
    }
  }
}
</script>
