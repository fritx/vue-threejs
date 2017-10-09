<template>
  <div @vm-oimo-body="handleBody">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'space-object',
  inject: ['spaceVms'],

  data () {
    return { body: null }
  },

  mounted () {
    this.spaceVms.push(this)
  },

  beforeDestroy () {
    let index = this.spaceVms.indexOf(this)
    if (index > -1) this.spaceVms.splice(index, 1)
  },

  methods: {
    handleBody (e) {
      e.stopPropagation()
      this.body = e.detail
    }
  }
}
</script>
