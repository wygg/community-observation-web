#!/bin/bash

echo "🧪 测试Obsidian自动化配置"
echo "=========================="

# 测试Python脚本
echo "📝 测试1: Python脚本"
python3 /Users/wygg/community-observation-web/scripts/auto_image_handler.py --help 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ Python脚本语法正确"
else
    echo "❌ Python脚本有语法错误"
    exit 1
fi

# 检查文件权限
echo "📝 测试2: 文件权限"
if [ -x /Users/wygg/community-observation-web/scripts/auto_image_handler.py ]; then
    echo "✅ Python脚本可执行"
else
    echo "❌ Python脚本不可执行，请运行: chmod +x scripts/auto_image_handler.py"
fi

if [ -x /Users/wygg/community-observation-web/scripts/create_observation.sh ]; then
    echo "✅ Shell脚本可执行"
else
    echo "❌ Shell脚本不可执行，请运行: chmod +x scripts/create_observation.sh"
fi

# 检查模板文件
echo "📝 测试3: 模板文件"
if [ -f /Users/wygg/community-observation-web/templates/simple-auto-template.md ]; then
    echo "✅ 模板文件存在"
else
    echo "❌ 模板文件不存在"
fi

# 检查目录结构
echo "📝 测试4: 目录结构"
if [ -d /Users/wygg/community-observation-web/public/images/observations ]; then
    echo "✅ 图片目标目录存在"
else
    echo "❌ 图片目标目录不存在，正在创建..."
    mkdir -p /Users/wygg/community-observation-web/public/images/observations
fi

echo ""
echo "🎯 配置检查完成！"
echo "📖 请查看 OBSIDIAN_SETUP_GUIDE.md 进行下一步配置"