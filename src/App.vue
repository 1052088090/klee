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
        <!-- 左侧角色信息 -->
        <aside class="sidebar">
          <!-- 角色卡片 -->
          <div class="character-card">
            <div class="avatar-frame">
              <img src="./assets/klee.png" alt="可莉" class="avatar">

            </div>
            <h2 class="character-name">可莉</h2>
            <p class="character-title">西风骑士团·火花骑士</p>
          </div>
          <!-- 导航按钮 -->
          <div class="nav-buttons">
            <button  :class="
            {
              'nav-btn':true,
              active:navValue === 'all'
            }
            " @click="navValue = 'all'">
              <span>所有</span>
              <img src="./assets/3.png" class="nav-icon" />
            </button>

            <button class="nav-btn" :class="
            {
              'nav-btn':true,
              active:navValue === 'meme'
            }
            " @click="navValue = 'meme'">
              <span>表情包</span>
              <img src="./assets/3.png" class="nav-icon" />
            </button>

            <button class="nav-btn" :class="
            {
              'nav-btn':true,
              active:navValue === 'voice'
            }
            " @click="navValue = 'voice'">
              <span>角色语音</span>
              <img src="./assets/1.png" class="nav-icon" />
            </button>

            <button :class="
            {
              'nav-btn':true,
              active:navValue === 'others'
            }
            " @click="navValue = 'others'">
              <span>角色故事</span>
              <img src="./assets/3.png" class="nav-icon" />
            </button>
          </div>

        </aside>

        <!-- 主内容区 - 角色展示 -->
        <main class="feed">
          <!-- 表情包展示区域 -->
           <MeMe v-if="['all','meme'].includes(navValue)" />


          <!-- 角色语音展示区域 -->
           <voicePack v-if="['all','voice'].includes(navValue)" />


           <div class="voice-section" v-if="['all','others'].includes(navValue)">
            <h3 class="voice-title">
              <img src="./assets/1.png" style="width: 25px;height: 25px;" />
              清夏！乐园？大秘境！
            </h3>
            <div class="voice-list">
               <div class="post-image-container">
              <img src="./assets/3.8.png" alt="可莉战斗" class="post-image">
            </div>
            </div>
          </div>
              <div class="voice-section" v-if="['all','others'].includes(navValue)">
            <h3 class="voice-title">
              <img src="./assets/1.png" style="width: 25px;height: 25px;" />
              仲夏！幻夜？奇想曲！
            </h3>
            <div class="voice-list">
               <div class="post-image-container">
              <img src="./assets/2.8.png" alt="可莉战斗" class="post-image">
            </div>
            </div>
          </div>
               <div class="voice-section" v-if="['all','others'].includes(navValue)">
            <h3 class="voice-title">
              <img src="./assets/1.png" style="width: 25px;height: 25px;" />
              嘟嘟可故事集
            </h3>
            <div class="voice-list">
               <div class="post-image-container">
              <img src="./assets/ddk.png" alt="可莉战斗" class="post-image">
            </div>
            </div>
          </div>

        </main>
      </div>


    </div>

    <!-- 装饰元素  -->
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
import { ref, onMounted, nextTick } from 'vue';
import MeMe from '@/components/emoticon.vue'
import voicePack from '@/components/voicePack.vue'
const navValue = ref('all')






// 语音播放控制
const audioElements = ref<HTMLAudioElement[]>([]);



onMounted(() => {
  // 初始化音频元素引用
  nextTick(() => {
    const audios = document.querySelectorAll('audio');
    audioElements.value = Array.from(audios) as HTMLAudioElement[];
});
})
</script>

<style>
.nav-icon {
  width: 30px;
  height: 30px;
}

