# 小区考现学网站开发日志

## 项目概述
基于 Next.js + Obsidian + GitHub + Vercel 构建的考现学观察记录网站，支持自动内容更新和多媒体展示。

## 开发过程记录

### 2024-02-07 项目启动

#### 需求分析
- 用户想要创建一个小区考现学网站
- 支持发布图文视频内容
- 视频存储在 YouTube，文字和图片在 GitHub
- 使用 Obsidian 编写 Markdown 格式笔记
- 当 MD 文件上传到 GitHub 指定文件夹时，网站自动更新
- 通过 Vercel 实现自动化部署

#### 技术架构设计
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Obsidian      │───▶│   GitHub Repo    │───▶│   Vercel Web    │
│  (Markdown)     │    │  (内容存储)       │    │   (自动部署)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │                         │
                              ▼                         ▼
                       ┌──────────────┐         ┌──────────────┐
                       │ GitHub Pages │         │ YouTube API  │
                       │  (图片托管)   │         │  (视频获取)   │
                       └──────────────┘         └──────────────┘
```

#### 数据结构设计
- **内容目录结构**：
  ```
  /content/observations/     # Markdown 观察笔记
  /images/observations/      # 图片资源
  ```

- **Markdown Frontmatter 结构**：
  ```yaml
  ---
  title: "观察标题"
  date: "2024-02-07"
  location: "观察地点"
  category: "分类"
  tags: ["标签1", "标签2"]
  youtube: "YouTube视频ID（可选）"
  images:
    - "/images/observations/图片1.jpg"
    - "/images/observations/图片2.jpg"
  ---
  ```

### 项目实现步骤

#### 1. 环境搭建
```bash
# 创建项目目录
mkdir -p community-observation-web
cd community-observation-web

# 初始化 Next.js 项目
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-react-compiler

# 安装 Markdown 处理依赖
npm install gray-matter remark remark-html date-fns

# 创建目录结构
mkdir -p content/observations images/observations src/components src/app/observations/[id]
```

#### 2. 创建示例内容
创建了示例观察笔记 `content/observations/2024-02-07-小区入口设计观察.md`，包含完整的 frontmatter 和内容结构。

#### 3. 开发核心组件

**主页组件 (`src/app/page.tsx`)**：
- 读取所有观察笔记
- 按日期倒序显示
- 集成 PostCard 组件

**文章卡片组件 (`src/components/PostCard.tsx`)**：
- 显示文章基本信息
- 支持标签、位置、分类展示
- 图片预览功能
- YouTube 视频标识

**文章详情页 (`src/app/observations/[id]/page.tsx`)**：
- 解析 Markdown 内容
- YouTube 视频嵌入
- 图片网格展示
- 响应式布局

#### 4. 部署配置
- 创建 GitHub Actions 工作流 (`.github/workflows/deploy.yml`)
- 配置自动部署到 Vercel
- 更新 package.json 的脚本配置

#### 5. 文档和模板
- **README.md**：完整的项目说明和使用指南
- **Obsidian 模板** (`obsidian-template.md`)：标准化的观察笔记格式
- **使用指南** (`docs/obsidian-guide.md`)：详细的 Obsidian 使用教程

### Git 操作记录

#### GitHub 仓库设置
1. 在 GitHub 创建仓库：`wygg/community-observation-web`
2. 配置本地 Git：
   ```bash
   git config user.name "your-username"
   git config user.email "your-email@example.com"
   # 使用真实的 GitHub 用户名和邮箱
   ```

#### GitHub CLI 认证
```bash
# 安装 GitHub CLI
brew install gh

# 认证过程
gh auth login
# [两次输入验证码进行设备认证，验证码具有时效性]
gh auth setup-git
```

#### 推送代码
```bash
git remote set-url origin https://github.com/wygg/community-observation-web.git
git branch -M main
git push -u origin main
# ✅ 成功推送
```

### 项目文件结构
```
community-observation-web/
├── content/observations/          # 观察笔记 Markdown 文件
│   └── 2024-02-07-小区入口设计观察.md
├── images/observations/           # 图片资源
├── src/app/                       # Next.js 应用目录
│   ├── observations/[id]/        # 动态路由
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── src/components/                # React 组件
│   └── PostCard.tsx
├── docs/                          # 文档
│   └── obsidian-guide.md
├── .github/workflows/            # GitHub Actions 工作流
│   └── deploy.yml
├── obsidian-template.md          # Obsidian 模板
├── README.md                     # 项目说明
├── package.json                  # 依赖配置
└── ... (其他 Next.js 配置文件)
```

### 技术栈总结
- **前端框架**：Next.js 14 (App Router) + TypeScript
- **样式**：Tailwind CSS
- **内容处理**：gray-matter + remark
- **写作工具**：Obsidian
- **版本控制**：Git + GitHub
- **部署**：Vercel (计划中)

### 已完成功能
✅ 项目架构设计  
✅ Next.js 网站开发  
✅ Markdown 内容解析和展示  
✅ YouTube 视频集成  
✅ 图片展示系统  
✅ 标签和分类系统  
✅ 响应式设计  
✅ GitHub 自动部署配置  
✅ Obsidian 模板和指南  
✅ Git 仓库创建和推送  

### 待完成事项
⏳ Vercel 部署配置（遇到手机验证问题）

### 备选部署方案
如果 Vercel 持续有问题，可以考虑：
- **Netlify**：拖拽部署，简单快捷
- **GitHub Pages**：在仓库设置中直接启用
- **Railway**：现代化部署平台

### 下次继续工作的要点
1. 完成 Vercel 部署或选择备选方案
2. 测试内容更新流程
3. 优化网站性能和用户体验
4. 添加更多观察笔记模板
5. 考虑添加评论系统或其他互动功能

### 开发技巧和注意事项
- 使用 `npm run build` 测试项目构建
- 确保所有依赖正确安装
- 保持一致的文件命名规范
- 定期提交代码到 GitHub
- 使用有意义的 commit message

---

*开发时间：2024-02-07*  
*项目状态：核心功能完成，部署待完成*