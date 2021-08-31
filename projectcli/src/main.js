import Vue from 'vue'
import App from './App.vue'
import VueResouce from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueResouce);

new Vue({
  render: h => h(App),
}).$mount('#app')
