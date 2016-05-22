import Renderer from './components/Renderer'
import Object3D from './components/Object3D'
import Scene from './components/Scene'
import Camera from './components/Camera'

// todo: automatic build script
export default {
  install (Vue) {
    Vue.component('renderer', Renderer)
    Vue.component('object3d', Object3D)
    Vue.component('scene', Scene)
    Vue.component('camera', Camera)
  }
}
