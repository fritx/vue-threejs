<template>
  <div><slot></slot></div>
</template>

<script>
export default {
  name: 'Base',
  inject: {
    _baseUrl: { name: '_baseUrl', default: null }
  },
  props: {
    baseUrl: {
      type: String,
      default () { return this._baseUrl }
    }
  },

  provide () {
    return {
      _baseUrl: this.baseUrl
    }
  },

  methods: {
    dispatchEvent (name, detail, options = {}) {
      // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
      let e = new CustomEvent(name, {
        detail,
        bubbles: true,
        cancelable: true,
        ...options
      })
      return this.$el.dispatchEvent(e)
    }
  }
}
</script>
