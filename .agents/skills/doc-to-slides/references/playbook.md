# 幻灯片演示项目 — AI 复用手册

> **用途**：将本文档连同你的演讲文案/大纲一起交给 AI，即可生成一套风格一致、效果完整的全屏幻灯片演示应用。

---

## 一、项目概述

这是一个**零框架、纯 Vanilla JS + CSS** 的全屏幻灯片演示引擎。核心特点：

- 数据驱动：内容与渲染分离，修改文案只需编辑数据文件
- 10 种自动轮换的切页过渡效果（3D 旋转、模糊穿越、涟漪扩散等）
- 自定义双层光标（内点 + 弹性外环）
- 暗色主题 + 动态渐变背景
- 底部导航栏自动隐藏/悬停显示
- 支持键盘、滚轮、触屏滑动操控

---

## 二、技术栈

| 层级 | 选型 | 说明 |
|------|------|------|
| 语言 | Vanilla JavaScript (ES Modules) | 无 TypeScript |
| 构建 | Vite 6.x | 仅用于 dev server 和打包，无插件 |
| 样式 | 原生 CSS + CSS Custom Properties | 无 Tailwind、无预处理器 |
| 框架 | 无 | 零依赖，纯手写 |

---

## 三、项目结构

```
project/
├── index.html                    # HTML 外壳（光标元素、进度条、幻灯片容器、导航栏）
├── package.json                  # type: "module", 仅 vite 一个 devDependency
├── vite.config.js                # 极简配置（root: ".", outDir: "dist", open: true）
└── src/
    ├── main.js                   # 入口：导入 CSS + 模块，渲染幻灯片，初始化交互
    ├── js/
    │   ├── cursor.js             # 自定义光标（内点实时跟 + 外环弹性跟）
    │   └── navigation.js         # 导航控制器（切页动画、键盘/滚轮/触屏、导航栏）
    ├── slides/
    │   ├── data.js               # 幻灯片内容数据（纯 JS 对象数组）
    │   └── renderer.js           # 数据 → HTML 字符串的渲染函数
    └── styles/
        ├── variables.css         # 设计令牌（颜色、间距等 CSS 变量）
        ├── base.css              # Reset + body 样式 + 渐变背景
        ├── animations.css        # 关键帧 + 10 种切页过渡效果 CSS
        ├── cursor.css            # 光标样式（常态 + hover 态）
        ├── slides.css            # 幻灯片布局（cover / section / content）
        ├── components.css        # 可复用组件（card / list / pill / flow / quote / split）
        └── nav.css               # 底部导航栏 + 圆点指示器
```

---

## 四、核心架构详解

### 4.1 数据驱动的幻灯片系统

**核心思想**：所有幻灯片内容定义在 `src/slides/data.js` 中，每页是一个 JS 对象，通过 `type` 字段决定布局。

#### 支持的幻灯片类型

| type | 用途 | 关键字段 |
|------|------|----------|
| `cover` | 封面页 | `tag`, `title`, `subtitle`, `pills` |
| `section` | 章节分隔页 | `label`, `title`, `desc` |
| `split-content` | 左右对比布局 | `title`, `left: {boxTitle, items/html}`, `right: {boxTitle, items/html}` |
| `cards` | 卡片网格布局 | `title`, `cards: [{icon, title, body}]`, `cols` (2或3), `centered`, `maxWidth` |
| `flow` | 流程步骤布局 | `title`, `steps: [{num, label, desc}]` |
| `raw` | 自由 HTML | `html` (原始 HTML 字符串), `slideClass`, `className` |

#### 数据格式示例

