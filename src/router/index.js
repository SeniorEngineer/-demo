import Vue from 'vue'
import Router from 'vue-router'
import List from '../views/list.vue'
import Detail from '../views/detail.vue'
import ShoppingCart from '../views/shoppingCart.vue'
import CheckOut from '../views/checkout.vue'
import SubmitOrder from '../views/submitOrder.vue'
import Account from '../views/account.vue'
import Order from '../components/order.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'list',
      component: List
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: ShoppingCart
    },
    {
      path: '/checkout',
      name: 'CheckOut',
      component: CheckOut
    },
    {
      path: '/submitorder',
      name: 'SubmitOrder',
      component: SubmitOrder
    },
    {
      path: '/account',

      component: Account,
      children: [{
        path: '',
        name: 'Account',
        component: Order
      }]
    }
  ]
})