/* 全局主题变量 */
:root {
  /* 亮色主题变量 */
  --primary: #E62E2E;
  --secondary-1: #8B4513;
  --secondary-2: #FF7F00;
  --accent: #FFD700;
  --bg: #F5F5DC;
  --card-bg: #FFFFFF;
  --text: #333333;
  --text-light: #5A5A5A;
  --border: #D8C8A0;
  --shadow: rgba(139, 69, 19, 0.15);
  --nav-bg: rgba(245, 245, 220, 0.95);
  --nav-text: #333333;
  --nav-hover: #E62E2E;
  --nav-active: #FF7F00;
  --btn-primary-bg: #E62E2E;
  --btn-primary-text: #F5F5DC;
  --btn-secondary-bg: #8B4513;
  --btn-secondary-text: #F5F5DC;
  --accent-light: #FFE580;
  --success: #4CAF50;
  --success-light: #66BB6A;
  --warning: #FF9800;
  --warning-light: #FFA726;
  --danger: #F44336;
  --danger-light: #EF5350;
  --bomb-color: #4a4a4a;
  --bomb-highlight: #2a2a2a;
  --fuse-color: #8B4513;
  --spark-color: #FF7F00;
  --explosion-core: #FFD700;
  --explosion-ring: #FF5252;
  --code-bg: #ede0c0;
  --primary-rgb: 230, 46, 46;
}

.dark {
  /* 暗色主题变量 */
  --primary: #FF5252;
  --secondary-1: #A5673F;
  --secondary-2: #FF9A3D;
  --accent: #FFE066;
  --bg: #1A1A1A;
  --card-bg: #2A2A2A;
  --text: #E0E0E0;
  --text-light: #AAAAAA;
  --border: #5D2E0F;
  --shadow: rgba(0, 0, 0, 0.4);
  --nav-bg: rgba(26, 26, 26, 0.95);
  --nav-text: #E0E0E0;
  --nav-hover: #FF9A3D;
  --nav-active: #FFE066;
  --btn-primary-bg: #FF5252;
  --btn-primary-text: #1A1A1A;
  --btn-secondary-bg: #A5673F;
  --btn-secondary-text: #F5F5DC;
  --accent-light: #FFE066;
  --success: #66BB6A;
  --success-light: #81C784;
  --warning: #FFA726;
  --warning-light: #FFB74D;
  --danger: #EF5350;
  --danger-light: #E57373;
  --bomb-color: #333;
  --bomb-highlight: #222;
  --fuse-color: #5D2E0F;
  --spark-color: #FF9A3D;
  --explosion-core: #FFE066;
  --explosion-ring: #FF5252;
  --code-bg: #30251d;
  --primary-rgb: 255, 82, 82;
}

/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  transition: all 0.3s ease;
  /* 全局过渡效果增强 */
}

.app-container {
  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  position: relative;
  overflow-x: hidden;
}

/* 背景装饰 - 增强动画 */
.bg-decorations {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.bg-blur {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
  animation: float 15s ease-in-out infinite;
  /* 背景模糊块添加浮动动画 */
}

.blur-1 {
  top: 20%;
  left: 15%;
  width: 500px;
  height: 500px;
  background-color: var(--primary);
  animation-delay: 0s;
}

.blur-2 {
  bottom: 25%;
  right: 20%;
  width: 450px;
  height: 450px;
  background-color: var(--secondary-2);
  animation-delay: 3s;
}

.blur-3 {
  top: 60%;
  left: 60%;
  width: 400px;
  height: 400px;
  background-color: var(--accent);
  animation-delay: 6s;
}

/* 主容器 */
.main-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  position: relative;
  z-index: 10;
}

/* 顶部导航 - 增强交互 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.logo:hover .logo-icon {
  transform: rotate(360deg) scale(1.1);
}

.logo-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary-2));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  transition: all 0.5s ease;
  /* 旋转动画 */
}

.header h1 {
  font-size: 22px;
  font-weight: 600;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: all 0.3s ease;
}

.logo:hover h1 {
  transform: translateX(5px);
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background-color: rgba(var(--primary-rgb), 0.1);
  border-color: var(--primary);
  transform: rotate(90deg) scale(1.1);
  color: var(--primary);
}

/* 内容布局 */
.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 100vh;
}

@media (min-width: 1024px) {
  .content-wrapper {
    flex-direction: row;
  }
}

/* 侧边栏 */
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

/* 角色卡片 - 增强悬停效果 */
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

/* 语音播放时头像动画 */
.avatar.talking {
  animation: headShake 3s ease-in-out infinite;
  box-shadow: 0 0 30px rgba(var(--primary-rgb), 0.4);
}

.character-card:hover .avatar {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.3);
}

.avatar-overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--card-bg);
  border: 2px solid var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  animation: pulse 2s infinite;
}

.element-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary-2));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
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
  margin-bottom: 20px;
}

.level-info {
  margin-bottom: 24px;
}

