<template>
  <div class="timeline-view">
    <div class="page-header">
      <h1 class="page-title">时间线</h1>
      <p class="page-description">可莉的成长与冒险历程</p>
    </div>

    <div class="timeline">
      <div v-for="(event, index) in timelineEvents" :key="index" class="timeline-item" :class="{ left: index % 2 === 0, right: index % 2 === 1 }">
        <div class="timeline-content">
          <div class="timeline-date">{{ event.date }}</div>
          <h3 class="timeline-title">{{ event.title }}</h3>
          <p class="timeline-description">{{ event.description }}</p>
          <div v-if="event.image" class="timeline-image">
            <img :src="event.image" :alt="event.title" />
          </div>
        </div>
        <div class="timeline-marker"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TimelineEvent {
  date: string
  title: string
  description: string
  image?: string
}

const timelineEvents = ref<TimelineEvent[]>([
  {
    date: '1.0 版本',
    title: '初次登场',
    description: '可莉作为五星火属性角色首次在《原神》中登场，成为蒙德城的标志性角色之一。',
    image: new URL('@/assets/klee.png', import.meta.url).href
  },
  {
    date: '1.6 版本',
    title: '仲夏！幻夜？奇想曲！',
    description: '可莉的第一个专属活动，玩家们跟随可莉探索金苹果群岛的奇妙冒险。',
    image: new URL('@/assets/2.8.png', import.meta.url).href
  },
  {
    date: '2.8 版本',
    title: '清夏！乐园？大秘境！',
    description: '金苹果群岛再次开放，可莉与大家一起度过了美好的夏日时光。',
    image: new URL('@/assets/3.8.png', import.meta.url).href
  },
  {
    date: '3.8 版本',
    title: '第三次金苹果群岛',
    description: '金苹果群岛第三次开放，可莉继续她的冒险之旅。'
  },
  {
    date: '嘟嘟可',
    title: '嘟嘟可故事集',
    description: '可莉最喜欢的玩具和好朋友，陪伴她度过了无数快乐时光。',
    image: new URL('@/assets/ddk.png', import.meta.url).href
  }
])
</script>

<style scoped>
.timeline-view {
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

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, var(--primary), var(--accent));
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
}

.timeline-item.left {
  justify-content: flex-end;
  padding-right: calc(50% + 40px);
}

.timeline-item.right {
  justify-content: flex-start;
  padding-left: calc(50% + 40px);
}

.timeline-content {
  background-color: var(--card-bg);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 12px var(--shadow);
  transition: all 0.3s ease;
  max-width: 400px;
}

.timeline-content:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 20px var(--shadow);
  border-color: var(--primary);
}

.timeline-date {
  display: inline-block;
  background: linear-gradient(90deg, var(--primary), var(--secondary-2));
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
}

.timeline-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
}

.timeline-description {
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 12px;
}

.timeline-image {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.timeline-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.timeline-content:hover .timeline-image img {
  transform: scale(1.05);
}

.timeline-marker {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--primary);
  border: 4px solid var(--card-bg);
  box-shadow: 0 0 0 4px var(--border);
  z-index: 10;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-marker {
  transform: translateX(-50%) scale(1.3);
  box-shadow: 0 0 0 4px var(--primary), 0 0 20px rgba(var(--primary-rgb), 0.5);
}

/* 移动端样式 */
@media (max-width: 768px) {
  .timeline::before {
    left: 20px;
  }

  .timeline-item.left,
  .timeline-item.right {
    justify-content: flex-start;
    padding-left: 60px;
    padding-right: 0;
  }

  .timeline-marker {
    left: 20px;
  }

  .timeline-item:hover .timeline-marker {
    transform: translateX(0) scale(1.3);
  }
}
</style>
