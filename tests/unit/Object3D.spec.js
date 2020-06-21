import { shallowMount } from '@vue/test-utils'
import Object3D from '@/components/Object3D'

describe('Object3D.vue', () => {
  ['position', 'rotation'].forEach(k => {
    describe(`#${k}`, () => {
      it('should init by default', () => {
        const wrapper = shallowMount(Object3D)
        expect(wrapper.vm.curObj[k])
          .toMatchObject({ x: 0, y: 0, z: 0 })
      })

      it('should init via props', () => {
        const wrapper = shallowMount(Object3D, {
          propsData: { [k]: { y: 3, z: -5 } }
        })
        expect(wrapper.vm.curObj[k])
          .toMatchObject({ x: 0, y: 3, z: -5 })
      })

      it('should watch props', () => {
        const wrapper = shallowMount(Object3D)
        wrapper.setProps({ [k]: { x: -7 } })
        setTimeout(() => {
          expect(wrapper.vm.curObj[k])
            .toMatchObject({ x: -7, y: 0, z: 0 })
        })
      })
    })
  })
})
