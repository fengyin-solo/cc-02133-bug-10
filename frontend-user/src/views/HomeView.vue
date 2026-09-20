<template>
  <div class="home-page">
    <!-- Hero Banner -->
    <HeroBanner />
    
    <!-- 核心优势 -->
    <section class="section section-gray">
      <div class="container">
        <SectionTitle 
          title="为什么选择知运" 
          subtitle="我们致力于为企业提供最专业的智慧物流解决方案"
        />
        <div class="row">
          <div class="col col-3" v-for="feature in features" :key="feature.title">
            <FeatureCard
              :icon="feature.icon"
              :title="feature.title"
              :description="feature.description"
            />
          </div>
          <div v-if="!loading && features.length === 0" class="col col-12">
            <el-empty description="暂无核心优势数据" />
          </div>
        </div>
      </div>
    </section>
    
    <!-- 产品服务 -->
    <section class="section section-light">
      <div class="container">
        <SectionTitle 
          title="产品与服务" 
          subtitle="全方位的智慧物流系统，满足您的各种业务需求"
        />
        <div class="row">
          <div class="col col-4" v-for="product in products" :key="product.id">
            <ProductCard
              :icon="product.icon"
              :product-id="product.id"
              :title="product.title"
              :description="product.description"
              :features="product.features"
              @detail="handleProductDetail"
            />
          </div>
          <div v-if="!loading && products.length === 0" class="col col-12">
            <el-empty description="暂无产品服务数据" />
          </div>
        </div>
      </div>
    </section>
    
    <!-- 数据展示 -->
    <section class="section section-dark stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card" v-for="stat in stats" :key="stat.key">
            <div class="stat-icon">
              <el-icon :size="32">
                <component :is="stat.icon" />
              </el-icon>
            </div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 成功案例 -->
    <section class="section section-gray">
      <div class="container">
        <SectionTitle 
          title="成功案例" 
          subtitle="众多企业选择知运，实现物流数字化转型"
        />
        <div class="row">
          <div class="col col-4" v-for="caseItem in cases" :key="caseItem.title">
            <CaseCard
              :title="caseItem.title"
              :description="caseItem.description"
              :tag="caseItem.tag"
              :industry="caseItem.industry"
              @click="$router.push('/cases')"
            />
          </div>
          <div v-if="!loading && cases.length === 0" class="col col-12">
            <el-empty description="暂无成功案例" />
          </div>
        </div>
        <div class="text-center" style="margin-top: 32px;">
          <el-button type="primary" size="large" @click="$router.push('/cases')">
            查看更多案例
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
    </section>
    
    <!-- 合作伙伴 -->
    <section class="section section-light">
      <div class="container">
        <SectionTitle
          title="合作伙伴"
          :subtitle="partnersSubtitle"
        />
        <div class="partners-grid" v-if="partners.length">
          <div class="partner-item" v-for="partner in partners" :key="partner.name">
            <div class="partner-logo">
              <el-icon :size="32"><OfficeBuilding /></el-icon>
              <span>{{ partner.name }}</span>
            </div>
          </div>
        </div>
        <div class="partners-grid" v-else-if="loading" aria-hidden="true">
          <div class="partner-item partner-skeleton" v-for="n in 8" :key="`sk-${n}`"></div>
        </div>
        <el-empty v-else description="暂无合作伙伴" />
      </div>
    </section>
    
    <!-- CTA -->
    <section class="section cta-section">
      <div class="container text-center">
        <h2 class="cta-title">准备好开启智慧物流之旅了吗？</h2>
        <p class="cta-desc">立即联系我们，获取专属解决方案</p>
        <el-button type="primary" size="large" round @click="$router.push('/contact')">
          免费咨询
          <el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import HeroBanner from '@/components/HeroBanner.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import FeatureCard from '@/components/FeatureCard.vue'
import ProductCard from '@/components/ProductCard.vue'
import CaseCard from '@/components/CaseCard.vue'
import { useRouter } from 'vue-router'
import { useBrand } from '@/composables/useBrand.js'
import { partnersSummary } from '@/data/brand.js'

const router = useRouter()

// 首页所有内容（统计 / 优势 / 产品 / 案例 / 合作伙伴）共享同一数据源，
// 与 HeroBanner、NavHeader 看到的是同一份数据
const { brand, loading } = useBrand()

const features = computed(() => brand.value?.features ?? [])
const products = computed(() => brand.value?.products ?? [])
const stats = computed(() => brand.value?.stats ?? [])
const cases = computed(() => brand.value?.cases ?? [])
const partners = computed(() => brand.value?.partners ?? [])

// 合作伙伴数量始终来自名单长度，区块文案与统计口径不会再对不上
const partnersSubtitle = computed(() =>
  partnersSummary.subtitle(partners.value.length)
)

const handleProductDetail = (productId) => {
  if (productId) {
    router.push({ path: '/products', query: { tab: productId }, hash: `#product-${productId}` })
  } else {
    router.push('/products')
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.stats-section {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-xl;
}

.stat-card {
  text-align: center;
  padding: $spacing-xl;
  background: rgba(255, 255, 255, 0.05);
  border-radius: $radius-lg;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-icon {
  width: 64px;
  height: 64px;
  background: rgba($primary-color, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto $spacing-md;
  color: $primary-color;
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  margin-bottom: $spacing-xs;
}

.stat-label {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.65);
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-lg;
}

.partner-item {
  background: $bg-color;
  border-radius: $radius-md;
  padding: $spacing-lg;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    box-shadow: $shadow-md;
  }
}

.partner-skeleton {
  min-height: 96px;
  background: linear-gradient(90deg, $bg-color 25%, $border-light 37%, $bg-color 63%);
  background-size: 400% 100%;
  animation: partner-loading 1.4s ease infinite;
}

@keyframes partner-loading {
  0% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
}

.partner-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
  color: $text-secondary;
  
  span {
    font-size: $font-size-sm;
  }
}

.cta-section {
  background: linear-gradient(135deg, $primary-color, $primary-dark);
  color: #fff;
}

.cta-title {
  font-size: $font-size-xxl;
  font-weight: 700;
  margin-bottom: $spacing-md;
}

.cta-desc {
  font-size: $font-size-lg;
  opacity: 0.85;
  margin-bottom: $spacing-xl;
}

@media (max-width: $breakpoint-lg) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: $breakpoint-md) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-md;
  }
  
  .stat-card {
    padding: $spacing-md;
  }
  
  .stat-value {
    font-size: 24px;
  }
  
  .stat-icon {
    width: 48px;
    height: 48px;
  }
  
  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-md;
  }
  
  .partner-item {
    padding: $spacing-md;
  }
  
  .cta-title {
    font-size: $font-size-xl;
  }
  
  .cta-desc {
    font-size: $font-size-base;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .partners-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
