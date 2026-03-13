/**
 * 应用入口
 * 组装样式、数据、渲染器和交互模块
 */

// ── 样式导入（由 Vite 处理） ──
import './styles/variables.css';
import './styles/base.css';
import './styles/animations.css';
import './styles/cursor.css';
import './styles/slides.css';
import './styles/components.css';
import './styles/nav.css';

// ── 模块导入 ──
import { slides } from './slides/data.js';
import { renderSlide } from './slides/renderer.js';
import { initCursor } from './js/cursor.js';
import { initNavigation, changeSlide } from './js/navigation.js';

// ── 渲染所有幻灯片 ──
const wrapper = document.getElementById('slides-wrapper');
wrapper.innerHTML = slides.map((slide, i) => renderSlide(slide, i)).join('');

// ── 初始化交互 ──
initCursor();
initNavigation();

// ── 暴露全局方法供 HTML onclick 使用 ──
window.changeSlide = changeSlide;
