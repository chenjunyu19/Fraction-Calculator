# Fraction-Calculator

原 Windows 版可以在这里找到：<https://github.com/chenjunyu19/Fraction-Calculator-Windows>

## 简介

一个简单的分数计算器，Progressive Web App，由原 Windows 版移植。

## 文件说明

- `index.html` - App Shell。
- `script.js` - 为 App Shell 提供功能。
- `fractions.js` - 分数处理函数，包含了取最大公因数、最小公倍数、约分、通分、分数四则运算等函数，可单独使用。
- `manifest.json` - App 信息。
- `sw.js` - ServiceWorker，提供了离线缓存功能。