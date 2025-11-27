<template>
  <div class="voice-section">
    </div>

  <div class="meme-viewer" v-if="isViewerOpen" @click="closeMemeViewer">
    <div class="meme-viewer-content" @click.stop>
      <button class="meme-close-btn" @click="closeMemeViewer">
        <i class="fa fa-times"></i>
      </button>
      <div class="meme-image-container">
        <img :src="currentMeme.url" :alt="currentMeme.name" class="meme-large-image" />
      </div>
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
  const memePromises: Promise<ItemData>[] = [];

  for (const path in modules) {
    const promise = modules[path]?.().then((module: unknown) => {
      // 类型检查并转换
      const typedModule = module as { default: string };
      return {
        // 生成唯一ID
        id: path,
        // Vite 默认导出的资产 URL
        url: typedModule.default,
        // 从路径中提取文件名作为名称
        name: path.split('/').pop() || ''
      };
    });
    if (promise) {
      memePromises.push(promise);
    }
  }

  memeData.value = await Promise.all(memePromises);
  console.log('memeData', memeData.value);
};

// 打开表情包查看器
const openMemeViewer = (index: number) => {
  currentMemeIndex.value = index;
  const meme = memeData.value[index];
  if (meme) {
    currentMeme.value = { url: meme.url, name: meme.name };
  }
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
    const meme = memeData.value[currentMemeIndex.value];
    if (meme) {
      currentMeme.value = { url: meme.url, name: meme.name };
    }
  }
};

// 查看下一张
const nextMeme = () => {
  if (currentMemeIndex.value < memeData.value.length - 1) {
    currentMemeIndex.value++;
    const meme = memeData.value[currentMemeIndex.value];
    if (meme) {
      currentMeme.value = { url: meme.url, name: meme.name };
    }
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
/* 语音区块样式（表情包区块复用） */
.voice-section {
  background-color: var(--card-bg);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 12px var(--shadow);
  transition: all 0.3s ease;
}

.voice-section:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px var(--shadow);
  border-color: var(--primary);
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

/* 移动端适配 */
@media (max-width: 768px) {
  .voice-section {
    padding: 12px;
  }
  
  .voice-title {
    font-size: 14px;
  }
  
  .meme-item {
    padding: 8px;
  }
  
  .meme-item img {
    width: 80px !important;
    height: 80px !important;
  }
  
  .meme-viewer-content {
    padding: 10px;
  }
  
  .meme-large-image {
    max-height: 60vh;
  }
  
  .meme-nav-btn {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  
  .meme-nav-btn.prev {
    left: -20px;
  }
  
  .meme-nav-btn.next {
    right: -20px;
  }
}

@media (max-width: 480px) {
  .meme-item {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  
  .meme-item img {
    width: 60px !important;
    height: 60px !important;
  }
  
  .meme-nav-btn {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }
  
  .meme-nav-btn.prev {
    left: -15px;
  }
  
  .meme-nav-btn.next {
    right: -15px;
  }
  
  .meme-counter {
    font-size: 12px;
    padding: 4px 10px;
  }
}
</style>
