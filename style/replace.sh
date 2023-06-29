#!/bin/bash

# 该脚本的作用是 实现替换某个目录下所有目录中的index.scss文件中内容含"index.scss"的改为"variable.scss"

# 指定目标目录
target_directory="../style"

# 遍历目标目录下的所有子目录
find "$target_directory" -type d | while read -r directory; do
  # 查找并替换目录中的 index.scss 文件
  find "$directory" -type f -name "index.scss" | while read -r file; do
    # 替换文件中的内容
    sed -i 's/index.scss/variable.scss/g' "$file"
    echo "已替换文件: $file"
  done
done

echo "替换完成！"