// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-TW'

import App from './App'
import Nav from './Nav'

Vue.config.productionTip = false
Vue.use(ElementUI, {locale})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
  router,
  render: h => h(App)
})

new Vue({
  el: '#nav',
  components: {Nav},
  template: '<Nav/>',
  render: h => h(Nav)
})
