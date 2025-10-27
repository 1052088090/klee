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

    import { ref,onMounted,nextTick } from 'vue';
    const voices = ref([])
    // 加载表情包图片
const loadVoice = async () => {
  // 注意：这里的路径是基于 Vite/Webpack 的模块解析
  const modules = import.meta.glob('@/assets/voicePack/*.{MP3,wav}');
  const voicePromises = [];

  for (const path in modules) {
    voicePromises.push(
      modules[path]?.().then((module: unknown) => ({
        // Vite 默认导出的资源 URL
        src: module.default,
        // 从路径中提取文件名作为名称
        text: path.split('/').pop()
      }))
    );
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
  // 如果点击的是正在播放的语音，则暂停
  if (currentVoice.value === index && isPlaying.value) {
    audioElements.value[index].pause();
    isPlaying.value = false;
    return;
  }

  // 停止当前正在播放的语音
  if (currentVoice.value !== -1) {
    audioElements.value[currentVoice.value].pause();
  }
  // 播放选中的语音
  currentVoice.value = index;
  audioElements.value[index].play();
  isPlaying.value = true;

  // 播放时添加角色动画效果
  const avatar = document.querySelector('.avatar');
  if (avatar) {
    avatar.classList.add('talking');
    setTimeout(() => {
      avatar.classList.remove('talking');
    }, 3000);
  }
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
  if (audio.duration) {
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
