// 图片格式优化工具函数
// 优先使用 WebP 格式，如果不存在则回退到 PNG

// 缓存已检测的图片路径
const imageCache = new Map<string, string>();

export async function getOptimizedImageUrl(imageName: string): Promise<string> {
  // 移除文件扩展名
  const baseName = imageName.replace(/\.(png|webp|jpg|jpeg)$/i, '');
  
  // 检查缓存
  if (imageCache.has(baseName)) {
    return imageCache.get(baseName)!;
  }
  
  // 定义尝试的格式优先级
  const formats = ['webp', 'png', 'jpg', 'jpeg'];
  
  for (const format of formats) {
    try {
      const url = new URL(`../assets/${baseName}.${format}`, import.meta.url).href;
      // 尝试加载图片来验证是否存在
      const img = new Image();
      const loadPromise = new Promise<boolean>((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
      
      if (await loadPromise) {
        imageCache.set(baseName, url);
        return url;
      }
    } catch {
      continue;
    }
  }
  
  // 如果都不存在，返回原始路径并警告
  console.warn(`Image not found: ${imageName}`);
  const fallbackUrl = new URL(`../assets/${imageName}`, import.meta.url).href;
  imageCache.set(baseName, fallbackUrl);
  return fallbackUrl;
}

// 同步版本 - 假设 WebP 存在，用于模板中
export function getOptimizedImageUrlSync(imageName: string): string {
  const baseName = imageName.replace(/\.(png|webp|jpg|jpeg)$/i, '');
  
  // 检查缓存
  if (imageCache.has(baseName)) {
    return imageCache.get(baseName)!;
  }
  
  // 优先尝试 WebP
  try {
    const webpUrl = new URL(`../assets/${baseName}.webp`, import.meta.url).href;
    imageCache.set(baseName, webpUrl);
    return webpUrl;
  } catch {
    // 回退到 PNG
    try {
      const pngUrl = new URL(`../assets/${baseName}.png`, import.meta.url).href;
      imageCache.set(baseName, pngUrl);
      return pngUrl;
    } catch {
      // 最后回退到原始文件名
      const fallbackUrl = new URL(`../assets/${imageName}`, import.meta.url).href;
      imageCache.set(baseName, fallbackUrl);
      return fallbackUrl;
    }
  }
}

// 批量获取优化后的图片 URLs (异步版本)
export async function getOptimizedImages(imageNames: string[]): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  
  for (const name of imageNames) {
    const baseName = name.replace(/\.(png|webp|jpg|jpeg)$/i, '');
    result[baseName] = await getOptimizedImageUrl(name);
  }
  
  return result;
}

// 批量获取优化后的图片 URLs (同步版本)
export function getOptimizedImagesSync(imageNames: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  
  imageNames.forEach(name => {
    const baseName = name.replace(/\.(png|webp|jpg|jpeg)$/i, '');
    result[baseName] = getOptimizedImageUrlSync(name);
  });
  
  return result;
}

// 检查浏览器是否支持 WebP
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const dataURL = canvas.toDataURL('image/webp');
    resolve(dataURL.indexOf('data:image/webp') === 0);
  });
}