<template>
  <div class="home-view">
    <!-- 表情包展示区域 -->
    <MeMe />

    <!-- 角色语音展示区域 -->
    <VoicePack @avatar-talk="emit('avatar-talk')" />

    <!-- 角色故事 -->
    <div class="voice-section">
      <h3 class="section-title">
        <img src="@/assets/1.png" style="width: 25px;height: 25px;" alt="图标" />
        清夏！乐园？大秘境！
      </h3>
      <div class="story-content">
        <div class="post-image-container">
          <img src="@/assets/3.8.png" alt="可莉战斗" class="post-image">
        </div>
      </div>
    </div>

    <div class="voice-section">
      <h3 class="section-title">
        <img src="@/assets/1.png" style="width: 25px;height: 25px;" alt="图标" />
        仲夏！幻夜？奇想曲！
      </h3>
      <div class="story-content">
        <div class="post-image-container">
          <img src="@/assets/2.8.png" alt="可莉战斗" class="post-image">
        </div>
      </div>
    </div>

    <div class="voice-section">
      <h3 class="section-title">
        <img src="@/assets/1.png" style="width: 25px;height: 25px;" alt="图标" />
        嘟嘟可故事集
      </h3>
      <div class="story-content">
        <div class="post-image-container">
          <img src="@/assets/ddk.png" alt="可莉战斗" class="post-image">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MeMe from '@/components/emoticon.vue'
import VoicePack from '@/components/voicePack.vue'

const emit = defineEmits<{
  'avatar-talk': []
}>()
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

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

.story-content {
  margin-top: 12px;
}

.post-image-container {
  background-color: var(--bg);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
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
  transform: scale(1.05);
}
</style>
