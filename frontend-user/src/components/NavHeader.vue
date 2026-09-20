<template>
  <header class="nav-header" :class="{ 'nav-scrolled': isScrolled }">
    <div class="container flex-between">
      <router-link to="/" class="logo">
        <div class="logo-icon">知</div>
        <span class="logo-text">{{ companyShortName }}</span>
      </router-link>

      <nav class="nav-menu" :class="{ 'nav-open': menuOpen }">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          @click="closeMenu"
        >
          {{ item.name }}
        </router-link>
      </nav>

      <div class="nav-actions">
        <el-button type="primary" round @click="goContact">
          联系我们
        </el-button>
        <div class="menu-toggle" @click="toggleMenu">
          <el-icon :size="24">
            <component :is="menuOpen ? 'Close' : 'Menu'" />
          </el-icon>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBrand } from '@/composables/useBrand.js'

const route = useRoute()
const router = useRouter()

// 导航入口顺序与公司名称来自品牌单一数据源，与页面标题、首页保持一致
const { brand } = useBrand()
const navItems = computed(() => brand.value?.navItems ?? [])
const companyShortName = computed(
  () => brand.value?.company?.shortName || '广州知运信息技术'
)

const isScrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const closeMenu = () => {
  menuOpen.value = false
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const goContact = () => {
  closeMenu()
  router.push('/contact')
}

// 路由切换后强制收起折叠菜单，返回或快速切换时不会残留展开态导致入口重复呈现
watch(() => route.path, closeMenu)

// 窗口恢复（含 bfcache）及视口恢复到桌面宽度时，重置折叠状态，避免菜单重复显示
const handleResize = () => {
  if (window.innerWidth > 992) {
    closeMenu()
  }
}

const handlePageShow = () => {
  closeMenu()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
  window.addEventListener('pageshow', handlePageShow)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('pageshow', handlePageShow)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  &.nav-scrolled {
    box-shadow: $shadow-sm;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  color: $text-primary;
  
  &:hover {
    color: $text-primary;
  }
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, $primary-color, $primary-dark);
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}

.logo-text {
  font-size: $font-size-lg;
  font-weight: 600;
}

.nav-menu {
  display: flex;
  gap: $spacing-xl;
}

.nav-item {
  color: $text-regular;
  font-size: $font-size-base;
  padding: $spacing-xs 0;
  position: relative;
  transition: color 0.3s;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: $primary-color;
    transition: width 0.3s;
  }
  
  &:hover,
  &.router-link-active {
    color: $primary-color;
    
    &::after {
      width: 100%;
    }
  }
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.menu-toggle {
  display: none;
  cursor: pointer;
  color: $text-primary;
}

@media (max-width: $breakpoint-lg) {
  .nav-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    padding: $spacing-lg;
    gap: $spacing-md;
    box-shadow: $shadow-md;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    
    &.nav-open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
  
  .nav-item {
    padding: $spacing-sm 0;
    border-bottom: 1px solid $border-light;
  }
  
  .menu-toggle {
    display: block;
  }
  
  .nav-actions .el-button {
    display: none;
  }
}

@media (max-width: $breakpoint-md) {
  .logo-text {
    display: none;
  }
}
</style>
