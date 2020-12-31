## ✨ 概述

![WIP](https://img.shields.io/badge/-WIP-red)
![GitHub last commit](https://img.shields.io/github/last-commit/unclecarlos/bartender)
![pr](https://img.shields.io/badge/PRs-welcome-success)

[![Vue](https://img.shields.io/github/package-json/dependency-version/unclecarlos/bartender/vue?color=41B883&label=Vue&logo=vue.js)](https://github.com/vuejs/vue-next)
[![electron](https://img.shields.io/github/package-json/dependency-version/unclecarlos/bartender/dev/electron?color=%239feaf9&label=Electron&logo=electron&logoColor=%239feaf9)](https://github.com/electron/electron)
[![vite](https://img.shields.io/github/package-json/dependency-version/unclecarlos/bartender/dev/vite/dev?label=Vite&color=41B883)]((https://github.com/vitejs/vite))
[![Typescript](https://img.shields.io/badge/Typescript-informational?logo=Typescript&color=3178c6&logoColor=white)](https://github.com/microsoft/TypeScript)
[![VSCode](https://img.shields.io/badge/Editor-VSCode-informational?logo=visual-studio-code&logoColor=23A7F2&color=3178c6)](https://github.com/microsoft/vscode)
![GitHub](https://img.shields.io/github/license/UncleCarlos/bartender)

[WIP] 基于 vue3 + vite + electron 的个人练习项目

- 功能：尝试实现Redis的可视化管理。
- 界面：使用AntDesignVue模仿VSCode的布局和样式，配色必须是最爱的 One Dark。
- 结构：
```sh
├── scripts                  # 编译脚本
├── src
│   ├── main                 # Electron主进程
│   │   └── services         # 后台服务
│   │
│   ├── renderer             # 渲染进程(Vue)
│   │   ├── assets           # 静态资源
│   │   ├── components       # 组件
│   │   ├── directives       # 指令
│   │   ├── hooks            # 钩子
│   │   └── themes           # 主题
│   │
│   └── shared               # 共享数据(Vuex)
└── static
```


| | 依赖|
| --- | -- |
| UI | [![Vue](https://img.shields.io/github/package-json/dependency-version/unclecarlos/bartender/ant-design-vue)](https://github.com/vueComponent/ant-design-vue) |
| Editor | [![monaco-editor](https://img.shields.io/github/package-json/dependency-version/unclecarlos/bartender/monaco-editor)](https://github.com/microsoft/monaco-editor) [![codemirror](https://img.shields.io/github/package-json/dependency-version/unclecarlos/bartender/codemirror)](https://github.com/codemirror/CodeMirror) <br/> 目前均未搞懂怎么在Vue3+Vite中使用，库内资源加载都有问题。 ![help wanted](https://img.shields.io/badge/-help%20wanted-red)|
| Redis | [![ioredis](https://img.shields.io/github/package-json/dependency-version/unclecarlos/bartender/ioredis)](https://github.com/luin/ioredis) |
| Terminal | [![xterm](https://img.shields.io/github/package-json/dependency-version/unclecarlos/bartender/xterm)](https://github.com/xtermjs/xterm.js)|


## 🎨 截图
![screenshots](https://github.com/UncleCarlos/bartender/blob/dev/screenshots/20201229011051.png)

## 🚀 开始

```sh
$ npm i
$ npm run dev
```
第一次运行时界面可能会空白，按Ctrl+R重载。
## ❤ 感谢以下代码库

[![electron-vue-next](https://github-readme-stats.vercel.app/api/pin/?username=ci010&repo=electron-vue-next&show_owner=true&theme=onedark)](https://github.com/ci010/electron-vue-next)

### 📄 License

![GitHub](https://img.shields.io/github/license/unclecarlos/bartender)

