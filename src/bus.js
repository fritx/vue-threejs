import Vue from 'vue'

// global event bus
// fix `Uncaught TypeError: this.$dispatch is not a function`
// http://rc.vuejs.org/guide/migration.html#dispatch-and-broadcast-deprecated
export default new Vue()
