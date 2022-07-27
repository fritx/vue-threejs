# vue-threejs

<a href="https://www.npmjs.com/package/vue-threejs"><img height="20" src="https://img.shields.io/npm/dm/vue-threejs.svg"></a>

> \[WIP\] [Three.js][threejs] bindings for [Vue][vue]

Migrated from [react-threejs][react-threejs]

Demos: [react-world][react-world], [vue-world][vue-world]

<img width="400" src="https://github.com/fritx/react-threejs/raw/dev/debugging.jpg">

```js
// import VueThreejs from 'vue-threejs' // below 0.2.0
import * as VueThreejs from 'vue-threejs' // >= 0.2.0

Vue.use(VueThreejs)
```

```vue
<template>
  <renderer :size="{ w: 600, h: 400 }">
    <scene>
      <camera :position="{ z: 15 }"></camera>
      <mesh :obj="mesh" :position="{ y: -200 }"></mesh>
      <animation :fn="animate" :speed="3"></animation>
    </scene>
  </renderer>
</template>
```

**Physics**

```vue
<movement-system>
  <mass-object :rv0="{ x: 2, y: 2 }" :v0="{ x: 10 }"
      :f="{ x: -3, y: -2 }" :m="1">
    <cube texture="cobblestone" :size="1"></cube>
  </mass-object>
  <mass-object :rv0="{ x: 2, z: 2 }" :v0="{ z: 20 }"
      :f="{ y: -1, z: -8 }" :m="1.2">
    <cube texture="diamond" :size="1.2"></cube>
  </mass-object>
</movement-system>
```

```vue
<oimo-world :options="{ gravity: [0, -9.8, 0] }">
  <space-system :m-scale="10 ** 4">
    <space-object v-for="t in textures" :key="t">
      <oimo-body :options="{ move: true, density: 1 }">
        <cube :texture="t" :size="1"></cube>
      </oimo-body>
    </space-object>
  </space-system>
</oimo-world>
```

**Roadmap**

- [x] Basic components
  - [x] renderer/scene/camera/listener
  - [x] object3d/light/audio/controls/animation
  - [x] mesh/geometry/material/texture/obj-mtl
- [ ] Watch for props change
  - [x] position/rotation/obj
  - [ ] more
- [ ] Animation
  - [x] component/animate/speed/paused/blocked
  - [ ] global-control
- [ ] Physical engine
  - [x] movement(a/v/pos/ra/rv/rot)/mass(m/F)
  - [x] gravity(G/r)/collision/oimo
  - [ ] circular-motion/centripetal-force
- [ ] Unit test
  - [x] karma/mocha/phantom
  - [ ] avoriaz/ava

**Study Notes**

- [VueJS extend component: remove parent's property](https://stackoverflow.com/questions/45680047/vuejs-extend-component-remove-parents-property)
- [Vue2 migration commits of vue-threejs](https://github.com/fritx/vue-threejs/commits/vue2)
  - `cannot use <slot> as root element`
  - `lifecycle ready => mounted`
  - `template or render function not defined`
  - `avoid mutating a prop directly`
  - `this.$dispatch is not a function`
- [v-ref is not working with <template> element](https://github.com/vuejs/vue/issues/681#issuecomment-75802646)
- [Can I use a compoent inherit other compoent?](https://github.com/vuejs/Discussion/issues/354#issuecomment-133019536)

[react-world]: http://fritx.github.io/react-threejs/example/
[vue-world]: http://fritx.github.io/vue-threejs/
[react-threejs]: https://github.com/fritx/react-threejs
[threejs]: https://github.com/mrdoob/three.js
[vue]: https://github.com/vuejs/vue
