#!/bin/bash

# 批量优化脚本 - 需要手动执行的步骤

echo "=== 资源优化指南 ==="
echo ""

echo "1. PNG 转 WebP (需要在线工具或 ImageMagick):"
echo "   将以下文件转换为 WebP 格式，质量设置为 75%:"
echo "   - 3.8.png (7.2MB) -> 3.8.webp"
echo "   - ddk.png (3.1MB) -> ddk.webp" 
echo "   - klee.png (753KB) -> klee.webp"
echo "   - 1.png (395KB) -> 1.webp"
echo "   - 3.png (386KB) -> 3.webp"
echo "   - 4.png (318KB) -> 4.webp"
echo "   - 2.8.png (300KB) -> 2.8.webp"
echo "   - 22.png (163KB) -> 22.webp"
echo ""

echo "2. WAV 转 MP3 (需要 FFmpeg 或在线工具):"
echo "   将以下音频文件转换为 MP3，比特率 128kbps:"
echo "   - 闲聊·收获.wav (4.8MB) -> 闲聊·收获.mp3"
echo "   - 闲聊·守则.wav (4.9MB) -> 闲聊·守则.mp3"
echo "   - 闲聊·冒险.wav (3.9MB) -> 闲聊·冒险.mp3"
echo "   - 打雷的时候.wav (3.2MB) -> 打雷的时候.mp3"
echo "   - 刮大风了.wav (3.1MB) -> 刮大风了.mp3"
echo "   - 下雨的时候.wav (2.7MB) -> 下雨的时候.mp3"
echo "   - 早上好.wav (2.4MB) -> 早上好.mp3"
echo ""

echo "3. 在线工具推荐:"
echo "   - PNG转WebP: squoosh.app 或 tinypng.com"
echo "   - WAV转MP3: online-audio-converter.com"
echo ""

echo "4. 如果有 FFmpeg，可以使用以下命令:"
echo "   # 转换单个音频文件"
echo '   ffmpeg -i "input.wav" -b:a 128k "output.mp3"'
echo ""
echo "   # 批量转换音频 (在 src/assets/voicePack 目录下)"
echo '   for f in *.wav; do ffmpeg -i "$f" -b:a 128k "${f%.wav}.mp3"; done'
echo ""

echo "5. 预计优化效果:"
echo "   - PNG -> WebP: 减少 60-80% 大小"
echo "   - WAV -> MP3: 减少 90% 大小"
echo "   - 总体bundle大小预计减少 70% 以上"