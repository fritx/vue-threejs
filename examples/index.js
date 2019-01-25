import Vue from 'vue'
import App from './App'

// import VueThreejs from '@/../package/' // testing pack
// import VueThreejs from '@/../' // testing build
import VueThreejs from '@/'

Vue.use(VueThreejs)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
