# 📝 社区考现学 - 内容创建标准

## 🎯 文件命名规则

### 文章文件
```
格式：YYYY-MM-DD 英文描述.md
例子：
✅ 2026-02-10-express-cabinet.md
✅ 2026-02-11-parking-lot-observation.md
✅ 2026-02-12-playground-equipment.md
✅ 2026-02-13-community-garden.md
```

### 图片文件
```
格式：YYYY-MM-DD 英文描述-序号.jpg
例子：
✅ 2026-02-10-express-cabinet-1.jpg
✅ 2026-02-10-express-cabinet-2.jpg
✅ 2026-02-11-parking-lot-1.jpg
✅ 2026-02-11-parking-lot-2.jpg
✅ 2026-02-11-parking-lot-3.jpg
```

## 📁 目录结构
```
community-observation-web/
├── content/observations/           # 所有文章文件
│   ├── 2026-02-10-express-cabinet.md
│   ├── 2026-02-11-parking-lot.md
│   └── 2026-02-12-playground-equipment.md
├── public/images/observations/     # 所有图片文件
│   ├── 2026-02-10-express-cabinet-1.jpg
│   ├── 2026-02-10-express-cabinet-2.jpg
│   └── 2026-02-11-parking-lot-1.jpg
```

## 🔧 创建新文章流程

### 1. 创建文章文件
```bash
# 在 content/observations/ 目录下创建新文件
touch content/observations/2026-02-11-observation-topic.md
```

### 2. 拍摄/准备图片
```bash
# 将图片文件放在 public/images/observations/ 目录下
# 命名格式：YYYY-MM-DD 英文描述-序号.jpg
```

### 3. 文章模板
```markdown
---
title: "中文标题"
date: "2026-02-11 XX:XX"
location: "中文地点"
category: "中文分类"
tags: ["中文标签1", "中文标签2", "中文标签3"]
youtube: ""  # 如果有视频，填入YouTube视频ID
images:
  - "/images/observations/2026-02-11-observation-topic-1.jpg"
  - "/images/observations/2026-02-11-observation-topic-2.jpg"
---

# 中文标题

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
```

## ✅ 检查清单

创建新文章前检查：
- [ ] 文件名为英文：`2026-02-11-topic-name.md`
- [ ] 图片名为英文：`2026-02-11-topic-name-1.jpg`
- [ ] 图片放在 `public/images/observations/`
- [ ] 文章放在 `content/observations/`
- [ ] frontmatter中的图片路径正确
- [ ] 文件内容标题可以是中文（用于显示）
- [ ] frontmatter字段可以是中文（用于显示）
- [ ] 只有文件名和图片名必须是英文（避免编码问题）

## 🔄 命名建议

### 常见观察主题的英文命名
```
快递柜 → express-cabinet
停车场 → parking-lot
游乐场 → playground
社区花园 → community-garden
垃圾桶 → trash-bin
楼道 → corridor
电梯 → elevator
健身器材 → fitness-equipment
照明设施 → lighting-facilities
入口设计 → entrance-design
```

## 🚀 发布流程
1. 创建文章和图片
2. 本地测试：`npm run dev`
3. 检查图片显示正常
4. 提交：`git add . && git commit -m "Add new observation: topic"`
5. 推送：`git push origin main`

---

**记住：文件名用英文避免技术问题，内容用中文保持原汁原味！**