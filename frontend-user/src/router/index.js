import { createRouter, createWebHistory } from 'vue-router'
import { navMenu, companyInfo } from '@/data/site'

const viewModules = {
  '/': () => import('@/views/HomeView.vue'),
  '/about': () => import('@/views/AboutView.vue'),
  '/products': () => import('@/views/ProductView.vue'),
  '/cases': () => import('@/views/CaseView.vue'),
  '/contact': () => import('@/views/ContactView.vue')
}

const routeNames = {
  '/': 'Home',
  '/about': 'About',
  '/products': 'Products',
  '/cases': 'Cases',
  '/contact': 'Contact'
}

// 路由由导航配置派生，菜单顺序、页面标题与导航共用同一来源
const routes = navMenu.map(item => ({
  path: item.path,
  name: routeNames[item.path],
  component: viewModules[item.path],
  meta: { title: item.title }
}))

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
  document.title = to.meta.title
    ? `${to.meta.title} - ${companyInfo.name}`
    : companyInfo.name
  next()
})

export default router
