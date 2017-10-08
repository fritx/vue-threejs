<template>
  <div @vm-oimo-body="handleBodyVm">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'space-object',
  inject: ['spaceVms'],

  data () {
    return { bodyVm: null }
  },

  mounted () {
    this.spaceVms.push(this)
  },

  beforeDestroy () {
    let index = this.spaceVms.indexOf(this)
    if (index > -1) this.spaceVms.splice(index, 1)
  },

  computed: {
    body () {
      return this.bodyVm && this.bodyVm.body
    }
  },

  methods: {
    handleBodyVm (e) {
      this.bodyVm = e.detail
    }
  }
}
</script>
