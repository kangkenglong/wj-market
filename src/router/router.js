import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Goods_Info from '@/components/goods_info'
import Goods_Type from '@/components/goods_type'
import Shop_Car from '@/components/shop_car'
import Main from '@/components/main'
import Collection from '@/components/collection'
import Order from '@/components/order'
import Vip from '@/components/vip'
import Search from '@/components/search'
// import Search from '@/components/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/goods_info',
      name: 'Goods_info',
      component: Goods_Info
    },
    {
      path: '/goods_type',
      name: 'Goods_type',
      component: Goods_Type
    },
    {
      path: '/shop_car',
      name: 'Shop_Car',
      component: Shop_Car
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/collection',
      name: 'Collection',
      component: Collection
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/vip',
      name: 'Vip',
      component: Vip
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    // {
    //   path: '/search',
    //   name: 'Search',
    //   component: Search
    // }
  ]
})
