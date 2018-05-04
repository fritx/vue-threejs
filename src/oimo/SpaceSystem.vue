<template>
  <div>
    <slot></slot>
    <animation :fn="uniGravity"></animation>
  </div>
</template>

<script>
import Animation from '@/components/Animation'

export default {
  name: 'space-system',
  components: { Animation },
  props: {
    mScale: { type: Number, default: 1 }
  },

  provide () {
    return { spaceVms: this.spaceVms }
  },

  data () {
    return { spaceVms: [] }
  },

  methods: {
    uniGravity () {
      // apply universal gracity
      // https://en.wikipedia.org/wiki/Gravitational_constant
      let G = 6.67408 * (10 ** -11)
      let arr = this.spaceVms
      let len = arr.length

      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len - i; j++) {
          let [vm1, vm2] = [i, j].map(k => arr[k])
          let [b1, b2] = [vm1, vm2].map(vm => vm.body)
          if (!b1 || !b2) continue

          let [m1, m2] = [b1, b2].map(b => b.mass)
          let [p1, p2] = [b1, b2].map(b => b.getPosition())
          let fv1 = p2.clone().sub(p1)
          let fvn1 = fv1.normalize()

          let r = fv1.length()
          let F = G * m1 * m2 / (r ** 2)
          F = F * (this.mScale ** 2) // scale

          let F1 = fvn1.clone().multiplyScalar(F)
          let F2 = F1.clone().negate()
          b1.applyImpulse(p1, F1)
          b2.applyImpulse(p2, F2)
        }
      }
    }
  }
}
</script>
