import { createRouter, createWebHistory } from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home Page'
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/index',
    redirect: '/'
  },
  {
    path: '/product',
    name: 'product',
    meta: {
      title: 'Product Page'
    },
    component: () => import('../views/Product.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      title: 'Detail Page'
    },
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      title: 'Order Page'
    },
    component: () => import('../views/Order.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    meta: {
      title: 'Cart Page'
    },
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/favorite',
    name: 'Favorite',
    meta: {
      title: 'Favorite Page'
    },
    component: () => import('../views/Favorite.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: 'About Page'
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    meta: {
      title: '404'
    },
    component: () => import('../views/404.vue')
  },
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
  document.title = to.meta.title

})

export default router
