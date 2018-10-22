import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Goods_Info from '@/components/goods_info'
import Goods_Type from '@/components/goods_type'
import Shop_Car from '@/components/shop_car'
import Main from '@/components/main'
import Collection from '@/components/collection'
import Order from '@/components/order'
import Order_dfk from '@/components/order_dfk'
import Order_dfh from '@/components/order_dfh'
import Order_dsh from '@/components/order_dsh'
import Order_sh from '@/components/order_sh'
import Order_Info from '@/components/order_info'
import Vip from '@/components/vip'
import Search from '@/components/search'
import Main_jf from '@/components/main_jf'
import Main_dh from '@/components/main_dh'
import Jf_shop from '@/components/jf_shop'
import Team from '@/components/team'
import Yongjin from '@/components/yongjin'
import Tixian from '@/components/tixian'
import Youhui from '@/components/youhui'
import Settlement from '@/components/settlement'
import Address from '@/components/address'
import Addr_info from '@/components/addr_info'
import Goods_list from '@/components/goods_list'
import Login from '@/components/login'
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
      path: '/order_dfk',
      name: 'Order_dfk',
      component: Order_dfk
    },
    {
      path: '/order_dfh',
      name: 'Order_dfh',
      component: Order_dfh
    },
    {
      path: '/order_dsh',
      name: 'Order_dsh',
      component: Order_dsh
    },
    {
      path: '/order_sh',
      name: 'Order_sh',
      component: Order_sh
    },
    {
      path: '/order_info',
      name: 'Order_Info',
      component: Order_Info
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
    {
      path: '/main_jf',
      name: 'Main_jf',
      component: Main_jf
    },
    {
      path: '/main_dh',
      name: 'Main_dh',
      component: Main_dh
    },
    {
      path: '/jf_shop',
      name: 'Jf_shop',
      component: Jf_shop
    },
    {
      path: '/team',
      name: 'Team',
      component: Team
    },
    {
      path: '/yongjin',
      name: 'Yongjin',
      component: Yongjin
    },
    {
      path: '/tixian',
      name: 'Tixian',
      component: Tixian
    },
    {
      path: '/youhui',
      name: 'Youhui',
      component: Youhui
    },
    {
      path: '/settlement',
      name: 'Settlement',
      component: Settlement
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/addrinfo',
      name: 'Addr_info',
      component: Addr_info
    },
    {
      path: '/goodslist',
      name: 'Goods_list',
      component: Goods_list
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/search',
    //   name: 'Search',
    //   component: Search
    // }
  ]
})
