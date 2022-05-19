import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/components/MainPage'
import SinglePage from '@/components/SinglePage'
import CartComp from '@/components/CartComp'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: MainPage
    },
    {
      path: '/:id',
      name: 'single',
      component: SinglePage
    },
    {
      path: '/cart/pizzas',
      name: 'cart',
      component: CartComp
    }
  ]
})