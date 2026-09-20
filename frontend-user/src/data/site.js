// 站点统一数据源
// 统计数据、入口顺序、页面标题均以此处为唯一来源，
// 首页各区块、导航菜单、路由标题都从这里派生，避免多处拷贝导致数据对不上。

export const companyInfo = {
  name: '广州知运信息技术有限公司',
  shortName: '广州知运信息技术'
}

// 服务数据（统计）——全站唯一来源
export const siteStats = [
  { key: 'customers', icon: 'User', value: '500+', label: '服务客户' },
  { key: 'orders', icon: 'Goods', value: '1亿+', label: '日处理订单' },
  { key: 'efficiency', icon: 'TrendCharts', value: '30%', label: '效率提升' },
  { key: 'stability', icon: 'Timer', value: '99.9%', label: '系统稳定性' }
]

// 按 key 取统计项；找不到时返回 null，由调用方兜底，避免残留旧值
export const getStatByKey = (key) => siteStats.find(item => item.key === key) || null

// Hero 横幅展示的统计，从 siteStats 派生（顺序：服务客户 / 系统稳定性 / 效率提升）
export const heroStats = ['customers', 'stability', 'efficiency']
  .map(getStatByKey)
  .filter(Boolean)

// 核心优势入口
export const coreFeatures = [
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

// 产品服务入口
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

// 首页成功案例
export const homeCases = [
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

// 合作伙伴
export const partners = [
  { id: 1, name: '合作伙伴 1' },
  { id: 2, name: '合作伙伴 2' },
  { id: 3, name: '合作伙伴 3' },
  { id: 4, name: '合作伙伴 4' },
  { id: 5, name: '合作伙伴 5' },
  { id: 6, name: '合作伙伴 6' },
  { id: 7, name: '合作伙伴 7' },
  { id: 8, name: '合作伙伴 8' }
]

// 导航菜单与页面标题——菜单顺序、路由 title 共用此一份配置
export const navMenu = [
  { name: '首页', path: '/', title: '首页' },
  { name: '关于我们', path: '/about', title: '关于我们' },
  { name: '产品服务', path: '/products', title: '产品服务' },
  { name: '案例展示', path: '/cases', title: '案例展示' },
  { name: '联系我们', path: '/contact', title: '联系我们' }
]
