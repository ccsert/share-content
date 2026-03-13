import { TOTAL_SLIDES } from '../slides/data.js';
import { bindHoverTargets } from './cursor.js';

/**
 * 幻灯片导航控制器
 */
let current = 0;
let isAnimating = false;

/** @type {NodeListOf<HTMLElement>} */
let slideElements;
/** @type {HTMLElement} */
let counter;
/** @type {HTMLElement} */
let progressBar;
/** @type {HTMLButtonElement} */
let prevBtn;
/** @type {HTMLButtonElement} */
let nextBtn;

/**
 * 初始化导航系统
 */
export function initNavigation() {
  slideElements = document.querySelectorAll('.slide');
  counter = document.getElementById('slide-counter');
  progressBar = document.getElementById('progress-bar');
  prevBtn = document.getElementById('prevBtn');
  nextBtn = document.getElementById('nextBtn');

  buildDots();
  bindKeyboard();
  bindTouch();
  updateUI();
}

/**
 * 构建底部导航圆点
 */
function buildDots() {
  const dotsContainer = document.getElementById('navDots');
  for (let i = 0; i < TOTAL_SLIDES; i++) {
    const dot = document.createElement('div');
    dot.className = 'nav-dot hover-target' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }
  // 让新创建的 dot 也支持自定义光标
  bindHoverTargets();
}

/**
 * 更新界面状态（计数器、进度条、按钮、圆点）
 */
function updateUI() {
  counter.textContent = `${current + 1} / ${TOTAL_SLIDES}`;
  progressBar.style.width = `${((current + 1) / TOTAL_SLIDES) * 100}%`;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === TOTAL_SLIDES - 1;
  document.querySelectorAll('.nav-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

/**
 * 跳转到指定幻灯片
 */
function goTo(index) {
  if (isAnimating || index === current) return;
  isAnimating = true;

  const dir = index > current ? 1 : -1;
  const prev = slideElements[current];
  const next = slideElements[index];

  prev.classList.add('exit');
  prev.classList.remove('active');

  next.style.transform = `translateX(${dir * 80}px) scale(0.98)`;
  next.style.opacity = '0';
  next.classList.add('active');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      next.style.transform = '';
      next.style.opacity = '';
      setTimeout(() => {
        prev.classList.remove('exit');
        isAnimating = false;
      }, 600);
    });
  });

  current = index;
  updateUI();
}

/**
 * 切换幻灯片（相对偏移）
 */
export function changeSlide(dir) {
  const next = current + dir;
  if (next >= 0 && next < TOTAL_SLIDES) goTo(next);
}

/**
 * 键盘事件绑定
 */
function bindKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      changeSlide(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      changeSlide(-1);
    }
  });
}

/**
 * 触屏滑动事件绑定
 */
function bindTouch() {
  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });
  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) changeSlide(dx < 0 ? 1 : -1);
  });
}
