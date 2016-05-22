<style>
  body { margin: 0; }
</style>

<template>
  <renderer :size="size">
    <scene>
      <camera :size="size" :position="camPos"></camera>
      <ocean :position="oceanPos"></ocean>
    </scene>
  </renderer>
</template>

<script>
  import Ocean from './examples/Ocean'

  export default {
    components: { Ocean },

    data () {
      return {
        size: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        oceanPos: { y: -200 },
        camPos: { z: 15 }
      }
    }
  }
</script>
