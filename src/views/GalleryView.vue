<template>
  <div class="gallery-view">
    <div class="page-header">
      <h1 class="page-title">图集</h1>
      <p class="page-description">可莉的精美图片收藏</p>
    </div>

    <div class="gallery-grid">
      <div v-for="(image, index) in images" :key="index" class="gallery-item" @click="openImage(index)">
        <img :src="image.src" :alt="image.title" />
        <div class="gallery-overlay">
          <h3>{{ image.title }}</h3>
          <p>{{ image.description }}</p>
        </div>
      </div>
    </div>

    <!-- 图片查看器 -->
    <Teleport to="body">
      <div v-if="isViewerOpen" class="image-viewer" @click="closeViewer">
        <div class="viewer-content" @click.stop>
          <button class="viewer-close" @click="closeViewer">
            <i class="fa fa-times"></i>
          </button>
          <img :src="currentImage.src" :alt="currentImage.title" />
          <div class="viewer-info">
            <h3>{{ currentImage.title }}</h3>
            <p>{{ currentImage.description }}</p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface GalleryImage {
  src: string
  title: string
  description: string
}

const images = ref<GalleryImage[]>([
  {
    src: new URL('@/assets/3.8.png', import.meta.url).href,
    title: '清夏！乐园？大秘境！',
    description: '可莉的夏日冒险'
  },
  {
    src: new URL('@/assets/2.8.png', import.meta.url).href,
    title: '仲夏！幻夜？奇想曲！',
    description: '魔法般的夏日夜晚'
  },
  {
    src: new URL('@/assets/ddk.png', import.meta.url).href,
    title: '嘟嘟可故事集',
    description: '可莉与嘟嘟可的故事'
  },
  {
    src: new URL('@/assets/klee.png', import.meta.url).href,
    title: '火花骑士可莉',
    description: '西风骑士团最可爱的成员'
  }
])

const isViewerOpen = ref(false)
const currentImageIndex = ref(0)
const currentImage = ref<GalleryImage>(images.value[0]!)

const openImage = (index: number) => {
  const image = images.value[index]
  if (!image) return

  currentImageIndex.value = index
  currentImage.value = image
  isViewerOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeViewer = () => {
  isViewerOpen.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped>
.gallery-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-header {
  background-color: var(--card-bg);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 32px 24px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 12px var(--shadow);
  text-align: center;
  transition: all 0.3s ease;
}

.page-header:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px var(--shadow);
  border-color: var(--primary);
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 12px;
}

.page-description {
  color: var(--text-light);
  font-size: 16px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid var(--border);
  background-color: var(--card-bg);
  transition: all 0.3s ease;
  aspect-ratio: 4/3;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px var(--shadow);
  border-color: var(--primary);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 20px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  color: white;
}

.gallery-item:hover .gallery-overlay {
  transform: translateY(0);
}

.gallery-overlay h3 {
  font-size: 16px;
  margin-bottom: 4px;
}

.gallery-overlay p {
  font-size: 13px;
  opacity: 0.9;
}

/* 图片查看器 */
.image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  backdrop-filter: blur(5px);
}

.viewer-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background-color: var(--card-bg);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 30px rgba(var(--primary-rgb), 0.3);
}

.viewer-content img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 12px;
}

.viewer-close {
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
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.viewer-close:hover {
  background-color: var(--secondary-2);
  transform: rotate(90deg) scale(1.1);
}

.viewer-info {
  margin-top: 16px;
  text-align: center;
}

.viewer-info h3 {
  font-size: 20px;
  color: var(--text);
  margin-bottom: 8px;
}

.viewer-info p {
  color: var(--text-light);
  font-size: 14px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .page-header {
    padding: 24px 16px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .page-description {
    font-size: 14px;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }
  
  .gallery-item {
    border-radius: 8px;
  }
  
  .gallery-overlay {
    padding: 12px;
  }
  
  .gallery-overlay h3 {
    font-size: 14px;
  }
  
  .gallery-overlay p {
    font-size: 11px;
  }
  
  .viewer-content {
    padding: 15px;
  }
  
  .viewer-content img {
    max-height: 60vh;
  }
  
  .viewer-info h3 {
    font-size: 18px;
  }
  
  .viewer-info p {
    font-size: 13px;
  }
  
  .viewer-close {
    width: 32px;
    height: 32px;
    font-size: 16px;
    top: -12px;
    right: -12px;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }
  
  .gallery-item {
    aspect-ratio: 3/3; /* 方形图片 */
  }
  
  .viewer-content {
    padding: 10px;
    margin: 0 10px;
  }
}
</style>
