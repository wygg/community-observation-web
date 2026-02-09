<%*
// 自动生成英文文件名并处理图片的模板
const { title } = tp.user.getInput("请输入文章标题（中文）", "社区观察笔记");

// 获取当前日期
const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// 调用翻译API（这里需要配置翻译服务）
async function translateToChinese(title) {
    // 方案1：使用OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: `请将这个中文标题翻译成适合文件名的英文：${title}\n只返回英文，用连字符连接，不要空格和特殊字符。例如："社区快递柜观察" → "community-express-cabinet-observation"`
            }]
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content.trim();
}

// 或者方案2：使用本地翻译词典
const translationMap = {
    '社区快递柜观察': 'community-express-cabinet-observation',
    '垃圾桶观察': 'trash-bin-observation',
    '停车场观察': 'parking-lot-observation',
    '游乐场观察': 'playground-observation',
    '楼道观察': 'corridor-observation',
    '电梯观察': 'elevator-observation',
    '照明设施观察': 'lighting-facilities-observation'
};

// 生成英文文件名
const englishName = await translateToChinese(title);
const fileName = `${date}-${englishName}`;

// 创建文件内容
const fileContent = `---
title: "${title}"
date: "${date} ${new Date().toTimeString().split(' ')[0].substring(0,5)}"
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

## 📸 图片处理提示

将图片文件放在桌面，然后运行以下命令自动处理：

\`\`\`bash
# 图片自动重命名和移动脚本
python3 ~/community-observation-web/scripts/auto_image_handler.py "${fileName}" "~/Desktop"
\`\`\`
`;

// 创建文件
const filePath = `${tp.file.path(true)}/${fileName}.md`;
await tp.file.write(fileContent, filePath);

// 弹出提示
new Notice(`✅ 文章已创建：${fileName}.md\n💡 请将图片放到桌面，然后运行图片处理脚本`);
%>