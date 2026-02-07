# Obsidian 使用指南

## 安装与设置

### 1. 安装 Obsidian
访问 [obsidian.md](https://obsidian.md) 下载并安装 Obsidian。

### 2. 创建仓库
1. 打开 Obsidian
2. 选择"打开文件夹作为仓库"
3. 选择你的 GitHub 仓库本地副本

### 3. 安装推荐插件
在 `设置 > 社区插件` 中安装：
- **Git**：版本控制集成
- **Image auto upload**：图片自动上传
- **Tag Wrangler**：标签管理
- **Table Editor**：表格编辑
- **Calendar**：日历视图

## 模板使用

### 1. 导入模板
将 `obsidian-template.md` 复制到 Obsidian 的模板文件夹中。

### 2. 创建新笔记
1. 使用 `Ctrl/Cmd + N` 创建新笔记
2. 使用 `Ctrl/Cmd + T` 插入模板
3. 填写模板中的变量

### 3. 文件命名规范
使用格式：`YYYY-MM-DD-观察标题.md`

例如：`2024-02-07-小区入口设计观察.md`

## 写作工作流

### 1. 现场记录
- 使用手机拍照记录观察对象
- 用备忘录快速记录要点
- 记录时间、地点、天气等信息

### 2. 整理笔记
在 Obsidian 中：
1. 创建新的观察笔记
2. 使用模板填写基本信息
3. 插入图片并添加说明
4. 详细描述观察内容
5. 写下思考和感悟

### 3. 标签管理
使用统一的标签体系：
- **分类**：#公共空间 #交通设施 #绿化环境
- **特征**：#人性化 #设计 #安全 #便利
- **评价**：#推荐 #问题 #建议

## 图片管理

### 1. 图片处理
- 建议图片宽度不超过 1200px
- 使用 WebP 格式以减小文件大小
- 保持一致的图片质量

### 2. 图片命名
使用有意义的文件名：
- `entrance-design-main.jpg`
- `waste-sorting-detail.jpg`
- `playground-safety-issue.jpg`

### 3. 图片引用
在 Markdown 中引用图片：
```markdown
![入口设计概览](/images/observations/entrance-design-main.jpg)
```

## Git 集成

### 1. 配置 Git
在 Obsidian 设置中配置 Git：
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### 2. 提交更改
在 Obsidian 中：
1. 使用 Git 插件查看更改
2. 输入提交信息
3. 推送到远程仓库

### 3. 提交信息规范
使用清晰的提交信息：
- `feat: 添加小区入口观察笔记`
- `fix: 修正图片路径错误`
- `docs: 更新 README 文档`

## 最佳实践

### 1. 内容质量
- 观察要具体详细
- 分析要有深度
- 建议要切实可行

### 2. 结构清晰
- 使用标题层级结构
- 合理使用列表和表格
- 重点内容加粗强调

### 3. 版本管理
- 定期提交更改
- 保持提交历史清晰
- 重要节点创建标签

### 4. 备份策略
- 定期推送到 GitHub
- 考虑使用其他云盘备份
- 导出重要文档为 PDF

## 故障排除

### 1. 图片不显示
- 检查文件路径是否正确
- 确认图片文件是否存在
- 检查文件名是否有特殊字符

### 2. 格式问题
- 检查 Markdown 语法
- 确认 frontmatter 格式正确
- 使用预览模式查看效果

### 3. Git 问题
- 检查网络连接
- 确认 Git 配置正确
- 查看错误信息并搜索解决方案

## 进阶技巧

### 1. 使用插件
- **Dataview**：动态内容查询
- **Excalidraw**：绘制示意图
- **Mermaid**：流程图和时序图

### 2. 链接管理
- 使用双向链接关联相关笔记
- 建立标签系统
- 创建索引页面

### 3. 自动化
- 设置自动提交
- 使用脚本批量处理
- 配置 CI/CD 流程