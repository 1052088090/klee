<template>
  <div class="app-container">
    <!-- 背景装饰 -->
    <div class="bg-decorations">
      <div class="bg-blur blur-1"></div>
      <div class="bg-blur blur-2"></div>
      <div class="bg-blur blur-3"></div>
    </div>

    <!-- 移动端顶部导航 -->
    <nav class="mobile-nav" v-if="isMobile">
      <div class="mobile-nav-item" :class="{ active: $route.path === '/' }" @click="navigateTo('/')">
        <img src="@/assets/3.webp" alt="主页" />
        <span>主页</span>
      </div>
      <div class="mobile-nav-item" :class="{ active: $route.path === '/voice' }" @click="navigateTo('/voice')">
        <img src="@/assets/1.webp" alt="语音" />
        <span>语音</span>
      </div>
      <div class="mobile-nav-item" :class="{ active: $route.path === '/meme' }" @click="navigateTo('/meme')">
        <img src="@/assets/3.webp" alt="表情包" />
        <span>表情包</span>
      </div>
      <div class="mobile-nav-item" :class="{ active: $route.path === '/gallery' }" @click="navigateTo('/gallery')">
        <img src="@/assets/22.webp" alt="图集" />
        <span>图集</span>
      </div>
      <div class="mobile-nav-item" :class="{ active: $route.path === '/about' }" @click="navigateTo('/about')">
        <img src="@/assets/1.webp" alt="关于" />
        <span>关于</span>
      </div>
    </nav>

    <!-- 主容器 -->
    <div class="main-container" :class="{ 'mobile-layout': isMobile }">
      <div class="content-wrapper" :class="{ 'mobile-content': isMobile }">
        <!-- 左侧侧边栏 - 在移动端会根据需要显示 -->
        <Sidebar ref="sidebarRef" v-if="!isMobile" />

        <!-- 移动端汉堡菜单按钮 -->
        <button class="mobile-menu-btn" v-else @click="showMobileSidebar = !showMobileSidebar">
          <i class="fa fa-bars"></i>
        </button>

        <!-- 移动端侧边栏（抽屉式） -->
        <div class="mobile-sidebar" v-if="isMobile && showMobileSidebar" @click="showMobileSidebar = false">
          <div class="mobile-sidebar-content" @click.stop>
            <Sidebar ref="sidebarRef" />
          </div>
        </div>

        <!-- 主内容区 -->
        <main class="feed" :class="{ 'mobile-feed': isMobile }">
          <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
              <component :is="Component" @avatar-talk="handleAvatarTalk" />
            </Transition>
          </RouterView>
        </main>
      </div>
    </div>

    <!-- 装饰元素 -->
    <div class="card-decoration card-1">
      <i class="fa fa-bomb"></i>
    </div>
    <div class="card-decoration card-2">
      <i class="fa fa-fire"></i>
    </div>
    <div class="card-decoration card-3">
      <i class="fa fa-star"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'

const sidebarRef = ref<InstanceType<typeof Sidebar>>()
const showMobileSidebar = ref(false)
const isMobile = ref(false)
const router = useRouter()

const handleAvatarTalk = () => {
  sidebarRef.value?.startTalking()
}

// 检测设备类型
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const navigateTo = (path: string) => {
  router.push(path)
  if (isMobile.value) {
    showMobileSidebar.value = false
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
/* 路由过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 移动端顶部导航 */
.mobile-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: var(--card-bg);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border);
  z-index: 1000;
  padding: 8px 0;
  box-shadow: 0 -2px 10px var(--shadow);
}

@media (max-width: 767px) {
  .mobile-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}

.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-light);
  font-size: 12px;
  flex: 1;
  max-width: 80px;
}

.mobile-nav-item img {
  width: 24px;
  height: 24px;
}

.mobile-nav-item:hover,
.mobile-nav-item.active {
  color: var(--primary);
  background-color: rgba(var(--primary-rgb), 0.1);
}

.mobile-nav-item:hover img,
.mobile-nav-item.active img {
  filter: brightness(0) saturate(100%) invert(29%) sepia(51%) saturate(3261%) hue-rotate(348deg) brightness(97%) contrast(96%);
}

/* 移动端汉堡菜单按钮 */
.mobile-menu-btn {
  display: none;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: var(--text);
  font-size: 18px;
  box-shadow: 0 2px 8px var(--shadow);
  transition: all 0.3s ease;
}

.mobile-menu-btn:hover {
  background-color: var(--bg);
  color: var(--primary);
}

@media (max-width: 767px) {
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* 移动端侧边栏抽屉 */
.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.mobile-sidebar-content {
  width: 280px;
  height: 100%;
  background-color: var(--card-bg);
  backdrop-filter: blur(8px);
  border-right: 1px solid var(--border);
  padding: 20px;
  overflow-y: auto;
}

/* 移动端布局调整 */
.mobile-layout {
  padding-bottom: 60px; /* 为移动端底部导航留出空间 */
}

.mobile-content {
  flex-direction: column !important;
}

.mobile-feed {
  height: auto !important;
  max-height: calc(100vh - 100px) !important; /* 考虑顶部空间 */
  margin: 0 !important;
  width: 100% !important;
}

@media (max-width: 767px) {
  .content-wrapper {
    flex-direction: column;
  }
}
</style>
