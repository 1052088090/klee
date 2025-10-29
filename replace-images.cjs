// 资源路径优化脚本
// 这个脚本可以批量替换项目中的图片引用，从 PNG 改为 WebP

const fs = require('fs');
const path = require('path');

// 需要替换的文件映射
const imageReplacements = {
  '1.png': '1.webp',
  '22.png': '22.webp', 
  '2.8.png': '2.8.webp',
  '3.8.png': '3.8.webp',
  '3.png': '3.webp',
  '4.png': '4.webp',
  'ddk.png': 'ddk.webp',
  'klee.png': 'klee.webp'
};

// 需要处理的文件类型和目录
const fileExtensions = ['.vue', '.ts', '.js'];
const srcDir = path.join(__dirname, 'src');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // 替换图片引用
  Object.entries(imageReplacements).forEach(([oldName, newName]) => {
    const regex = new RegExp(oldName.replace('.', '\\.'), 'g');
    if (content.includes(oldName)) {
      content = content.replace(regex, newName);
      modified = true;
      console.log(`  替换 ${oldName} -> ${newName}`);
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ 更新文件: ${filePath}`);
  }
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fileExtensions.some(ext => item.endsWith(ext))) {
      replaceInFile(fullPath);
    }
  });
}

console.log('开始批量替换图片引用...');
console.log('替换映射:', imageReplacements);
console.log('');

processDirectory(srcDir);

console.log('');
console.log('✓ 批量替换完成！');
console.log('');
console.log('下一步：');
console.log('1. 使用在线工具将 PNG 文件转换为 WebP 格式');
console.log('2. 将转换后的 WebP 文件放入 src/assets/ 目录');
console.log('3. 删除旧的 PNG 文件');
console.log('4. 运行 npm run build 验证');