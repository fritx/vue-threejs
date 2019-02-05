<script>
import Base from '@/components/Base'
import * as THREE from 'three'

export default {
  name: 'Object3D',
  mixins: [Base],

  provide () {
    return {
      parentObj: this.curObj
    }
  },
  inject: {
    parentObj: { name: 'parentObj', default: null }
  },

  props: {
    name: { type: String },
    type: { type: String, default: 'Object3D' },
    obj: { type: Object },
    scale: { type: [Object, Number] }, // { x, y, z }
    position: { type: Object }, // { x, y, z }
    rotation: { type: Object } // { x, y, z }
  },

  watch: {
    scale: {
      deep: true,
      handler (v) {
        this.setScale(v)
      }
    },
    position: {
      deep: true,
      handler (v) {
        Object.assign(this.curObj.position, v)
      }
    },
    rotation: {
      deep: true,
      handler (v) {
        Object.assign(this.curObj.rotation, v)
      }
    },
    obj (obj) {
      this.curObj = obj
    },
    curObj (obj, oldObj) {
      this.unsetObj(oldObj)
      this.setObj(obj)
    }
  },

  data () {
    // fix vue 2.0 `Avoid mutating a prop directly since the value will be overwritten
    // whenever the parent component re-renders. Instead, use a data or computed
    // property based on the prop's value.`
    // https://dotdev.co/peeking-into-vue-js-2-part-1-b457e60c88c6#.918arzkow
    let curObj = this.obj

    // this.obj = new Object3D() // holder
    if (!curObj) {
      curObj = new THREE[this.type]()
    }

    return { curObj }
  },

  // ready => mounted + (nextTick?)
  // http://rc.vuejs.org/guide/migration.html#ready-deprecated
  mounted () {
    this.setObj(this.curObj)
  },

  // detached => destroyed + (nextTick?)
  // http://rc.vuejs.org/guide/migration.html#detached-deprecated
  // but we use beforeDestroy to clean up
  beforeDestroy () {
    this.unsetObj(this.curObj)
  },

  methods: {
    setObj (obj) {
      // fix vue 2.0 `this.constructor.name` becomes `VueComponent`
      // obj.name = obj.name || this.constructor.name
      obj.name = this.name || obj.name || obj.type

      this.setScale(this.scale)
      Object.assign(obj.position, this.position)
      Object.assign(obj.rotation, this.rotation)

      if (this.parentObj) {
        this.parentObj.add(obj)
      }
      this.$emit('update:obj', obj)
    },
    unsetObj (obj) {
      this.$emit('update:obj', null)
      if (this.parentObj) {
        this.parentObj.remove(obj)
      }
    },
    setScale (v) {
      if (v && typeof v === 'number') {
        v = { x: v, y: v, z: v }
      }
      Object.assign(this.curObj.scale, v)
    }
  }
}
</script>
