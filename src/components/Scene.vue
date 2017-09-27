<script>
/* eslint-disable no-duplicate-imports */
import { Scene } from 'three'
import * as THREE from 'three'
import Object3D from './Object3D'

export default {
  name: 'Scene',
  mixins: [Object3D],

  inject: [
    ...Object3D.inject,
    'global'
  ],

  props: {
    obj: { type: Object }
  },

  data () {
    let curObj = this.obj
    if (!curObj) {
      curObj = new Scene()
    }
    curObj.name = curObj.name || curObj.type
    return { curObj }
  },

  mounted () {
    let scene = this.curObj
    this.global.scene = scene

    // for threejs-inspector to work
    // https://github.com/jeromeetienne/threejs-inspector
    if (process.env.NODE_ENV === 'development') {
      window.THREE = THREE
      window.scene = scene
    }
  }
}
</script>
