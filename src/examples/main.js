import Vue from 'vue'
import App from './App'
import VueThreejs from '../'

Vue.use(VueThreejs)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
