<template>
  <div class="voice-view">
    <div class="page-header">
      <h1 class="page-title">角色语音</h1>
      <p class="page-description">聆听可莉的声音，感受她的活力与热情</p>
    </div>

    <VoicePack @avatar-talk="emit('avatar-talk')" />
  </div>
</template>

<script setup lang="ts">
import VoicePack from '@/components/voicePack.vue'

const emit = defineEmits<{
  'avatar-talk': []
}>()
</script>

<style scoped>
.voice-view {
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
</style>
