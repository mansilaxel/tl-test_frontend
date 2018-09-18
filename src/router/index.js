import Vue from 'vue'
import Router from 'vue-router'
import Orders from '@/components/Orders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    }
  ]
})
