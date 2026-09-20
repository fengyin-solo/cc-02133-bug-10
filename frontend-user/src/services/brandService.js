/**
 * 品牌概览数据服务
 *
 * 以 Promise 模拟接口请求，真实项目中把 request() 换成 HTTP 请求即可。
 * 所有数据最终都来自 data/brand.js 这一单一数据源，
 * 因此「横幅统计 / 中部统计 / 合作伙伴数量 / 页面标题」永远同源。
 */
import {
  company,
  navItems,
  features,
  homeProducts,
  cases,
  partners,
  stats
} from '@/data/brand.js'

// 模拟接口延迟，用于验证加载态、空数据与快速切换时的竞态保护
const LATENCY = 200

const request = (data) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), LATENCY)
  })

export const fetchBrandOverview = () =>
  request({
    company,
    navItems,
    features,
    products: homeProducts,
    cases,
    partners,
    stats
  })
