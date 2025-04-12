import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    children: [
      // / 重定向到首页
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
        },
        component: Dashboard
      },
      {
        path: '/marketindex',
        name: 'MarketIndex',
        meta: {
          title: '股市大盘指数',
        },
        component: () => import('../views/MarketIndex.vue'),
      },
      {
        path: '/stocktrend',
        name: 'StockTrend',
        meta: {
          title: '个股价格趋势',
        },
        component: () => import('../views/StockTrend.vue'),
      },
      {
        path: '/stockprediction',
        name: 'StockPrediction',
        meta: {
          title: '股票价格预测',
        },
        component: () => import('../views/StockPrediction.vue'),
      },
    ],
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
  
  if (to.path === '/' && isAuthenticated) {
    next('/Dashboard')
  } else {
    next()
  }
})

export default router
