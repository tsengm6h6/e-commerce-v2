import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import Loading from 'vue-loading-overlay'
import VueScrollTo from 'vue-scrollto'
import VueClipboard from 'vue-clipboard2'
import '../src/assets/style/theme/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import 'vue-loading-overlay/dist/vue-loading.css'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
Vue.use(VueScrollTo)
Vue.use(VueClipboard)

Vue.use(ElementUI)

Vue.component('Loading', Loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
