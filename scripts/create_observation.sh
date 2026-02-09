#!/bin/bash

# 一键创建观察笔记的脚本
# 使用方法：./create_observation.sh

echo "🚀 社区考现学 - 自动创建系统"
echo "================================"

# 获取今天的日期
DATE=$(date +%Y-%m-%d)

# 让用户选择观察主题
echo "📝 请选择观察主题："
echo "1) 快递柜 (express-cabinet)"
echo "2) 垃圾桶 (trash-bin)"
echo "3) 停车场 (parking-lot)" 
echo "4) 游乐场 (playground)"
echo "5) 楼道 (corridor)"
echo "6) 电梯 (elevator)"
echo "7) 照明 (lighting)"
echo "8) 入口 (entrance)"
echo "9) 健身 (fitness)"
echo "10) 花园 (garden)"
echo "11) 自定义"

read -p "请输入选择 (1-11): " choice

# 映射表
declare -A topics=(
    [1]="express-cabinet:社区快递柜"
    [2]="trash-bin:垃圾桶"
    [3]="parking-lot:停车场"
    [4]="playground:游乐场"
    [5]="corridor:楼道"
    [6]="elevator:电梯"
    [7]="lighting:照明"
    [8]="entrance:入口"
    [9]="fitness:健身"
    [10]="garden:花园"
)

if [[ $choice -ge 1 && $choice -le 10 ]]; then
    IFS=':' read -r topic chinese <<< "${topics[$choice]}"
    TITLE="$chinese观察"
    FILENAME="${DATE}-${topic}"
elif [[ $choice == 11 ]]; then
    read -p "请输入中文标题: " TITLE
    read -p "请输入英文文件名（用连字符）: " FILENAME
    FILENAME="${DATE}-${FILENAME}"
else
    echo "❌ 无效选择"
    exit 1
fi

# 生成文件路径
OBSIDIAN_PATH="/Users/wygg/community-observation-web/content/observations/${FILENAME}.md"
PROJECT_PATH="/Users/wygg/community-observation-web/content/observations/${FILENAME}.md"

# 创建文件
cat > "$PROJECT_PATH" << EOF
---
title: "$TITLE"
date: "$(date +%Y-%m-%d\ %H:%M)"
location: "待填入地点"
category: "待填入分类"
tags: ["考现", "待填入标签"]
youtube: ""
images: []
---

# $TITLE

## 观察背景

## 观察记录

### 外观描述

### 功能分析

### 人文观察

## 思考与建议

### 优点

### 不足

### 建议

## 总结

*通过这次观察，我发现了...*

---

## 🖼️ 图片处理

1. 将照片放到桌面
2. 运行以下命令：
   \`\`\`bash
   python3 /Users/wygg/community-observation-web/scripts/auto_image_handler.py "${FILENAME}" "~/Desktop"
   \`\`\`
3. 图片会自动重命名并移动到正确位置
EOF

echo "✅ 文章已创建: $FILENAME.md"
echo "📍 路径: $PROJECT_PATH"
echo ""
echo "🖼️ 图片处理命令已包含在文章中"
echo "💡 完成后运行: git add . && git commit -m 'Add new observation: $FILENAME'"