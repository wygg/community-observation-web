<%*
// 简化版：智能识别主题并生成英文文件名
const title = await tp.system.prompt("请输入文章标题（中文）", "社区观察笔记");

// 获取当前日期和时间
const now = new Date();
const date = now.toISOString().split('T')[0];
const time = now.toTimeString().split(' ')[0].substring(0,5);

// 中文主题到英文的映射
const topicMap = {
    '快递柜': 'express-cabinet',
    '垃圾桶': 'trash-bin', 
    '停车场': 'parking-lot',
    '游乐场': 'playground',
    '楼道': 'corridor',
    '电梯': 'elevator',
    '照明': 'lighting',
    '入口': 'entrance',
    '健身': 'fitness',
    '花园': 'garden',
    '大门': 'gate',
    '广场': 'plaza',
    '座位': 'seating',
    '标识': 'signage'
};

// 自动提取英文关键词
let englishTopic = 'observation'; // 默认值
for (const [chinese, english] of Object.entries(topicMap)) {
    if (title.includes(chinese)) {
        englishTopic = english;
        break;
    }
}

// 生成文件名
const fileName = `${date}-${englishTopic}`;

// 生成Python命令
const pythonCommand = `python3 /Users/wygg/community-observation-web/scripts/auto_image_handler.py "${fileName}" "~/Desktop"`;

// 文件内容
const content = `---
title: "${title}"
date: "${date} ${time}"
location: "待填入地点"
category: "待填入分类"  
tags: ["考现", "待填入标签"]
youtube: ""
images: []
---

# ${title}

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

## 🖼️ 图片处理命令

复制以下命令到终端执行：

\`\`\`bash
${pythonCommand}
\`\`\`

然后会自动：
1. 重命名图片为英文
2. 移动到正确目录  
3. 更新文章中的图片路径
`;

// 创建文件
const filePath = `${tp.file.path(true)}/${fileName}.md`;
await tp.file.write(content, filePath);

// 显示成功信息
new Notice(`✅ 已创建文章：${fileName}.md`);
new Notice(`📝 标题：${title}`);
new Notice(`💡 请将照片放到桌面，然后复制运行Python脚本`);
%>