import Renderer from './components/Renderer'
import Object3D from './components/Object3D'
import Scene from './components/Scene'
import Camera from './components/Camera'

// todo: automatic build script
export default {
  install (Vue) {
    Vue.component(Renderer.name, Renderer)
    Vue.component(Scene.name, Scene)
    Vue.component(Camera.name, Camera)

    // name 'object3d' is required,
    // or it would be parsed to 'object-3-d' somewhere else
    Vue.component(Object3D.name, Object3D)
    Vue.component('object3d', Object3D)
  }
}
