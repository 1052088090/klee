const fs = require('fs');
const path = require('path');

// 需要先安装 sharp: npm install sharp
// 这个脚本用于转换 PNG 到 WebP

async function convertPngToWebp() {
  try {
    const sharp = require('sharp');
    const assetsDir = path.join(__dirname, 'src/assets');
    
    // 获取所有 PNG 文件
    const pngFiles = fs.readdirSync(assetsDir).filter(file => file.endsWith('.png'));
    
    console.log('Found PNG files:', pngFiles);
    
    for (const file of pngFiles) {
      const inputPath = path.join(assetsDir, file);
      const outputPath = path.join(assetsDir, file.replace('.png', '.webp'));
      
      await sharp(inputPath)
        .webp({ quality: 75, effort: 6 })
        .toFile(outputPath);
        
      console.log(`Converted ${file} to ${file.replace('.png', '.webp')}`);
      
      // 可选：删除原 PNG 文件
      // fs.unlinkSync(inputPath);
    }
    
    console.log('All PNG files converted to WebP!');
  } catch (error) {
    console.error('Error converting files:', error.message);
    console.log('Please install sharp: npm install sharp');
  }
}

convertPngToWebp();