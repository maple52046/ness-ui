import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import strategy1 from '@/components/strategy1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/strategy1',
      name: 'strategy1',
      component: strategy1
    }
  ]
})