```javascript
// 封面页
{
  type: 'cover',
  tag: '⚡ Engineering Practice',
  title: '演讲标题<br>第二行',
  subtitle: '副标题描述',
  pills: ['🔧 标签1', '🤖 标签2', '⚡ 标签3'],
}

// 章节分隔页
{
  type: 'section',
  label: 'Part 02',
  title: '🔧 章节标题',
  desc: '章节描述文字',
}

// 左右对比页
{
  type: 'split-content',
  title: '标题：<span class="accent">高亮关键词</span>',
  left: {
    boxTitle: '⚠ 问题描述',
    boxTitleClass: 'red',         // 'red' 或 'green'
    items: [
      { dot: '#f76c6c', text: '问题点一，<strong>加粗内容</strong>' },
      { dot: '#f76c6c', text: '问题点二' },
    ],
  },
  right: {
    boxTitle: '✅ 解决方案',
    boxTitleClass: 'green',
    items: [
      { text: '<strong>方案一</strong>：描述' },
      { text: '<strong>方案二</strong>：描述' },
    ],
    // 或者用 html 替代 items:
    // html: `<div>自定义HTML内容</div>`,
  },
}

// 卡片网格页
{
  type: 'cards',
  title: '标题 <span class="accent">关键词</span>',
  centered: true,    // 可选，居中对齐
  cols: 2,           // 2 或 3 列
  maxWidth: '800px', // 可选，限制最大宽度
  cards: [
    { icon: '🔓', title: '卡片标题', body: '描述文字' },
    { icon: '🔗', title: '卡片标题', body: '描述文字', colorClass: 'green' },
    // colorClass: 'green' | 'orange' | 不填(默认紫色)
  ],
}

// 流程步骤页
{
  type: 'flow',
  title: '流程标题<span class="accent">高亮</span>',
  steps: [
    { num: 1, label: '步骤名称', desc: '（补充说明）' },
    { num: 2, label: '步骤名称', desc: '（补充说明）' },
  ],
}

// 自由 HTML 页（用于复杂的一次性布局）
{
  type: 'raw',
  slideClass: 'slide-section',  // 可选，替代默认的 slide-content
  className: 'centered',        // 可选，额外 CSS 类
  html: `<h2 class="slide-title anim-1">标题</h2>
         <div class="anim-2">内容...</div>`,
}
```

### 4.2 渲染器 (`renderer.js`)

- 纯函数 `renderSlide(slide, index)` 通过 `switch(slide.type)` 分发
- 每个类型生成对应的 HTML 字符串
- 自动添加 `data-index` 属性和页码徽章 `.slide-num`
- 第一页自动添加 `active` 类
- 内容元素添加 `anim-1` ~ `anim-6` 类实现入场动画的逐级延迟

### 4.3 入场动画系统

使用 CSS 类 `anim-1` 到 `anim-6` 实现交错入场：

```css
.slide.active .anim-1 { animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s forwards; opacity: 0; }
.slide.active .anim-2 { animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s forwards; opacity: 0; }
/* ... 每级延迟 0.1s */
```

关键帧 `popIn` 从 `translateY(30px) + opacity:0` 过渡到自然位置。

### 4.4 十种切页过渡效果

通过在 `#slides-wrapper` 上设置 `data-transition` 属性，CSS 选择器匹配对应的过渡效果：

| 效果名 | 标签 | 描述 | 时长 |
|--------|------|------|------|
| `slideHorizontal` | Slide | 水平滑动 | 600ms |
| `fadeScale` | Zoom | 淡入缩放 | 700ms |
| `slideVertical` | Vertical | 垂直滑入 | 650ms |
| `rotateDoor` | Door | 旋转门（透视3D） | 700ms |
| `flipCard` | Flip | 翻转卡片 | 700ms |
| `cubeRotate` | Cube | 立方体旋转 | 750ms |
| `elasticPop` | Pop | 弹性缩放 | 650ms |
| `blurThrough` | Blur | 模糊穿越 | 600ms |
| `slideDiagonal` | Diagonal | 对角线滑动 | 650ms |
| `rippleExpand` | Ripple | 涟漪扩散 | 700ms |

**工作原理**：

1. CSS 定义每种效果的三种状态：默认态（入场初始）、`.active`（展示态）、`.exit`（退场态）
2. JS 的 `applyEntryStyle()` 根据翻页方向（前进/后退）设置入场的 transform 初始值
3. 双 `requestAnimationFrame` 技巧确保初始样式绘制后再清除，触发 CSS transition
4. 每次翻页自动循环到下一种效果

### 4.5 自定义光标

双元素结构：

- **`#cursor-dot`**：6px 圆点，实时跟随鼠标（`mousemove` 直接设置 transform）
- **`#cursor-ring`**：36px 空心圆环，通过 `requestAnimationFrame` + 线性插值（lerp 0.15）弹性跟随

Hover 状态：所有 `.hover-target` 元素触发 `body.cursor-hover`，此时内点缩为 0，外环放大为 60px 并添加紫色背景填充。

**注意**：`body` 和所有交互元素设置了 `cursor: none !important` 隐藏系统光标。

