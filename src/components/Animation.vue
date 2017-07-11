<template>
  <div><slot></slot></div>
</template>

<script>
/* global requestAnimationFrame */
/* global cancelAnimationFrame */
import { Clock } from 'three'

export default {
  name: 'Animation',

  props: {
    blocked: { type: Boolean },
    paused: { type: Boolean },
    speed: { type: Number, default: 1 },
    fn: { type: Function, required: true }
  },

  data () {
    return {
      clock: new Clock(!this.paused),
      ht: 0,
      tt: 0,
      frame: null
    }
  },

  mounted () {
    this.begin()
  },
  beforeDestroy () {
    this.end()
  },

  watch: {
    paused (v) {
      if (v) {
        this.clock.stop()
      } else {
        this.clock.start()
      }
    }
  },

  methods: {
    begin () {
      this.frame = requestAnimationFrame(this.begin)
      let dt = this.clock.getDelta()
      dt *= this.speed
      this.tt += dt
      this.ht += dt
      if (!this.blocked) {
        this.fn(this.tt, this.ht)
        this.ht = 0
      }
    },
    end () {
      this.clock.stop()
      if (this.frame) {
        cancelAnimationFrame(this.frame)
      }
    }
  }
}
</script>
