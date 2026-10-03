#!/bin/zsh
cd -- "${0:A:h}"
if command -v python3 >/dev/null 2>&1; then
  python3 server.py
else
  print '未找到 Python 3。可先打开 app/index.html，使用离线样例和手动查询。'
  open app/index.html
fi
print '按回车关闭此窗口。'
read
