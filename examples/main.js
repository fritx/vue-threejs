// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// import * as VueThreejs from '@/../package/lib/VueThreejs.common' // testing pack
// import * as VueThreejs from '@/../lib/VueThreejs.common' // testing build
import * as VueThreejs from '@'
// import VueThreejs from '@'
Vue.use(VueThreejs)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
