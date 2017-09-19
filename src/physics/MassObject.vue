<script>
import MovementObject from '@/physics/MovementObject'
import { $vec } from '@/util'
import Vue from 'vue'

export default {
  name: 'mass-object',
  mixins: [MovementObject],

  // Vue provide/inject not inherited??
  inject: [
    ...MovementObject.inject,
    'massVms'
  ],

  props: {
    f: Object,
    m: { type: Number, default: 1 }
  },

  data () {
    return {
      a: null,
      innerF: []
    }
  },

  computed: {
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
  },

  created () {
    this.massVms.push(this)
  },

  beforeDestroy () {
    let index = this.massVms.indexOf(this)
    if (index > -1) this.massVms.splice(index, 1)
  }
}
</script>
