<template>
  <aside class="sidebar">
    <!-- 角色卡片 -->
    <div class="character-card">
      <div class="avatar-frame">
        <img src="@/assets/klee.png" alt="可莉" class="avatar" :class="{ talking: isTalking }">
      </div>
      <h2 class="character-name">可莉</h2>
      <p class="character-title">西风骑士团·火花骑士</p>
    </div>

    <!-- 导航按钮 -->
    <nav class="nav-buttons">
      <RouterLink to="/" class="nav-btn" :class="{ active: $route.path === '/' }">
        <span>主页</span>
        <img src="@/assets/3.png" class="nav-icon" alt="主页" />
      </RouterLink>

      <RouterLink to="/voice" class="nav-btn" :class="{ active: $route.path === '/voice' }">
        <span>角色语音</span>
        <img src="@/assets/1.png" class="nav-icon" alt="语音" />
      </RouterLink>

      <RouterLink to="/meme" class="nav-btn" :class="{ active: $route.path === '/meme' }">
        <span>表情包</span>
        <img src="@/assets/3.png" class="nav-icon" alt="表情包" />
      </RouterLink>

      <RouterLink to="/gallery" class="nav-btn" :class="{ active: $route.path === '/gallery' }">
        <span>图集</span>
        <img src="@/assets/22.png" class="nav-icon" alt="图集" />
      </RouterLink>

      <RouterLink to="/timeline" class="nav-btn" :class="{ active: $route.path === '/timeline' }">
        <span>时间线</span>
        <img src="@/assets/4.png" class="nav-icon" alt="时间线" />
      </RouterLink>

      <RouterLink to="/about" class="nav-btn" :class="{ active: $route.path === '/about' }">
        <span>关于可莉</span>
        <img src="@/assets/1.png" class="nav-icon" alt="关于" />
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isTalking = ref(false)

// 暴露方法供外部调用
defineExpose({
  startTalking: () => {
    isTalking.value = true
    setTimeout(() => {
      isTalking.value = false
    }, 3000)
  }
})
</script>

<style scoped>
.sidebar {
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (min-width: 1024px) {
  .sidebar {
    margin: 0;
  }
}

/* 移动端适配 */
@media (max-width: 767px) {
  .sidebar {
    max-width: 100%;
    padding: 16px;
  }
  
  .character-card {
    padding: 16px;
  }
  
  .avatar-frame {
    width: 120px;
    height: 120px;
    margin: 0 auto 12px;
  }
  
  .character-name {
    font-size: 20px;
  }
  
  .character-title {
    font-size: 12px;
  }
  
  .nav-btn {
    padding: 12px 10px;
    font-size: 14px;
  }
  
  .nav-icon {
    width: 24px;
    height: 24px;
  }
}

/* 角色卡片 */
.character-card {
  background-color: var(--card-bg);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border);
  text-align: center;
  transition: all 0.5s ease;
  box-shadow: 0 4px 12px var(--shadow);
}

.character-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px var(--shadow);
  border-color: var(--primary);
}

.avatar-frame {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto 16px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--border);
  background: linear-gradient(135deg, var(--bg), var(--card-bg));
  transition: all 0.5s ease;
}

.avatar.talking {
  animation: headShake 3s ease-in-out infinite;
  box-shadow: 0 0 30px rgba(var(--primary-rgb), 0.4);
}

.character-card:hover .avatar {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.3);
}

.character-name {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: all 0.3s ease;
}

.character-card:hover .character-name {
  letter-spacing: 1px;
}

.character-title {
  color: var(--text-light);
  font-size: 14px;
}

/* 导航按钮 */
.nav-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-btn {
  width: 100%;
  padding: 14px 16px;
  border-radius: 8px;
  background-color: var(--nav-bg);
  border: 1px solid var(--border);
  color: var(--nav-text);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-size: 15px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 6px var(--shadow);
  text-decoration: none;
}

.nav-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(var(--primary-rgb), 0.1), transparent);
  transition: all 0.5s ease;
}

.nav-btn:hover::after {
  left: 100%;
}

.nav-btn:hover {
  background-color: var(--card-bg);
  border-color: var(--nav-hover);
  color: var(--nav-hover);
  transform: translateX(5px);
}

.nav-btn.active {
  background: linear-gradient(90deg, rgba(var(--primary-rgb), 0.15), rgba(255, 127, 0, 0.15));
  border-color: var(--nav-active);
  color: var(--nav-active);
  box-shadow: 0 5px 15px var(--shadow);
}

.nav-icon {
  width: 30px;
  height: 30px;
}

@keyframes headShake {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
}
</style>
