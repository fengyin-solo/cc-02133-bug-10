import { createRouter, createWebHistory } from 'vue-router'
import { company } from '@/data/brand.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: '关于我们' }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/ProductView.vue'),
    meta: { title: '产品服务' }
  },
  {
    path: '/cases',
    name: 'Cases',
    component: () => import('@/views/CaseView.vue'),
    meta: { title: '案例展示' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: '联系我们' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // 公司名取自品牌单一数据源，标题与首页、导航保持同源
  document.title = `${to.meta.title} - ${company.name}`
  next()
})

export default router
