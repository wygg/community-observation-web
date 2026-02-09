# 📱 HEIC 图片格式处理指南

## 🎯 HEIC 格式说明

### 什么是 HEIC？
- **格式**：High Efficiency Image Container
- **来源**：Apple 设备默认格式（iPhone 7+）
- **优点**：文件体积小，画质高
- **问题**：网页兼容性差，Obsidian 显示异常

### 兼容性问题
```
✅ Apple 生态     - 完美支持
✅ macOS 预览     - 原生支持  
✅ iOS 相册      - 原生支持
❌ Web 浏览器    - 大部分不支持
❌ Windows       - 需要额外插件
❌ Linux         - 需要转换工具
❌ Obsidian     - 可能显示异常
```

## 🔄 转换方法（推荐）

### 方法一：macOS 预览应用（最简单）
```bash
# 1. 用预览打开 HEIC 文件
# 2. 文件 → 导出
# 3. 选择格式：JPEG
# 4. 质量：最高
# 5. 保存到目标位置
```

**详细步骤：**
1. 选中 HEIC 文件 → 右键 → "打开方式" → "预览"
2. 预览中：文件 → 导出
3. 格式选择：JPEG
4. 质量设置：最高
5. 保存到：`images/observations/`
6. 重命名为标准格式

### 方法二：ImageMagick（批量转换）
```bash
# 安装 ImageMagick
brew install imagemagick

# 批量转换
for file in *.heic; do
    magick "$file" "${file%.heic}.jpg"
done

# 移动到正确位置
mv *.jpg images/observations/
```

### 方法三：HEIC 转换器 App
```bash
# 推荐应用
App Store 搜索："heic to jpg"
推荐：iMazing HEIC Converter、iMyFone HEIC Converter
```

### 方法四：iPhone 设置（预防）
```bash
# iPhone 设置 → 相机 → 格式
选择："最高兼容性"
这样直接拍摄 JPG，无需转换
```

## 🛠️ 自动化处理脚本

### macOS 批处理脚本
<tool_call>write
<arg_key>content</arg_key>
<arg_value>#!/bin/bash

# HEIC 转 JPG 批处理脚本
# 作者：考现学观察者
# 用途：处理 iPhone HEIC 图片，转换为网站兼容格式

set -e

# 配置
SOURCE_DIR="$HOME/Desktop/待处理图片"
TARGET_DIR="/Users/wygg/community-observation-web/images/observations"
QUALITY=95

echo "📱 HEIC 转换工具启动"
echo "📁 源目录：$SOURCE_DIR"
echo "📂 目标目录：$TARGET_DIR"

# 创建目标目录
mkdir -p "$TARGET_DIR"

# 检查 ImageMagick
if ! command -v magick &> /dev/null; then
    echo "⚠️  未找到 ImageMagick，正在安装..."
    brew install imagemagick
fi

# 处理文件
count=0
for file in "$SOURCE_DIR"/*.HEIC "$SOURCE_DIR"/*.heic; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        basename="${filename%.*}"
        
        echo "🔄 处理中：$filename"
        
        # 转换为 JPG
        magick "$file" -quality $QUALITY "$TARGET_DIR/${basename}.jpg"
        
        echo "✅ 转换完成：${basename}.jpg"
        ((count++))
    fi
done

echo "🎉 完成！转换了 $count 个文件"
echo "📂 文件位置：$TARGET_DIR"
echo "💡 现在可以在 Obsidian 中使用标准 Markdown 语法插入了"