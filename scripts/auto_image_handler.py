#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import shutil
from datetime import datetime
from pathlib import Path

def translate_filename_chinese_to_english():
    """简单的中文到英文文件名映射"""
    translation_map = {
        '社区快递柜': 'community-express-cabinet',
        '垃圾桶': 'trash-bin',
        '停车场': 'parking-lot',
        '游乐场': 'playground',
        '楼道': 'corridor',
        '电梯': 'elevator',
        '照明': 'lighting',
        '入口': 'entrance',
        '健身器材': 'fitness-equipment',
        '花园': 'garden',
        '大门': 'gate',
        '广场': 'plaza'
    }
    return translation_map

def process_images(file_prefix, source_dir):
    """
    自动处理图片文件
    :param file_prefix: 文件前缀 (例如: 2026-02-10-community-express-cabinet)
    :param source_dir: 图片源目录 (例如: ~/Desktop)
    """
    
    # 确定目标目录
    project_root = "/Users/wygg/community-observation-web"
    target_dir = os.path.join(project_root, "public/images/observations")
    
    # 确保目标目录存在
    Path(target_dir).mkdir(parents=True, exist_ok=True)
    
    # 支持的图片格式
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    
    # 查找源目录中的图片文件
    source_path = os.path.expanduser(source_dir)
    image_files = []
    
    for ext in image_extensions:
        image_files.extend(Path(source_path).glob(f"*{ext}"))
        image_files.extend(Path(source_path).glob(f"*{ext.upper()}"))
    
    if not image_files:
        print(f"❌ 在 {source_dir} 中没有找到图片文件")
        return False
    
    print(f"🖼️ 找到 {len(image_files)} 个图片文件")
    
    # 处理每个图片文件
    for i, image_file in enumerate(image_files, 1):
        # 生成新文件名
        new_filename = f"{file_prefix}-{i}{image_file.suffix.lower()}"
        target_path = os.path.join(target_dir, new_filename)
        
        # 移动文件
        try:
            shutil.move(str(image_file), target_path)
            print(f"✅ {image_file.name} → {new_filename}")
        except Exception as e:
            print(f"❌ 移动失败 {image_file.name}: {e}")
            return False
    
    print(f"🎉 成功处理了 {len(image_files)} 个图片文件")
    print(f"📁 图片已移动到: {target_dir}")
    return True

def update_markdown_file(file_prefix):
    """自动更新Markdown文件中的图片路径"""
    
    project_root = "/Users/wygg/community-observation-web"
    content_dir = os.path.join(project_root, "content/observations")
    
    # 查找对应的markdown文件
    md_file = os.path.join(content_dir, f"{file_prefix}.md")
    
    if not os.path.exists(md_file):
        print(f"❌ 找不到对应的Markdown文件: {md_file}")
        return False
    
    # 读取文件内容
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 查找图片数量（在public目录中）
    target_dir = os.path.join(project_root, "public/images/observations")
    image_files = [f for f in os.listdir(target_dir) if f.startswith(file_prefix)]
    image_files.sort()
    
    # 生成图片路径列表
    image_paths = [f"/images/observations/{img}" for img in image_files]
    
    # 更新frontmatter中的images字段
    import re
    
    # 查找images字段并替换
    pattern = r'(images:\s*\n)(\s*-.*\n)*'
    replacement = f'images:\n'
    for path in image_paths:
        replacement += f'  - "{path}"\n'
    
    content = re.sub(pattern, replacement, content)
    
    # 写回文件
    with open(md_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ 已更新 {md_file} 中的图片路径")
    print(f"📷 添加了 {len(image_paths)} 个图片引用")
    return True

def main():
    if len(sys.argv) != 3:
        print("用法: python3 auto_image_handler.py <文件前缀> <图片目录>")
        print("例如: python3 auto_image_handler.py 2026-02-10-community-express-cabinet ~/Desktop")
        return
    
    file_prefix = sys.argv[1]
    source_dir = sys.argv[2]
    
    print(f"🚀 开始处理图片...")
    print(f"📁 文件前缀: {file_prefix}")
    print(f"📂 源目录: {source_dir}")
    
    # 处理图片
    if process_images(file_prefix, source_dir):
        # 更新Markdown文件
        update_markdown_file(file_prefix)
        print("\n🎊 全部处理完成！")
        print(f"💡 现在可以提交到Git了:")
        print(f"   cd /Users/wygg/community-observation-web")
        print(f"   git add . && git commit -m 'Add new observation: {file_prefix}'")
        print(f"   git push origin main")
    else:
        print("❌ 处理失败，请检查错误信息")

if __name__ == "__main__":
    main()