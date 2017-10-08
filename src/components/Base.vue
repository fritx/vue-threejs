<template>
  <div><slot></slot></div>
</template>

<script>
export default {
  name: 'Base',

  methods: {
    dispatchEvent (name, detail, options = {}) {
      // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
      let e = new CustomEvent(name, {
        detail,
        bubbles: true,
        ...options
      })
      return this.$el.dispatchEvent(e)
    }
  }
}
</script>