.level-bar {
  width: 100%;
  height: 6px;
  background-color: var(--border);
  border-radius: 3px;
  margin-bottom: 6px;
  overflow: hidden;
}

.level-fill {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary-2));
  border-radius: 3px;
  animation: levelPulse 3s infinite;
  /* 等级条呼吸效果 */
}

.level-text {
  font-size: 13px;
  color: var(--text-light);
}

.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-item {
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px;
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: scale(1.05);
  background-color: var(--card-bg);
  border-color: var(--primary);
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 2px;
  color: var(--text);
}

.stat-label {
  font-size: 12px;
  color: var(--text-light);
}

/* 角色语音区域样式 */
.voice-section {
  background-color: var(--card-bg);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 12px var(--shadow);
}

.voice-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: var(--primary);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.voice-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.voice-item {
  display: flex;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  background-color: var(--bg);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.voice-item:hover {
  background-color: var(--card-bg);
  border-color: var(--primary);
  transform: translateX(5px);
}

.voice-play-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.voice-play-btn.playing {
  background-color: rgba(var(--primary-rgb), 0.3);
  animation: pulse 1.5s infinite;
}

.voice-play-btn:hover {
  transform: scale(1.15);
  background-color: rgba(var(--primary-rgb), 0.25);
}

.voice-text {
  flex: 1;
  min-width: 0;
}

.voice-text p {
  font-size: 14px;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

.voice-tags {
  display: flex;
  gap: 6px;
}

.voice-tag {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
}

.voice-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--border);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary-2));
  transition: width 0.1s linear;
}

audio {
  display: none;
}

/* 导航按钮 - 增强交互 */
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
  background: linear-gradient(90deg, rgba(var(--primary-rgb), 0.15), rgba(var(--secondary-2-rgb), 0.15));
  border-color: var(--nav-active);
  color: var(--nav-active);
  box-shadow: 0 5px 15px var(--shadow);
}

.nav-btn.active i {
  animation: bounce 1s infinite;
}

/* 状态条 */
.status-bar {
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px var(--shadow);
}

.status-bar:hover {
  border-color: var(--primary);
  background-color: var(--bg);
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--primary);
  animation: pulse 1.5s infinite;
  box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.5);
}

.status-bar p {
  font-size: 14px;
  color: var(--text-light);
}

/* 主内容区 */
.feed {
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: calc(100vh - 50px);
  padding: 10px;
  overflow-y: auto;
}

.feed::-webkit-scrollbar {
  display: none;
  /* 隐藏滚动条 */
}

@media (min-width: 1024px) {
  .feed {
    margin: 0;
  }
}

/* 帖子样式 - 增强动画 */
.post {
  background-color: var(--card-bg);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: top center;
  box-shadow: 0 4px 12px var(--shadow);
}

.post:hover {
  border-color: var(--primary);
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 20px 30px var(--shadow);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.author-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid var(--border);
  transition: all 0.3s ease;
}

.author-avatar:hover {
  transform: scale(1.15) rotate(5deg);
  border-color: var(--primary);
}

.system-avatar {
  background: linear-gradient(135deg, var(--bg), var(--card-bg));
  color: var(--primary);
  font-size: 20px;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-name {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  font-size: 16px;
}

.verified {
  color: var(--primary);
  font-size: 14px;
  transition: all 0.3s ease;
}

.author-avatar:hover+.author-info .verified {
  transform: rotate(360deg);
}

.post-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text);
  transition: all 0.3s ease;
}

.post:hover .post-title {
  color: var(--primary);
  letter-spacing: 0.5px;
}

.post-content {
  color: var(--text-light);
  margin-bottom: 20px;
  line-height: 1.6;
  font-size: 15px;
}

.hashtag {
  color: var(--primary);
  font-weight: 500;
  transition: all 0.3s ease;
}

.hashtag:hover {
  color: var(--secondary-2);
  letter-spacing: 1px;
  cursor: pointer;
}

/* 卡片展示 - 强化卡片动画 */
.card-showcase {
  border-color: var(--border);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.card-item {
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: center;
  position: relative;
}

.card-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.1));
  z-index: 1;
  opacity: 0;
  transition: all 0.3s ease;
}

.card-item:hover {
  transform: translateY(-10px) scale(1.08);
  box-shadow: 0 15px 30px var(--shadow);
  z-index: 20;
  border-color: var(--primary);
}

