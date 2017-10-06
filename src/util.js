import { Vector3 } from 'three'

// for simplicity
// using plain object `{ x, y, z }` to describe vector
// instead of class Vector3
let $vec = {
  multiplyScalar (v, s) {
    v = this.toVector3(v)
    v.multiplyScalar(s)
    return this.toPlainObj(v)
  },

  add (v1, v2) {
    v1 = this.toVector3(v1)
    v2 = this.toVector3(v2)
    let v = v1.add(v2)
    return this.toPlainObj(v)
  },

  toVector3 (v) {
    v = v || {}
    return new Vector3(v.x, v.y, v.z)
  },

  toPlainObj (v) {
    let { x, y, z } = v
    return { x, y, z }
  }
}

export { $vec }
