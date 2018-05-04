<script>
import MovementObject from '@/physics/MovementObject'
import { $vec } from '@/util'
import Vue from 'vue'

export default {
  name: 'MassObject',
  mixins: [MovementObject],
  props: {
    f: Object,
    m: { type: Number, default: 1 }
  },

  data () {
    return {
      innerF: []
    }
  },

  computed: {
    a () {
      return $vec.multiplyScalar(this.sumF, 1 / this.m)
    },
    sumF () {
      let { f, innerF } = this
      f = Array.isArray(f) ? f : [f]
      let allF = [...f, ...innerF]
      let sumF = null
      allF.forEach(f => {
        sumF = $vec.add(sumF, f)
      })
      return sumF
    }
  },

  // hack: remove prop from super class
  // https://stackoverflow.com/questions/45680047/vuejs-extend-component-remove-parents-property
  beforeCreate () {
    Vue.delete(this.$options.props, 'a')
  }
}
</script>
