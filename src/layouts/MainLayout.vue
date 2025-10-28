<template>
  <div class="app-container">
    <!-- 背景装饰 -->
    <div class="bg-decorations">
      <div class="bg-blur blur-1"></div>
      <div class="bg-blur blur-2"></div>
      <div class="bg-blur blur-3"></div>
    </div>

    <!-- 主容器 -->
    <div class="main-container">
      <div class="content-wrapper">
        <!-- 左侧侧边栏 -->
        <Sidebar ref="sidebarRef" />

        <!-- 主内容区 -->
        <main class="feed">
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
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const sidebarRef = ref<InstanceType<typeof Sidebar>>()

const handleAvatarTalk = () => {
  sidebarRef.value?.startTalking()
}
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
</style>
