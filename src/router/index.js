import Vue from 'vue'
import Router from 'vue-router'
import Orders from '@/components/Orders'
import OrderDetail from '@/components/OrderDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/orders/:id',
      name: 'OrderDetail',
      component: OrderDetail
    }
  ]
})
