# 🔧 Obsidian HEIC 处理插件方案

## 🎯 推荐的 Obsidian 插件

### 1. Image auto upload Plugin
- **功能**：自动处理图片格式并上传
- **HEIC 支持**：自动转换为 WebP/JPG
- **配置**：自动重命名和保存路径设置

### 2. Media Extended Plugin  
- **功能**：增强媒体文件处理
- **格式转换**：HEIC → JPG 自动转换
- **批量处理**：支持拖拽多文件

### 3. Custom Attachment Location Plugin
- **功能**：自定义附件保存路径
- **路径模板**：支持日期和文件名变量
- **自动组织**：按日期和分类整理

## 📱 iPhone 设置优化

### 相机格式设置（推荐）
```bash
设置 → 相机 → 格式 → 选择：
- "最兼容"（直接拍摄 JPG）
- "高效"（HEIC + 自动转换）
```

### 拍摄设置建议
```
分辨率：4K (3840×2160) 或 1080p
格式：最高兼容性（JPG）
存储：高效（平衡质量和体积）
HDR：开启（提升动态范围）
```

## 🔄 快速工作流程

### 方案一：一次设置，长期受益
```bash
1. iPhone 设置 → 相机 → 格式 → "最高兼容性"
2. 后续拍摄直接 JPG，无需转换
3. 拖拽到 Obsidian，自动复制到正确路径
```

### 方案二：自动化脚本处理
```bash
# 每日处理流程
1. iPhone 拍摄 HEIC → AirDrop 到 Mac
2. 运行转换脚本：./scripts/heic-converter.sh
3. 自动转换为 JPG 并移动到正确位置
4. 在 Obsidian 中使用标准 Markdown 语法插入
```

### 方案三：Obsidian 插件自动化
```bash
1. 安装 Image auto upload Plugin
2. 配置：
   - 输入格式：HEIC/JPG/WebP
   - 输出格式：JPG
   - 保存路径：images/observations
   - 命名规则：{date}-{title}-{index}.jpg
3. 设置快捷键：Cmd+Shift+I 插入图片
```

## 🎯 针对你今天4张 HEIC 图片的操作建议

### 🚀 立即方案（推荐）
```bash
# 1. 使用 macOS 预览批量转换
选中所有 HEIC 文件 → 右键 → 用预览打开 → 全选 → 文件 → 导出 → JPEG → 最高质量
保存到：/Users/wygg/community-observation-web/images/observations/

# 2. 按标准重命名
2026-02-09-你的观察主题-1.jpg
2026-02-09-你的观察主题-2.jpg  
2026-02-09-你的观察主题-3.jpg
2026-02-09-你的观察主题-4.jpg
```

### 🔧 自动化方案
```bash
# 1. 将 HEIC 文件放到桌面"待处理图片"文件夹
# 2. 运行转换脚本
cd /Users/wygg/community-observation-web
./scripts/heic-converter.sh

# 3. 脚本会自动：
#    - 检查 ImageMagick
#    - 批量转换所有 HEIC → JPG  
#    - 保存到正确位置
#    - 保持高质量 (95%)
```

### 🎮 高级方案
```bash
# 1. 安装 Obsidian 插件
# Image auto upload 或 Media Extended

# 2. 配置自动处理
# 拖拽 HEIC 到 Obsidian → 自动转换为 JPG → 保存到指定路径

# 3. 享受无缝工作流
```

## 📊 质量对比

### 转换建议
```
HEIC → JPG 质量设置：
- 原文件：2-5 MB (HEIC 高效)
- JPG 95%：1-3 MB (几乎无损)
- JPG 85%：800KB-2MB (平衡)
- JPG 75%：500KB-1.5MB (快速加载)
```

### 网站优化建议
```javascript
// Next.js 图片优化配置
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    quality: 85,  // 适合 JPG 转换
  }
}
```

## 🔍 故障排除

### 转换失败？
```bash
# 检查 ImageMagick
magick -version

# 重新安装
brew reinstall imagemagick

# 手动转换单个文件
magick input.heic output.jpg
```

### Obsidian 不显示？
```bash
# 检查路径
# 正确：/images/observations/filename.jpg
# 错误：~/images/observations/filename.jpg

# 检查权限
ls -la images/observations/
```

## 💡 最佳实践总结

### 🥇 推荐流程（简单）
1. **iPhone 设置**：相机格式改为"最兼容性"
2. **直接拍摄 JPG**：避免后续转换
3. **标准命名**：2026-02-09-主题-序号.jpg
4. **正确放置**：images/observations/
5. **Markdown 插入**：标准语法

### 🥈 备选流程（自动化）
1. **使用转换脚本**：自动处理 HEIC
2. **批量处理**：一次性处理多张
3. **路径标准化**：脚本自动移动
4. **质量保持**：95% 高质量转换

### 🥉 高级流程（专业）
1. **安装插件**：Image auto upload
2. **自动处理**：拖拽即转换
3. **路径模板**：自动命名和放置
4. **无缝集成**：与工作流完美融合

---

## 🎯 现在开始吧！

你的 HEIC 图片处理现在有多种方案可选。建议先用简单的 macOS 预览方法，如果工作量大会再考虑自动化方案。

准备好开始转换了吗？🚀