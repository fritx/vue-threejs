# vue-threejs

> [WIP] Simplest bindings between [Vue][react] & [Three.js][threejs]
> Migrated from [react-threejs](https://github.com/fritx/react-threejs)

```vue
<template>
  <renderer :size="size">
    <camera></camera>
    <scene></scene>
  </renderer>
</template>
```

**Study Notes**

- [v-ref is not working with ~~<template>~~(dom) element](https://github.com/vuejs/vue/issues/681#issuecomment-75802646)
- [Can I use a compoent inherit other compoent?](https://github.com/vuejs/Discussion/issues/354#issuecomment-133019536)

[react-threejs]: https://github.com/fritx/react-threejs
[react]: https://github.com/facebook/react
[threejs]: https://github.com/mrdoob/three.js