### 4.6 导航系统

- **导航栏**：默认隐藏在屏幕底部外（`transform: translateY(100%)`），鼠标移至底部 80px 区域时滑入显示
- **导航圆点**：动态生成，当前页圆点 1.6x 放大 + 紫色发光
- **进度条**：顶部 4px，三色渐变（紫→青→橙），宽度随页码百分比变化
- **滚轮翻页**：800ms 冷却期防止连续快滚
- **触屏支持**：50px 滑动阈值

---

## 五、设计令牌（颜色系统）

```css
:root {
  --bg: #0f1117;                           /* 主背景 */
  --surface: #1a1d2e;                      /* 卡片/面板背景 */
  --surface2: #252840;                     /* 次级面板 */
  --accent: #7c6af7;                       /* 主色：紫 */
  --accent2: #56cfb2;                      /* 辅色：青/绿 */
  --accent3: #f7a76c;                      /* 辅色：橙 */
  --text: #e8eaf6;                         /* 主文字 */
  --text-muted: #8b90b8;                   /* 次文字 */
  --border: rgba(124, 106, 247, 0.25);     /* 边框（紫色透明） */
  --glow: rgba(124, 106, 247, 0.15);       /* 发光阴影 */
}
```

**渐变背景**：`body` 使用四色渐变 + `background-size: 400% 400%` + `gradientBG` 动画实现缓慢流动效果。

**颜色约定**：
- 红色 `#f76c6c` — 用于问题/警告/痛点
- 绿色 `var(--accent2)` — 用于解决方案/优势
- 紫色 `var(--accent)` — 主强调色
- 橙色 `var(--accent3)` — 次强调色

---

## 六、可复用的 CSS 组件

### 6.1 卡片 `.card`

```html
<div class="card hover-target">
  <div class="card-icon">🔓</div>
  <div class="card-title">标题</div>
  <div class="card-body">描述</div>
</div>
```
- Hover 效果：上移 8px + 放大 1.02 + 顶部渐变条从左展开
- 颜色变体：`.card.green`, `.card.orange` 改变顶部条颜色

### 6.2 列表 `.list` + `.list-item`

```html
<div class="list">
  <div class="list-item hover-target">
    <div class="list-dot"></div>       <!-- 默认紫色，.green 绿色 -->
    <div>内容文字</div>
  </div>
</div>
```
- Hover 效果：右移 8px + 边框显现

### 6.3 药丸标签 `.pill`

```html
<span class="pill hover-target">🔧 标签文字</span>
```
- Hover 效果：背景填充紫色 + 上移 2px

### 6.4 分栏布局 `.split` + `.split-box`

```html
<div class="split">                    <!-- grid: 1fr 1fr -->
  <div class="split-box hover-target">
    <div class="split-box-title red">标题</div>
    <!-- 内容 -->
  </div>
  <div class="split-box hover-target">
    <div class="split-box-title green">标题</div>
    <!-- 内容 -->
  </div>
</div>
```

### 6.5 流程 `.flow`

```html
<div class="flow">
  <div class="flow-step hover-target">
    <div class="flow-num">1</div>
    <div class="flow-content">
      <strong>步骤名</strong>
      <span>描述</span>
    </div>
  </div>
  <div class="flow-arrow"></div>       <!-- 带下落动画的连接线 -->
  <!-- 更多步骤... -->
</div>
```

### 6.6 引用框 `.quote-box`

```html
<div class="quote-box hover-target">
  引用内容，支持 <strong>加粗</strong>
</div>
```
- 左侧紫色竖条 + 渐变背景，hover 时竖条加宽

---

## 七、关键实现模式

### 7.1 HTML 外壳结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>演讲标题</title>
</head>
<body>
  <div id="cursor-dot"></div>
  <div id="cursor-ring"></div>
  <div id="progress-bar"></div>
  <div id="slides-wrapper"></div>
  <div id="nav">
    <button class="nav-btn hover-target" id="prevBtn" onclick="changeSlide(-1)" disabled>← 上一页</button>
    <div class="nav-dots" id="navDots"></div>
    <span id="slide-counter">1 / N</span>
    <button class="nav-btn hover-target" id="nextBtn" onclick="changeSlide(1)">下一页 →</button>
  </div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

### 7.2 入口文件模式 (`main.js`)

