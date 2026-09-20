import { ref, shallowRef, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { fetchBrandOverview } from '@/services/brandService.js'

/**
 * 品牌概览共享状态（模块级单例）
 *
 * - 单一数据源：HeroBanner / HomeView / NavHeader 共享同一份 brand，
 *   统计数值、合作伙伴数量、入口顺序、标题不会再各说各话。
 * - 竞态保护：每次请求带递增 reqId，只有最后一次请求可以落库，
 *   快速切换或反复进入页面时，旧请求返回再晚也不会残留旧值。
 * - 空数据：请求失败或返回空集合时统一归一化为空数组，渲染侧安全兜底。
 * - 窗口恢复：监听 pageshow（bfcache 恢复），重新校验并刷新数据。
 */
const brand = shallowRef(null)
const loading = ref(false)
const error = ref('')

let activeReqId = 0
let inflight = null

const EMPTY_OVERVIEW = {
  company: { name: '', shortName: '' },
  navItems: [],
  features: [],
  products: [],
  cases: [],
  partners: [],
  stats: []
}

// 无论接口返回什么形状，集合字段都保证是数组，空数据安全可遍历
const normalize = (data) => ({
  ...EMPTY_OVERVIEW,
  ...(data || {}),
  navItems: data?.navItems ?? [],
  features: data?.features ?? [],
  products: data?.products ?? [],
  cases: data?.cases ?? [],
  partners: data?.partners ?? [],
  stats: data?.stats ?? []
})

const loadBrand = async ({ force = false } = {}) => {
  // 已有数据且非强制刷新（如 bfcache 恢复）时直接复用单例
  if (brand.value && !force) return brand.value
  // 已有相同请求在途时复用，避免同帧多个组件重复请求
  if (inflight && !force) return inflight

  const reqId = ++activeReqId
  loading.value = true
  error.value = ''

  const promise = (async () => {
    try {
      const data = await fetchBrandOverview()
      // 仅最后一次请求允许写入，丢弃过期响应，杜绝快速切换后残留旧值
      if (reqId === activeReqId) {
        brand.value = normalize(data)
        return brand.value
      }
      return null
    } catch (e) {
      if (reqId === activeReqId) {
        // 失败时归一化为空数据，保持页面结构一致而不是展示脏数据
        brand.value = { ...EMPTY_OVERVIEW }
        error.value = '数据加载失败，请稍后重试'
      }
      return null
    } finally {
      if (reqId === activeReqId) {
        loading.value = false
        inflight = null
      }
    }
  })()

  inflight = promise
  return promise
}

// bfcache 恢复时强制重新校验，避免从缓存回来后展示过期统计
const handlePageShow = (event) => {
  if (event.persisted) {
    loadBrand({ force: true })
  }
}

export function useBrand() {
  if (getCurrentInstance()) {
    onMounted(() => {
      loadBrand()
      window.addEventListener('pageshow', handlePageShow)
    })
    onUnmounted(() => {
      window.removeEventListener('pageshow', handlePageShow)
    })
  }

  return {
    brand,
    loading,
    error,
    refresh: () => loadBrand({ force: true })
  }
}
