<template>
  <div>
    <slot></slot>
    <animation v-if="world" :fn="animate"></animation>
  </div>
</template>

<script>
import * as Oimo from 'oimo'

export default {
  name: 'oimo-world',
  provide () {
    return { world: this.world }
  },
  props: { options: Object },

  data () {
    let opts = {
      gravity: [0, 0, 0] // no gravity as default
    }
    Object.assign(opts, this.options)

    let world = new Oimo.World(opts)
    return { world }
  },

  destroyed () {
    this.world.clear()
  },

  methods: {
    animate () {
      this.world.step()
    }
  }
}
</script>
