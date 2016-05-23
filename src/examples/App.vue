<style>
  body { margin: 0; }
</style>

<template>
  <renderer :dim="dim">
    <scene>
      <camera :dim="dim" :position="{ z: 15 }"></camera>
      <ocean :position="{ y: -200 }"></ocean>
    </scene>
  </renderer>
</template>

<script>
  import Ocean from './Ocean'

  export default {
    components: { Ocean },

    data () {
      return {
        dim: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    }
  }
</script>
