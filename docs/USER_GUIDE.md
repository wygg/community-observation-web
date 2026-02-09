# 小区考现学网站 - 使用操作说明书

## 🚀 快速开始

### 第一次使用设置

#### 1. 准备工作
- **GitHub 账号**：确保你有访问仓库权限
- **Obsidian 应用**：[官网下载](https://obsidian.md)
- **本地环境**：安装 Git

#### 2. 克隆仓库到本地
```bash
# 克隆你的仓库
git clone https://github.com/wygg/community-observation-web.git
cd community-observation-web
```

#### 3. 配置 Obsidian
1. 打开 Obsidian
2. 选择"打开文件夹作为仓库"
3. 选择 `community-observation-web` 文件夹
4. 等待 Obsidian 建立索引

---

## 📝 发布新观察（标准流程）

### 步骤1：创建新观察笔记

#### 在 Obsidian 中操作：
1. **使用模板**：
   - 复制 `obsidian-template.md` 内容
   - 或者直接复制现有观察笔记

2. **创建文件**：
   - 路径：`content/observations/`
   - 文件名格式：`YYYY-MM-DD-观察标题.md`
   - 示例：`2024-02-07-垃圾分类设施观察.md`

3. **填写基础信息**：
```yaml
---
title: "垃圾分类设施观察"
date: "2024-02-07"
location: "小区东门垃圾站"
category: "环保设施"
tags: ["垃圾分类", "环保", "便利性"]
youtube: ""  # 可选：YouTube视频ID
images:      # 可选：图片路径
  - "/images/observations/waste-sorting-1.jpg"
---
```

### 步骤2：编写观察内容

#### 推荐内容结构：
```markdown
# 垃圾分类设施观察

## 观察背景
简要描述观察的时间、地点和背景情况。

## 观察记录
### 外观描述
描述观察对象的外观特征、材质、颜色等。

### 功能分析  
分析观察对象的功能设计和使用情况。

### 人文观察
记录人们对观察对象的反应和使用习惯。

## 思考与建议
### 优点
- 列出观察对象的优点

### 不足  
- 列出可以改进的地方

### 建议
- 提出改进建议

## 总结
*通过这次观察，我发现了...*
```

---

## 📸 图片管理

### 图片上传步骤

#### 1. 准备图片
- **格式支持**：JPG、PNG、WebP
- **建议尺寸**：宽度不超过 1200px
- **文件命名**：使用有意义的英文名
  - ✅ `entrance-design-main.jpg`
  - ❌ `IMG_20240207_001.jpg`

#### 2. 放置图片
- **目标目录**：`images/observations/`
- **直接拖拽**：在文件管理器中复制粘贴
- **Obsidian 内**：可使用图片附件功能

#### 3. 在 Markdown 中引用
```yaml
# 在 frontmatter 中
images:
  - "/images/observations/waste-sorting-1.jpg"
  - "/images/observations/waste-sorting-detail.jpg"

# 在文章内容中（可选）
![垃圾分类设施概览](/images/observations/waste-sorting-1.jpg)
```

---

## 🎥 视频集成

### 添加 YouTube 视频

#### 1. 上传视频到 YouTube
- 登录 YouTube 账号
- 上传你的观察视频
- 设置隐私为"公开"或"不列出"

#### 2. 获取视频ID
- 视频URL示例：`https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- 视频ID：`dQw4w9WgXcQ`

#### 3. 添加到 frontmatter
```yaml
---
title: "小区入口设计观察"
youtube: "dQw4w9WgXcQ"  # 只需要ID，不需要完整URL
---
```

---

## 🚀 发布到网站

### 方法1：Git 命令行（推荐）

#### 1. 打开终端
```bash
cd /path/to/community-observation-web
```

#### 2. 检查状态
```bash
git status  # 查看修改的文件
```

#### 3. 添加文件
```bash
git add .  # 添加所有修改
# 或者指定文件
git add content/observations/你的新文件.md
git add images/observations/你的图片.jpg
```

#### 4. 提交更改
```bash
git commit -m "feat: 添加垃圾分类设施观察笔记"
```

#### 5. 推送到远程
```bash
git push origin main
```

### 方法2：GitHub 网页操作

#### 1. 进入仓库
- 访问：https://github.com/wygg/community-observation-web

#### 2. 上传文件
- 点击 "Add file" → "Upload files"
- 拖拽你的 Markdown 文件和图片
- 填写提交信息
- 点击 "Commit changes"

---

## ⏱️ 自动部署流程

### 发布后会发生什么？

#### 1. 触发部署
- 代码推送到 GitHub 后自动触发
- Vercel 检测到更新，开始构建

#### 2. 构建过程（1-3分钟）
- 安装依赖：`npm install`
- 构建网站：`npm run build`
- 部署到全球CDN

#### 3. 发布完成
- 网站自动更新
- 新观察出现在首页
- 可以立即访问

### 如何检查部署状态？

#### Vercel 控制台
- 访问：https://vercel.com/dashboard
- 查看项目构建日志
- 监控部署状态

#### 查看最新部署
- 直接访问网站：https://community-observation-web.vercel.app/
- 检查新内容是否显示

---

## 🔧 高级操作

### 批量发布多篇观察

#### 1. 准备多篇文章
- 创建多个 Markdown 文件
- 统一放置图片文件

#### 2. 一次性提交
```bash
git add .
git commit -m "feat: 添加5篇新观察笔记

- 垃圾分类设施观察
- 小区入口设计改进  
- 儿童游乐场安全检查
- 停车场管理优化
- 绿化养护现状调查"
git push origin main
```

### 修改已发布内容

#### 1. 编辑文件
- 在 Obsidian 中修改 Markdown 文件
- 或直接在 GitHub 网页编辑

#### 2. 重新发布
```bash
git add .
git commit -m "fix: 修正垃圾分类观察的图片路径"
git push origin main
```

### 删除观察记录

#### 1. 删除文件
```bash
# 删除 Markdown 文件
rm content/observations/2024-02-07-旧观察.md

# 删除相关图片
rm images/observations/old-observation.jpg
```

#### 2. 提交删除
```bash
git add -A
git commit -m "remove: 删除过时的观察记录"
git push origin main
```

---

## 📱 移动端快速操作

### 使用手机发布

#### 1. 安装应用
- **GitHub**：iOS/Android 客户端
- **Obsidian**：iOS 客户端（付费）
- **文本编辑器**：任何 Markdown 编辑器

#### 2. 简化流程
1. 在手机上编写 Markdown
2. 通过 GitHub App 上传文件
3. 或推送到 GitHub 后同步到电脑

---

## 🛠️ 故障排除

### 常见问题

#### 1. 网站没有更新
**可能原因**：
- 部署还在进行中（需要等待1-3分钟）
- 浏览器缓存

**解决方案**：
- 等待几分钟后刷新页面
- 强制刷新：Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

#### 2. 图片不显示
**检查项目**：
- 图片路径是否正确
- 文件名是否包含特殊字符
- 图片格式是否支持

**修复方法**：
```yaml
# 错误路径
images:
  - "/images/observations/图片 1.jpg"  # 包含空格

# 正确路径  
images:
  - "/images/observations/image-1.jpg"
```

#### 3. Git 推送失败
**常见错误**：
```bash
# 权限问题
error: Permission denied

# 解决方案
git config user.name "你的用户名"
git config user.email "你的邮箱"
```

#### 4. 部署失败
**检查 Vercel 日志**：
- 访问 Vercel 控制台
- 查看构建错误信息
- 修复代码后重新推送

---

## 📋 检查清单

### 发布前检查
- [ ] 文件名格式正确（YYYY-MM-DD-标题.md）
- [ ] frontmatter 信息完整
- [ ] 图片路径正确
- [ ] YouTube视频ID正确（如果有）
- [ ] 内容预览无误

### 发布后检查
- [ ] Git 推送成功
- [ ] Vercel 部署完成
- [ ] 网站内容更新
- [ ] 图片正常显示
- [ ] 链接点击正常

---

## 📞 获取帮助

### 实用资源
- **项目仓库**：https://github.com/wygg/community-observation-web
- **Vercel 控制台**：https://vercel.com/dashboard
- **Obsidian 文档**：https://help.obsidian.md

### 技术支持
- 查看 `DEVELOPMENT_LOG.md` 了解技术细节
- 查看 `FULL_CONVERSATION_LOG.md` 了解完整对话
- GitHub Issues：在仓库中创建问题报告

---

*更新日期：2024-02-07*  
*版本：v1.0*