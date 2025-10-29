# 资源优化完整指南

本指南帮助你将项目资源大小减少 70% 以上。

## 当前问题分析

从构建结果看，主要的大文件：
- `3.8.png` - 7.23MB (最大)
- `ddk.png` - 3.07MB
- 7个 WAV 音频文件 - 总计约 24MB
- 其他 PNG 文件 - 约 2MB

**总资源大小约 33MB+**

## 优化方案

### 第一步：图片优化 (PNG → WebP)

1. **使用在线工具转换**
   - 访问 [squoosh.app](https://squoosh.app) 或 [tinypng.com](https://tinypng.com)
   - 上传 PNG 文件
   - 选择 WebP 格式，质量设置 75%
   - 下载转换后的文件

2. **需要转换的文件**
   ```
   1.png → 1.webp
   22.png → 22.webp
   2.8.png → 2.8.webp
   3.8.png → 3.8.webp (最重要，7.2MB)
   3.png → 3.webp
   4.png → 4.webp
   ddk.png → ddk.webp (重要，3.1MB)
   klee.png → klee.webp
   ```

3. **批量更新代码引用**
   ```bash
   node replace-images.cjs
   ```

### 第二步：音频优化 (WAV → MP3)

1. **查看需要转换的文件**
   ```bash
   node convert-audio.cjs
   ```

2. **使用 FFmpeg 转换（推荐）**
   ```bash
   cd src/assets/voicePack
   for f in *.wav; do ffmpeg -i "$f" -b:a 128k "${f%.wav}.mp3"; done
   ```

3. **或使用在线工具**
   - 访问 [online-audio-converter.com](https://online-audio-converter.com)
   - 上传 WAV 文件
   - 选择 MP3 格式，比特率 128kbps
   - 下载转换后的文件

### 第三步：验证和清理

1. **重新构建项目**
   ```bash
   npm run build
   ```

2. **检查优化效果**
   - 查看 `dist/` 目录大小
   - 对比优化前后的文件大小

3. **删除原始文件**
   ```bash
   # 删除原始 PNG 文件（确认 WebP 正常工作后）
   rm src/assets/*.png
   
   # 删除原始 WAV 文件（确认 MP3 正常工作后）
   rm src/assets/voicePack/*.wav
   ```

## 预期优化效果

| 资源类型 | 优化前 | 优化后 | 节省 |
|---------|--------|--------|------|
| PNG → WebP | ~13MB | ~3MB | ~77% |
| WAV → MP3 | ~24MB | ~2.4MB | ~90% |
| **总计** | **~37MB** | **~5.4MB** | **~85%** |

## 注意事项

1. **浏览器兼容性**
   - WebP 格式在现代浏览器中支持良好
   - 如需支持旧浏览器，保留 PNG 作为后备

2. **质量设置**
   - WebP 质量 75% 是图片大小和质量的最佳平衡点
   - MP3 128kbps 对语音内容足够清晰

3. **测试验证**
   - 转换后务必测试所有图片和音频是否正常显示/播放
   - 在不同浏览器中验证兼容性

## 工具文件说明

- `replace-images.cjs` - 批量替换代码中的图片引用
- `convert-audio.cjs` - 音频转换指南
- `optimize-guide.sh` - 完整优化步骤
- `src/utils/imageOptimizer.ts` - 图片格式自动检测工具（可选）

完成这些优化后，你的项目构建大小将显著减少，加载速度将大幅提升！