<style>
  body { margin: 0; }
</style>

<template>
  <renderer :size="size">
    <scene>
      <camera :position="{ z: 15 }"></camera>
      <light :hex="0xefefff" :intensity="2" :position="{ x: 50, y: 50, z: 50 }"></light>
      <light :hex="0xefefff" :intensity="2" :position="{ x: -50, y: -50, z: -50 }"></light>
      <ocean :position="{ y: -200 }"></ocean>
    </scene>
  </renderer>
</template>

<script>
  import Ocean from './Ocean'

  export default {
    name: 'App',

    components: { Ocean },

    data () {
      return {
        size: {
          w: window.innerWidth,
          h: window.innerHeight
        }
      }
    }
  }
</script>
