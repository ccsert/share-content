<div align="center">

# AI Collab Slides

![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?style=flat-square&logo=javascript&logoColor=111)
![Vanilla](https://img.shields.io/badge/Framework-Vanilla_JS-222?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-1f9d55?style=flat-square)

一个基于 **Vanilla JS + Vite** 的全屏演示引擎，核心能力是：

用户提供一份新文档，AI 按当前视觉风格自动改造为可演示的幻灯片项目。

[English](README.en.md) | [中文](README.md)

支持多种动态切页、自定义光标、键盘/滚轮/触屏导航，以及数据驱动的幻灯片渲染。

</div>

## 目录

- [核心定位](#核心定位)
- [项目亮点](#项目亮点)
- [在线体验](#在线体验)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [文档驱动工作流](#文档驱动工作流)
- [标准提示词模板](#标准提示词模板)
- [如何新增修改一页幻灯片](#如何新增修改一页幻灯片)
- [交互说明](#交互说明)
- [设计与动画](#设计与动画)
- [开发建议](#开发建议)
- [贡献指南](#贡献指南)

## 核心定位

这不是一个只能展示固定内容的演示仓库，而是一个可复用的“样式引擎”。

- 输入：任意主题文档（演讲稿、方案、需求说明、课程大纲）
- 处理：AI 根据文档语义拆页，并映射到现有版式类型
- 输出：保持同一视觉语言的全新幻灯片内容

## 项目亮点

- 文档驱动：从“手工逐页写”升级为“给文档就能生成页面结构”
- 数据驱动：内容与渲染解耦，只改 `src/slides/data.js` 就能更新整套演示
- 过渡丰富：内置 10 种切页动画，翻页时自动轮换
- 交互完整：支持键盘、滚轮、触屏滑动、底部圆点导航
- 视觉统一：暗色渐变背景 + 组件化样式 + 自定义双层光标
- 轻量依赖：仅使用 Vite 进行开发与构建，零框架运行时负担

## 在线体验

- 本地运行后访问：`http://localhost:5173`

## 技术栈

- Vanilla JavaScript (ES Modules)
- Vite 6
- 原生 CSS（CSS Variables + 动画系统）

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发环境

```bash
pnpm dev
```

### 3. 构建生产版本

```bash
pnpm build
```

### 4. 本地预览生产包

```bash
pnpm preview
```

## 项目结构

```text
.
├── index.html
├── src/
│   ├── main.js                # 入口：样式/模块装配 + 初始化
│   ├── js/
│   │   ├── cursor.js          # 自定义光标逻辑
│   │   └── navigation.js      # 导航与切页控制
│   ├── slides/
│   │   ├── data.js            # 幻灯片内容数据（核心编辑点）
│   │   └── renderer.js        # 数据 -> HTML 渲染器
│   └── styles/
│       ├── variables.css      # 设计变量
│       ├── base.css           # 基础样式 + 背景
│       ├── animations.css     # 动画与过渡
│       ├── cursor.css         # 光标样式
│       ├── slides.css         # 页面布局
│       ├── components.css     # 组件样式
│       └── nav.css            # 底部导航样式
├── vite.config.js
├── SLIDES-PLAYBOOK.md         # 幻灯片扩展手册
├── DOC-TO-SLIDES-PROMPT.md    # 文档改造标准提示词（中文）
├── DOC-TO-SLIDES-PROMPT.en.md # 文档改造标准提示词（英文）
└── README.en.md               # 英文版项目说明
```

## 文档驱动工作流

1. 准备一份源文档
  : 支持 Markdown、纯文本、会议纪要、课程大纲等。
2. 将文档内容 + 提示词模板交给 AI
  : 模板见 `DOC-TO-SLIDES-PROMPT.md`。
3. 让 AI 产出 slides 数据
  : 目标文件为 `src/slides/data.js`，使用现有类型（cover、section、split-content、cards、flow、raw）。
4. 运行项目验证
  : `pnpm dev` 后检查分页节奏、信息密度与动画观感。
5. 按需微调
  : 对少量页面做人工润色，保持叙事和视觉统一。

这个流程的关键价值是把“做 PPT”变成“维护输入文档 + 审核 AI 输出”，显著降低复用成本。

## 标准提示词模板

- 推荐直接复制 `DOC-TO-SLIDES-PROMPT.md` 给 AI 使用。
- 英文场景可使用 `DOC-TO-SLIDES-PROMPT.en.md`。
- 你只需要替换：主题、受众、时长、源文档内容。
- 模板已约束输出格式，能直接落到 `src/slides/data.js`。

## Copilot Skill（推荐）

项目附带一个 `doc-to-slides` Skill，安装后 AI 会自动加载全部项目约束，无需手动粘贴提示词。

### 为什么用 Skill 比提示词模板更好？

| | 提示词模板 | Skill |
|---|---|---|
| 加载方式 | 用户手动复制粘贴 | AI 自动识别场景并加载 |
| 约束覆盖 | 取决于用户是否完整粘贴 | 始终加载完整技术规范 |
| 触发门槛 | 需要知道模板文件存在 | 说"帮我做幻灯片"即可 |
| 维护成本 | 模板与项目可能不同步 | 单一信息源，随项目迭代 |

### 安装

Skill 文件位于 `~/.agents/skills/doc-to-slides/`，包含：

```text
doc-to-slides/
├── SKILL.md              # 核心指令（工作流 + 硬约束 + 质量标准）
└── references/
    └── playbook.md       # 完整技术规范（类型、字段、CSS 组件、颜色系统）
```

如果你使用 VS Code + GitHub Copilot，Skill 会在你提到"幻灯片"、"演示"、"PPT"等关键词时自动激活。

### 使用方式

直接对 AI 说：

```
帮我把下面这份文档做成幻灯片：

[粘贴你的文档内容]
```

AI 会自动：
1. 读取 Skill 中的全部约束
2. 分析你的文档结构
3. 先给出分页大纲让你确认
4. 生成可直接替换的 `src/slides/data.js`

## 如何新增/修改一页幻灯片

编辑 `src/slides/data.js`，每一页是一个对象，常用类型：

- `cover`：封面页
- `section`：章节页
- `split-content`：左右对比布局
- `cards`：卡片网格
- `flow`：流程图式步骤
- `raw`：自定义 HTML（复杂场景）

示例：

```js
{
  type: 'section',
  label: 'Part 06',
  title: '📦 新章节',
  desc: '这里是章节说明',
}
```

## 交互说明

- 下一页：`→` / `↓` / `Space` / 滚轮向下 / 触屏左滑
- 上一页：`←` / `↑` / 滚轮向上 / 触屏右滑
- 底部导航栏：鼠标移动到页面底部区域自动显示

## 设计与动画

- 顶部进度条会随页码实时更新
- 每次翻页自动切换一种过渡效果（共 10 种）
- 页面元素通过 `anim-*` 类实现分层入场

## 开发建议

- 内容优先改 `src/slides/data.js`
- 通用视觉风格优先改 `src/styles/variables.css`
- 新增版式建议先在 `src/slides/renderer.js` 添加类型分支

## 贡献指南

欢迎通过 Issue / PR 参与改进：

1. Fork 本仓库
2. 新建分支：`feat/your-feature`
3. 提交变更并发起 PR

## 致谢

本项目用于分享 AI 协作开发中的工程化实践，欢迎二次创作与演讲复用。
