<template>
  <div class="voice-section">
    <h3 class="voice-title">
      <img src="../assets/1.png" style="width: 25px;height: 25px;" alt="表情包图标" />
      表情包
    </h3>
    <div class="voice-list">
      <div style="display: flex;gap: 30px;flex-wrap: wrap;">
        <div v-if="memeData.length === 0"
          style="display: flex;align-items: center;justify-content: center;width: 100%;">
          <div>
            <img src="../assets/4.png" style="width: 150px;height: 150px;" alt="加载中" />
            <div style="width: 150px;display: flex;align-items: center;justify-content: center;">表情包正在加载中...
            </div>
          </div>
        </div>
        <div class="meme-item" v-for="(item, index) in memeData" :key="index" @click="openMemeViewer(index)">
          <img :src="item.url" :alt="item.name"
            style="width: 100px; height: 100px; cursor: pointer; transition: transform 0.3s ease;" />
        </div>
      </div>
    </div>
  </div>

  <div class="meme-viewer" v-if="isViewerOpen" @click="closeMemeViewer">
    <div class="meme-viewer-content" @click.stop>
      <button class="meme-close-btn" @click="closeMemeViewer">
        <i class="fa fa-times"></i>
      </button>

      <!-- <button class="meme-nav-btn prev" @click="prevMeme" v-if="currentMemeIndex > 0">
        <i class="fa fa-chevron-left"></i>
      </button> -->

      <div class="meme-image-container">
        <img :src="currentMeme.url" :alt="currentMeme.name" class="meme-large-image" />
      </div>

      <!-- <button class="meme-nav-btn next" @click="nextMeme" v-if="currentMemeIndex < memeData.length - 1">
        <i class="fa fa-chevron-right"></i>
      </button> -->

      <div class="meme-counter">
        {{ currentMemeIndex + 1 }} / {{ memeData.length }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// --- 状态定义 ---
// 表情包数据 (使用 any[] 或定义一个接口，这里为了简洁使用 any[])
interface ItemData {
  id: string;
  name: string;
  url: string;
}
const memeData = ref<ItemData[]>([]);
const isViewerOpen = ref(false);
const currentMemeIndex = ref(0);
const currentMeme = ref({ url: '', name: '' });

// --- 逻辑函数 ---

// 加载表情包图片
const loadMemeImages = async () => {
  // 注意：这里的路径是基于 Vite/Webpack 的模块解析
  const modules = import.meta.glob('@/assets/meme/*.{jpg,jpeg,png,gif,avif}');
  const memePromises = [];

  for (const path in modules) {
    memePromises.push(
      modules[path]?.().then((module: unknown) => ({
        // Vite 默认导出的资源 URL
        url: module.default,
        // 从路径中提取文件名作为名称
        name: path.split('/').pop()
      }))
    );
  }

  memeData.value = await Promise.all(memePromises);
  console.log('memeData', memeData.value);
};

// 打开表情包查看器
const openMemeViewer = (index: number) => {
  currentMemeIndex.value = index;
  currentMeme.value = memeData.value[index];
  isViewerOpen.value = true;
  // 防止页面滚动
  document.body.style.overflow = 'hidden';
};

// 关闭表情包查看器
const closeMemeViewer = () => {
  isViewerOpen.value = false;
  // 恢复页面滚动
  document.body.style.overflow = '';
};

// 查看上一张
const prevMeme = () => {
  if (currentMemeIndex.value > 0) {
    currentMemeIndex.value--;
    currentMeme.value = memeData.value[currentMemeIndex.value];
  }
};

// 查看下一张
const nextMeme = () => {
  if (currentMemeIndex.value < memeData.value.length - 1) {
    currentMemeIndex.value++;
    currentMeme.value = memeData.value[currentMemeIndex.value];
  }
};

// 支持键盘导航 (ESC, 左箭头, 右箭头)
const handleKeyDown = (e: KeyboardEvent) => {
  if (!isViewerOpen.value) return;

  if (e.key === 'ArrowLeft') {
    prevMeme();
  } else if (e.key === 'ArrowRight') {
    nextMeme();
  } else if (e.key === 'Escape') {
    closeMemeViewer();
  }
};

// --- 生命周期钩子 ---

onMounted(() => {
  // 加载表情包数据
  loadMemeImages();
  // 监听键盘事件
  window.addEventListener('keydown', handleKeyDown);
});

// ⭐ 优化点：使用 onUnmounted 正确清理事件监听，避免内存泄漏
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
/* ========================= */
/* ⭐ 可莉牌表情包查看器样式升级部分 ⭐ */
/* ========================= */

.meme-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 使用主题色做半透明渐变背景，更有层次感 */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(5px);
}

.meme-viewer-content {
  position: relative;
  max-width: 95%;
  max-height: 95%;
  padding: 20px;
  background-color: var(--card-bg);
  border-radius: 16px;
  /* 像炸弹爆炸一样的红色系阴影 */
  box-shadow: 0 8px 30px rgba(var(--primary-rgb), 0.3);
}

.meme-large-image {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  /* 动画效果，让图片弹入 */
  animation: fadeInScale 0.3s ease-out;
}

/* 关闭按钮 - 可爱小徽章样式 */
.meme-close-btn {
  /* 调整位置，使其突出于卡片 */
  position: absolute;
  top: -15px;
  right: -15px;
  background: var(--primary);
  border: 3px solid var(--card-bg);
  color: var(--card-bg);
  font-size: 18px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  transition: transform 0.3s ease, background-color 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.meme-close-btn:hover {
  background-color: var(--secondary-2);
  transform: rotate(90deg) scale(1.1);
}

/* 导航按钮 - 左右箭头 */
.meme-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(var(--primary-rgb), 0.8);
  border: 2px solid var(--card-bg);
  color: var(--card-bg);
  font-size: 24px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 1; /* 始终保持可见 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.meme-nav-btn:hover {
  background-color: var(--secondary-2);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 0 10px rgba(var(--secondary-2-rgb), 0.5);
}

.meme-nav-btn.prev {
  left: -25px;
}

.meme-nav-btn.next {
  right: -25px;
}

/* 计数器 - 移到卡片内部底部 */
.meme-counter {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text);
  background-color: var(--code-bg);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* 图片弹入动画 */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}


/* ========================= */
/* 原始列表样式（保留并优化） */
/* ========================= */

.meme-item {
  display: flex;
  align-items: center;
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.meme-item img:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.2);
}

/* 移除重复的样式定义，只保留一个版本 */
.meme-item:hover::after {
  left: 150%;
}

.meme-item::after {
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

.meme-item:hover {
  border-color: var(--primary);
  transform: translateY(-2px); /* 向上轻微浮动 */
  box-shadow: 0 4px 10px rgba(var(--primary-rgb), 0.1);
  background-color: var(--card-bg);
}

/* 原有的 icon 样式 (如果没用到，可以删除) */
.meme-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.2), rgba(var(--secondary-2-rgb), 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  font-size: 20px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}
</style>
