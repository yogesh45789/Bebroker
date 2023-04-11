import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import request from './api/request'
import urls from './api/urls'
import keys from './helper/keys'

Vue.config.productionTip = false
Vue.prototype.$request = request;
Vue.prototype.$urls = urls;
Vue.prototype.$keys = keys;
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
