// 音频优化一键脚本
// 用于将 WAV 文件转换为 MP3 并删除原文件

const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, 'src/assets/voicePack');

// 需要转换的 WAV 文件
const wavFiles = [
  '闲聊·收获.wav',
  '闲聊·守则.wav', 
  '闲聊·冒险.wav',
  '打雷的时候.wav',
  '刮大风了.wav',
  '下雨的时候.wav',
  '早上好.wav'
];

console.log('=== 音频优化指南 ===');
console.log('');
console.log('需要转换的文件:');
wavFiles.forEach(file => {
  const filePath = path.join(audioDir, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const sizeKB = Math.round(stats.size / 1024);
    console.log(`  ✓ ${file} (${sizeKB}KB)`);
  } else {
    console.log(`  ✗ ${file} (文件不存在)`);
  }
});

console.log('');
console.log('转换方法:');
console.log('');

console.log('方法1: 使用 FFmpeg (如果已安装)');
console.log('在 Git Bash 或 PowerShell 中执行:');
console.log('');
console.log('cd src/assets/voicePack');
wavFiles.forEach(file => {
  const mp3File = file.replace('.wav', '.mp3');
  console.log(`ffmpeg -i "${file}" -b:a 128k "${mp3File}"`);
});

console.log('');
console.log('方法2: 使用在线工具');
console.log('推荐网站: online-audio-converter.com');
console.log('设置: 输出格式MP3, 比特率128kbps');

console.log('');
console.log('方法3: 批量转换命令 (如果有 FFmpeg)');
console.log('在 src/assets/voicePack 目录下执行:');
console.log('for f in *.wav; do ffmpeg -i "$f" -b:a 128k "${f%.wav}.mp3"; done');

console.log('');
console.log('预计优化效果:');
console.log('- WAV -> MP3 (128kbps): 减少约 90% 文件大小');
console.log('- 总计可节省约 20MB+ 空间');

console.log('');
console.log('转换完成后:');
console.log('1. 检查生成的 MP3 文件');
console.log('2. 删除原始 WAV 文件');
console.log('3. 运行 npm run build 验证');