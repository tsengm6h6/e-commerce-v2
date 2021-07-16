import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import LandingPage from '../views/LandingPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage,
    meta: {
      gtm: 'landingPage',
      breadcrumb: [{
        name: '首頁'
      }]
    }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/Products.vue'),
    meta: {
      gtm: 'homePage',
      breadcrumb: [{
        name: '首頁',
        link: 'home'
      }, {
        name: '所有活動'
      }]
    }
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('../views/Product.vue'),
    meta: { gtm: 'product' }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('../views/Favorites.vue'),
    meta: {
      gtm: 'favorite',
      breadcrumb: [{
        name: '首頁',
        link: 'home'
      }, {
        name: '收藏清單'
      }]
    }
  },
  {
    path: '/question',
    name: 'question',
    component: () => import('../views/Question.vue'),
    meta: {
      gtm: 'question',
      breadcrumb: [{
        name: '首頁',
        link: 'home'
      }, {
        name: '常見問題'
      }]
    }
  },
  {
    path: '/policies',
    name: 'policies',
    component: () => import('../views/Policies.vue'),
    meta: {
      gtm: 'policies',
      breadcrumb: [{
        name: '首頁',
        link: 'home'
      }, {
        name: '政策與條款'
      }]
    }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/CheckOut.vue'),
    meta: {
      gtm: 'checkout'
    }
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/Orders.vue'),
    meta: {
      gtm: 'orders',
      breadcrumb: [{
        name: '首頁',
        link: 'home'
      }, {
        name: '我的訂單'
      }]
    }
  },
  {
    path: '/admin/signIn',
    name: 'admin-signIn',
    component: () => import('../views/admin/AdminSignIn.vue')
  },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: () => import('../views/admin/AdminPanel.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
