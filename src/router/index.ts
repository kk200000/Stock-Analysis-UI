import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '../views/RegisterPage.vue'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        redirect: '/Dashboard',
      },
      {
        path: '/Dashboard',
        name: 'Dashboard',
        meta: {
          title: '首页',
          requiresAuth: true, // 需要登录
        },
        component: Dashboard,
      },
      {
        path: '/marketindex',
        name: 'MarketIndex',
        meta: {
          title: '股市大盘指数',
          requiresAuth: true, // 需要登录
        },
        component: () => import('../views/MarketIndex.vue'),
      },
      {
        path: '/stocktrend',
        name: 'StockTrend',
        meta: {
          title: '个股价格趋势',
          requiresAuth: true, // 需要登录
        },
        component: () => import('../views/StockTrend.vue'),
      },
      {
        path: '/stockprediction',
        name: 'StockPrediction',
        meta: {
          title: '股票价格预测',
          requiresAuth: true, // 需要登录
        },
        component: () => import('../views/StockPrediction.vue'),
      },
    ],
  },
  {
    path: '/Register',
    name: 'RegisterPage',
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') // 检查用户是否已登录

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 如果路由需要登录
    if (isAuthenticated) {
      next() // 已登录，继续访问
    } else {
      next('/login') // 未登录，跳转到登录页
    }
  } else if (to.path === '/' && !isAuthenticated) {
    // 未登录时输入域名，跳转到登录页
    next('/login')
  } else {
    next() // 不需要登录的页面，继续访问
  }
})

export default router
