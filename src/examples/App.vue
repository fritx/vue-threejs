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
      <sf03 :position="{ y: -4 }"></sf03>
    </scene>
  </renderer>
</template>

<script>
  import Ocean from './Ocean'
  import SF03 from './SF03'

  export default {
    name: 'App',
    components: { Ocean, sf03: SF03 },

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
