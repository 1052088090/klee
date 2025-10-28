<template>
      <div class="voice-section">
            <h3 class="voice-title">
              <img src="@/assets/1.png" style="width: 25px;height: 25px;" />
              角色语音
            </h3>
            <div class="voice-list">
              <div class="voice-item" v-for="(voice, index) in voices" :key="index" @click="playVoice(index)">
                <div class="voice-play-btn" :class="{ playing: currentVoice === index && isPlaying }">
                  <i class="fa" :class="currentVoice === index && isPlaying ? 'fa-pause' : 'fa-play'"></i>
                </div>
                <div class="voice-text">
                  <p>{{ voice.text }}</p>
                  <div class="voice-tags">
                    <span class="voice-tag">日常</span>
                  </div>
                </div>
                <audio ref="audioElements" :src="voice.src" @ended="onAudioEnded"
                  @timeupdate="updateProgress(index)"></audio>
                <div class="voice-progress" v-if="currentVoice === index">
                  <div class="progress-bar" :style="{ width: progress + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
    </template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

// 定义事件
const emit = defineEmits<{
  'avatar-talk': []
}>()

// 定义语音数据类型
interface VoiceData {
  src: string
  text: string
}

const voices = ref<VoiceData[]>([])

// 加载语音文件
const loadVoice = async () => {
  const modules = import.meta.glob('@/assets/voicePack/*.{mp3,wav}');
  const voicePromises: Promise<VoiceData>[] = [];

  for (const path in modules) {
    const promise = modules[path]?.().then((module: unknown) => {
      const typedModule = module as { default: string };
      return {
        src: typedModule.default,
        text: path.split('/').pop()?.replace(/\.(mp3|wav)$/i, '') || '未知'
      };
    });
    if (promise) {
      voicePromises.push(promise);
    }
  }

  voices.value = await Promise.all(voicePromises);
};

loadVoice()

// 语音播放控制
const audioElements = ref<HTMLAudioElement[]>([]);
const currentVoice = ref(-1);
const isPlaying = ref(false);
const progress = ref(0);

// 播放/暂停语音
const playVoice = (index: number) => {
  const audio = audioElements.value[index];
  if (!audio) return;

  // 如果点击的是正在播放的语音，则暂停
  if (currentVoice.value === index && isPlaying.value) {
    audio.pause();
    isPlaying.value = false;
    return;
  }

  // 停止当前正在播放的语音
  if (currentVoice.value !== -1) {
    const currentAudio = audioElements.value[currentVoice.value];
    if (currentAudio) {
      currentAudio.pause();
    }
  }

  // 播放选中的语音
  currentVoice.value = index;
  audio.play();
  isPlaying.value = true;

  // 触发头像动画
  emit('avatar-talk');
};

// 音频播放结束
const onAudioEnded = () => {
  isPlaying.value = false;
  progress.value = 0;
};

// 更新播放进度
const updateProgress = (index: number) => {
  if (currentVoice.value !== index) return;

  const audio = audioElements.value[index];
  if (audio && audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
};

onMounted(() => {
  // 初始化音频元素引用
  nextTick(() => {
    const audios = document.querySelectorAll('audio');
    audioElements.value = Array.from(audios) as HTMLAudioElement[];
  })
});
</script>

<style scoped>
/* 语音区块样式 */
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

.voice-item::after {
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

.voice-item:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(var(--primary-rgb), 0.1);
  background-color: var(--card-bg);
}

.voice-item:hover::after {
  left: 150%;
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

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}
</style>
