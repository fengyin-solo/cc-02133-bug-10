/**
 * 品牌概览单一数据源（Single Source of Truth）
 *
 * 首页统计数据、导航入口顺序、页面标题、核心优势、产品服务、合作伙伴、
 * 成功案例等所有与品牌概览相关的数据都在此定义，组件只负责渲染，
 * 不再各自硬编码，避免「合作伙伴数量 / 客户数 / 页面标题」对不上的问题。
 */

// 公司信息（页面标题、Logo 文案共用）
export const company = {
  name: '广州知运信息技术有限公司',
  shortName: '广州知运信息技术'
}

// 导航入口：唯一顺序来源，桌面端 / 移动端菜单、页面标题都从这里取
export const navItems = [
  { name: '首页', path: '/' },
  { name: '关于我们', path: '/about' },
  { name: '产品服务', path: '/products' },
  { name: '案例展示', path: '/cases' },
  { name: '联系我们', path: '/contact' }
]

// 核心优势入口（首页「为什么选择知运」）
export const features = [
  {
    icon: 'Cpu',
    title: '智能化技术',
    description: '基于AI和大数据的智能算法，实现物流全流程自动化决策'
  },
  {
    icon: 'Connection',
    title: '全链路整合',
    description: '打通仓储、运输、配送各环节，实现供应链一体化管理'
  },
  {
    icon: 'DataAnalysis',
    title: '数据驱动',
    description: '实时数据监控与分析，助力企业精准决策，降本增效'
  },
  {
    icon: 'Service',
    title: '专业服务',
    description: '资深行业专家团队，提供7x24小时技术支持与咨询服务'
  }
]

// 产品服务入口（首页产品卡片，顺序即展示顺序）
export const homeProducts = [
  {
    id: 'wms',
    icon: 'Box',
    title: '智慧仓储系统',
    description: '全面的仓库管理解决方案，实现库存精准管控',
    features: ['库位智能管理', '出入库自动化', '库存实时监控', '批次追溯管理']
  },
  {
    id: 'tms',
    icon: 'Van',
    title: '运输管理系统',
    description: '高效的运输调度平台，优化运输成本与时效',
    features: ['智能路径规划', '车辆实时追踪', '运费自动核算', '承运商管理']
  },
  {
    id: 'dms',
    icon: 'Location',
    title: '配送调度系统',
    description: '智能配送解决方案，提升末端配送效率',
    features: ['订单智能分配', '配送路线优化', '签收电子化', '配送员管理']
  }
]

// 成功案例（首页）
export const cases = [
  {
    title: '某大型电商平台',
    description: '通过部署知运智慧仓储系统，实现仓库作业效率提升40%，库存准确率达99.9%',
    tag: '电商物流',
    industry: '电子商务'
  },
  {
    title: '某知名快递企业',
    description: '采用知运运输管理系统，优化运输路线，降低运输成本25%，时效提升20%',
    tag: '快递物流',
    industry: '快递行业'
  },
  {
    title: '某连锁零售集团',
    description: '使用知运配送调度系统，实现门店配送准时率提升至98%，客户满意度显著提高',
    tag: '零售配送',
    industry: '零售行业'
  }
]

// 合作伙伴名单：合作伙伴区块与「合作伙伴数」统计都从这一份数组派生
export const partners = [
  { name: '顺丰速运' },
  { name: '京东物流' },
  { name: '菜鸟网络' },
  { name: '德邦快递' },
  { name: '中通快递' },
  { name: '圆通速递' },
  { name: '韵达速递' },
  { name: '申通快递' }
]

/**
 * 首页统计数据（单一来源）。
 * `hero: true` 表示同时在首页横幅（页面标题下方）展示；
 * 中部数据区块展示全部。两处共用同一数组，数值永远一致。
 */
export const stats = [
  { key: 'customers', icon: 'User', value: '500+', label: '服务客户', hero: true },
  { key: 'orders', icon: 'Goods', value: '1亿+', label: '日处理订单' },
  { key: 'efficiency', icon: 'TrendCharts', value: '30%', label: '效率提升', hero: true },
  { key: 'stability', icon: 'Timer', value: '99.9%', label: '系统稳定性', hero: true }
]

// 合作伙伴区块展示口径：数量始终与 partners 名单保持一致
export const partnersSummary = {
  subtitle: (count) => `已携手 ${count} 家行业领先企业，共创智慧物流新未来`
}