```javascript
// 1. 导入所有 CSS（Vite 处理）
import './styles/variables.css';
import './styles/base.css';
// ... 其他 CSS

// 2. 导入模块
import { slides } from './slides/data.js';
import { renderSlide } from './slides/renderer.js';
import { initCursor } from './js/cursor.js';
import { initNavigation, changeSlide } from './js/navigation.js';

// 3. 渲染所有幻灯片
const wrapper = document.getElementById('slides-wrapper');
wrapper.innerHTML = slides.map((slide, i) => renderSlide(slide, i)).join('');

// 4. 初始化交互
initCursor();
initNavigation();

// 5. 暴露全局方法供 HTML onclick 使用
window.changeSlide = changeSlide;
```

### 7.3 Vite 配置

```javascript
import { defineConfig } from 'vite';
export default defineConfig({
  root: '.',
  build: { outDir: 'dist', assetsDir: 'assets' },
  server: { open: true },
});
```

### 7.4 package.json 要点

```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^6.3.5"
  }
}
```

---

## 八、如何复用此项目

### 8.1 给 AI 的提示模板

将本文档 + 你的演讲大纲交给 AI 时，可以使用如下提示：

```
请参考附件中的 SLIDES-PLAYBOOK.md，为我生成一套全屏幻灯片演示应用。

我的演讲大纲如下：
---
[粘贴你的大纲/文案]
---

要求：
1. 保持相同的项目结构和技术栈（Vanilla JS + CSS + Vite）
2. 保持 10 种切页过渡效果和自定义光标
3. 根据我的内容自动选择合适的幻灯片类型（cover / section / split-content / cards / flow / raw）
4. 保持暗色主题风格，可以调整主色调
5. 总页数控制在 15~25 页
```

### 8.2 仅替换内容（最简路径）

如果只想换文案、不改结构，只需修改 `src/slides/data.js`：

1. 修改 `TOTAL_SLIDES` 为你的实际页数
2. 修改 `slides` 数组中每个对象的文案
3. 修改 `index.html` 中的 `<title>` 和导航计数器
4. 运行 `npm run dev` 预览

### 8.3 自定义颜色主题

修改 `src/styles/variables.css` 中的 CSS 变量即可全局换色：

```css
:root {
  --accent: #你的主色;
  --accent2: #你的辅色;
  --accent3: #你的第三色;
  /* 相应调整 --border 和 --glow 为主色的透明版本 */
}
```

同时修改 `base.css` 中 body 的渐变背景色。

### 8.4 增减幻灯片类型

如果需要新的布局类型：

1. 在 `data.js` 中定义新 type 名称和数据结构
2. 在 `renderer.js` 的 `switch` 中添加对应的渲染分支
3. 在 `components.css` 或 `slides.css` 中添加对应的样式

---

## 九、注意事项

1. **`hover-target` 类**：所有需要光标交互效果的元素都必须添加此类
2. **`anim-N` 类**：内容元素按出现顺序添加 `anim-1` 到 `anim-6`，实现交错入场
3. **`TOTAL_SLIDES` 常量**：必须与 `slides` 数组长度一致，导航和进度条依赖此值
4. **`raw` 类型**：可以在 `html` 字段中使用任何 CSS 类（card、list、split 等），但需要自己管理 `anim-N` 类
5. **标题高亮**：使用 `<span class="accent">` / `<span class="accent2">` / `<span class="accent3">` 实现关键词着色
6. **列表项着色**：`dot` 字段支持 CSS 颜色值（如 `#f76c6c`）或预定义值 `'green'`
7. **卡片颜色变体**：`colorClass` 支持 `'green'` 和 `'orange'`
8. **系统光标隐藏**：`base.css` 中 `cursor: none !important` 应用于 body 及常见交互元素

---

## 十、完整文件内容参考

本项目的核心代码量极小，全部文件总计约 900 行（含 CSS）。当 AI 需要从零生成时，按以下顺序创建：

1. `package.json` → `vite.config.js` → `index.html`
2. `src/styles/variables.css` → `base.css` → `animations.css` → `cursor.css` → `slides.css` → `components.css` → `nav.css`
3. `src/slides/data.js`（填入内容）→ `src/slides/renderer.js`
4. `src/js/cursor.js` → `src/js/navigation.js`
5. `src/main.js`（组装入口）
6. 运行 `npm install && npm run dev`