.card-item:hover::before {
  opacity: 1;
}

.card-item.rare {
  border-color: var(--secondary-2);
  position: relative;
}

.card-item.rare::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--secondary-2), var(--accent));
}

.card-item.rare:hover {
  transform: translateY(-12px) scale(1.1);
  box-shadow: 0 20px 35px var(--shadow);
}

.card-rank {
  font-size: 12px;
  text-align: center;
  padding: 4px;
  background-color: var(--card-bg);
  color: var(--text-light);
  position: relative;
  z-index: 2;
}

.card-item.rare .card-rank {
  background: linear-gradient(90deg, rgba(var(--secondary-2-rgb), 0.2), rgba(var(--accent-rgb), 0.2));
  color: var(--secondary-2);
}

.card-item img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
  transition: all 0.5s ease;
}

.card-item:hover img {
  transform: scale(1.15);
}

.card-name {
  text-align: center;
  padding: 8px;
  font-size: 14px;
  background-color: var(--card-bg);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  color: var(--text);
}

.card-item:hover .card-name {
  background-color: var(--bg);
  color: var(--primary);
}

/* 技能预览 - 增强动画 */
.skill-preview {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.skill-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(var(--primary-rgb), 0.1), transparent);
  transform: skewX(-25deg);
  transition: all 0.7s ease;
}



.skill-info h3 {
  font-size: 16px;
  margin-bottom: 4px;
  color: var(--text);
}

.skill-info p {
  font-size: 14px;
  color: var(--text-light);
}

/* 帖子图片 - 增强缩放效果 */
.post-image-container {
  background-color: var(--bg);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.post-image-container:hover {
  border-color: var(--primary);
  box-shadow: 0 10px 25px var(--shadow);
}

.post-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.post-image:hover {
  transform: scale(1.07);
}

/* 帖子操作按钮 - 增强反馈 */
.post-actions {
  display: flex;
  gap: 24px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
}

.action-btn:hover {
  color: var(--primary);
  transform: translateY(-5px) scale(1.1);
  background-color: rgba(var(--primary-rgb), 0.1);
}

.action-btn:active {
  transform: translateY(-2px) scale(1.05);
}

.action-btn i {
  transition: all 0.3s ease;
}

.action-btn:hover i {
  transform: scale(1.3);
  margin-right: 3px;
}

/* 点赞按钮特殊样式 */
.like-btn .fa-heart {
  color: var(--primary);
  /* 可莉主题红 */
  animation: heartBeat 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.like-btn:hover .fa-heart-o {
  color: var(--primary);
}

.like-btn:active .fa-heart {
  transform: scale(1.5);
}

/* 底部信息 */
.footer-info {
  margin-top: 40px;
  font-size: 12px;
  color: var(--text-light);
  text-align: center;
  padding: 16px;
  transition: all 0.5s ease;
}

.footer-info:hover {
  color: var(--primary);
  letter-spacing: 1px;
}

/* 装饰元素 - 增强浮动效果 */
.card-decoration {
  position: fixed;
  color: rgba(var(--primary-rgb), 0.15);
  animation: float 8s ease-in-out infinite;
  pointer-events: none;
  transform-origin: center;
  transition: all 1s ease;
}

.card-decoration:hover {
  color: rgba(var(--primary-rgb), 0.3);
  transform: scale(1.2) rotate(0deg);
  z-index: 5;
}

.card-1 {
  right: 5%;
  top: 20%;
  font-size: 140px;
  transform: rotate(15deg);
}

.card-2 {
  left: 8%;
  bottom: 30%;
  font-size: 110px;
  transform: rotate(-10deg);
  animation-delay: 2s;
}

.card-3 {
  left: 30%;
  top: 70%;
  font-size: 90px;
  transform: rotate(5deg);
  animation-delay: 4s;
}

/* 动画定义 */
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(15deg);
  }

  50% {
    transform: translateY(-25px) rotate(15deg);
  }
}

@keyframes levelPulse {

  0%,
  100% {
    box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.3);
  }

  50% {
    box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.6);
  }
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

/* 爱心点击动画 */
@keyframes heartBeat {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}

/* 角色说话时的头部动画 */
@keyframes headShake {

  0%,
  100% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(-5deg);
  }

  75% {
    transform: rotate(5deg);
  }
}

.nav-icon {
  width: 30px;
  height: 30px;
}

</style>
