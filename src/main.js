import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/style/theme/index.css'
// import VueI18n from 'vue-i18n'
// import zhLocale from 'element-ui/lib/locale/lang/zh-TW'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

// 表單驗證
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
  configure
} from 'vee-validate'
import { required, email, numeric } from 'vee-validate/dist/rules'
import TW from 'vee-validate/dist/locale/zh_TW.json'

extend('email', email)
extend('required', required)
extend('numeric', numeric)
localize('zh_TW', TW)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

Vue.use(ElementUI)
// TODO:語言待處理版本問題
// Vue.use(VueI18n)
// Vue.config.lang = 'zh-TW'
// Vue.locale('zh-TW', zhLocale)

Vue.component('Loading', Loading)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
