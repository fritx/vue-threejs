import Vue from 'vue'
import Object3D from '@/components/Object3D'
import { expect } from 'chai'

// vue guide: Unit Testing
// https://vuejs.org/v2/guide/unit-testing.html
describe('Object3D.vue', () => {
  ;['position', 'rotation'].forEach(k => {
    describe(`#${k}`, () => {
      it('should init by default', () => {
        let Constructor = Vue.extend(Object3D)
        let vm = new Constructor().$mount()
        expect(vm.curObj[k])
          .to.deep.include({ x: 0, y: 0, z: 0 })
      })

      it('should init via props', () => {
        let Constructor = Vue.extend(Object3D)
        let propsData = {
          [k]: { y: 3, z: -5 }
        }
        let vm = new Constructor({ propsData }).$mount()
        expect(vm.curObj[k])
          .to.deep.include({ x: 0, y: 3, z: -5 })
      })

      it('should watch props', done => {
        let Constructor = Vue.extend(Object3D)
        let vm = new Constructor().$mount()
        vm[k] = { x: -7 }
        Vue.nextTick(() => {
          expect(vm.curObj[k])
            .to.deep.include({ x: -7, y: 0, z: 0 })
          done()
        })
      })
    })
  })
})
