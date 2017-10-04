// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-default/index.css'
import AppConfig from './app.config'
import http from './http'

import TopNav from './components/nav/top-nav'
import LeftSide from './components/nav/left-side'
import RightSide from './components/nav/right-side'
import BottomNav from './components/nav/bottom-nav'

Vue.component('top-nav', TopNav)
Vue.component('left-side', LeftSide)
Vue.component('right-side', RightSide)
Vue.component('bottom-nav', BottomNav)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(AppConfig)
Vue.use(http)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
