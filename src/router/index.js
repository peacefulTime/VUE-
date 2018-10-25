import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import welcom from '@/views/welcom/welcom'
import user from '@/views/user/user'
import Right from '@/views/role/Right'
import Role from '@/views/role/Role'
import categories from '@/views/category/categories'
import goods from '@/views/goods/Goods'
import addGoods from '@/views/goods/addGoods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home,
      redirect: { path: '/welcom' },
      children: [
        {
          path: 'welcom',
          name: 'welcom',
          component: welcom
        },
        {
          path: 'users',
          name: 'user',
          component: user
        },
        {
          path: 'rights',
          name: 'Right',
          component: Right
        },
        {
          path: 'roles',
          name: 'Role',
          component: Role
        },
        {
          path: 'categories',
          name: 'categories',
          component: categories
        },
        {
          path: 'goods',
          name: 'goods',
          component: goods
        },
        {
          path: 'toadd',
          name: 'addGoods',
          component: addGoods
        }
      ]
    }
  ]
})
