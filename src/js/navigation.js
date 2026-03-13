import { TOTAL_SLIDES } from '../slides/data.js';
import { bindHoverTargets } from './cursor.js';

/**
 * 幻灯片导航控制器
 * - 滚轮翻页
 * - 底部悬停显示导航栏
 * - 多样化切页动画效果
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
/** @type {HTMLElement} */
let nav;
/** @type {HTMLElement} */
let wrapper;
/** @type {HTMLElement} */
let transitionHint;

/* ── 多样化切页效果列表 ── */
const TRANSITIONS = [
  { name: 'slideHorizontal', label: 'Slide' },
  { name: 'fadeScale',       label: 'Zoom' },
  { name: 'slideVertical',   label: 'Vertical' },
  { name: 'rotateDoor',      label: 'Door' },
  { name: 'flipCard',        label: 'Flip' },
  { name: 'cubeRotate',      label: 'Cube' },
  { name: 'elasticPop',      label: 'Pop' },
  { name: 'blurThrough',     label: 'Blur' },
  { name: 'slideDiagonal',   label: 'Diagonal' },
  { name: 'rippleExpand',    label: 'Ripple' },
];
let transitionIndex = 0;

/** 导航栏显示/隐藏定时器 */
let navHideTimer = null;

/**
 * 初始化导航系统
 */
export function initNavigation() {
  slideElements = document.querySelectorAll('.slide');
  counter = document.getElementById('slide-counter');
  progressBar = document.getElementById('progress-bar');
  prevBtn = document.getElementById('prevBtn');
  nextBtn = document.getElementById('nextBtn');
  nav = document.getElementById('nav');
  wrapper = document.getElementById('slides-wrapper');

  // 创建切页效果提示气泡
  transitionHint = document.createElement('div');
  transitionHint.id = 'transition-hint';
  document.body.appendChild(transitionHint);

  // 设置初始切页效果
  wrapper.dataset.transition = TRANSITIONS[transitionIndex].name;

  buildDots();
  bindKeyboard();
  bindTouch();
  bindWheel();
  bindNavHover();
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
 * 显示切页效果名称提示
 */
function showTransitionHint() {
  const t = TRANSITIONS[transitionIndex];
  transitionHint.textContent = `${t.label}`;
  transitionHint.classList.add('show');
  clearTimeout(transitionHint._timer);
  transitionHint._timer = setTimeout(() => {
    transitionHint.classList.remove('show');
  }, 1200);
}

/**
 * 切换到下一种切页效果
 */
function nextTransition() {
  transitionIndex = (transitionIndex + 1) % TRANSITIONS.length;
  wrapper.dataset.transition = TRANSITIONS[transitionIndex].name;
  showTransitionHint();
}

/**
 * 获取当前效果的过渡时长（ms）
 */
function getTransitionDuration() {
  const name = TRANSITIONS[transitionIndex].name;
  const durations = {
    slideHorizontal: 600,
    fadeScale: 700,
    slideVertical: 650,
    rotateDoor: 700,
    flipCard: 700,
    cubeRotate: 750,
    elasticPop: 650,
    blurThrough: 600,
    slideDiagonal: 650,
    rippleExpand: 700,
  };
  return durations[name] || 600;
}

/**
 * 根据当前效果设置入场初始状态
 */
function applyEntryStyle(el, dir) {
  const name = TRANSITIONS[transitionIndex].name;
  switch (name) {
    case 'slideHorizontal':
      el.style.transform = `translateX(${dir * 80}px) scale(0.98)`;
      break;
    case 'fadeScale':
      el.style.transform = dir > 0 ? 'scale(0.85)' : 'scale(1.15)';
      break;
    case 'slideVertical':
      el.style.transform = `translateY(${dir * 100}%) scale(0.95)`;
      break;
    case 'rotateDoor':
      el.style.transform = `perspective(1200px) rotateY(${dir * 90}deg)`;
      el.style.transformOrigin = dir > 0 ? 'left center' : 'right center';
      break;
    case 'flipCard':
      el.style.transform = `perspective(1400px) rotateX(${dir * 80}deg)`;
      el.style.transformOrigin = dir > 0 ? 'center bottom' : 'center top';
      break;
    case 'cubeRotate':
      el.style.transform = `perspective(1000px) translateZ(-200px) rotateY(${dir * 90}deg)`;
      break;
    case 'elasticPop':
      el.style.transform = `scale(0) rotate(${dir * 12}deg)`;
      break;
    case 'blurThrough':
      el.style.transform = dir > 0 ? 'scale(1.1)' : 'scale(0.9)';
      el.style.filter = 'blur(30px)';
      break;
    case 'slideDiagonal':
      el.style.transform = `translate(${dir * 60}px, ${dir * 60}px) scale(0.92)`;
      break;
    case 'rippleExpand':
      el.style.transform = dir > 0 ? 'scale(0.3)' : 'scale(2)';
      el.style.borderRadius = dir > 0 ? '50%' : '0';
      break;
    default:
      el.style.transform = `translateX(${dir * 80}px) scale(0.98)`;
  }
  el.style.opacity = '0';
}

/**
 * 清除入场过渡样式
 */
function clearEntryStyle(el) {
  el.style.transform = '';
  el.style.opacity = '';
  el.style.filter = '';
  el.style.transformOrigin = '';
  el.style.borderRadius = '';
}

/**
 * 跳转到指定幻灯片
 */
function goTo(index) {
  if (isAnimating || index === current) return;
  isAnimating = true;

  // 每次翻页自动切换下一种效果
  nextTransition();

  const dir = index > current ? 1 : -1;
  const prev = slideElements[current];
  const next = slideElements[index];
  const duration = getTransitionDuration();

  prev.classList.add('exit');
  prev.classList.remove('active');

  // 设置入场初始位置
  applyEntryStyle(next, dir);
  next.classList.add('active');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      clearEntryStyle(next);
      setTimeout(() => {
        prev.classList.remove('exit');
        clearEntryStyle(prev);
        isAnimating = false;
      }, duration);
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

/**
 * 鼠标滚轮翻页
 */
function bindWheel() {
  let wheelCooldown = false;
  document.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (wheelCooldown || isAnimating) return;

    // 判断滚动方向（支持垂直和水平滚轮）
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(delta) < 30) return; // 过滤微小滚动

    changeSlide(delta > 0 ? 1 : -1);

    // 冷却期，防止连续快速翻页
    wheelCooldown = true;
    setTimeout(() => { wheelCooldown = false; }, 800);
  }, { passive: false });
}

/**
 * 底部悬停显示/隐藏导航栏
 */
function bindNavHover() {
  const HOVER_ZONE = 80; // 底部触发区域高度 (px)

  document.addEventListener('mousemove', (e) => {
    const distFromBottom = window.innerHeight - e.clientY;

    if (distFromBottom <= HOVER_ZONE) {
      showNav();
    } else {
      // 不在底部区域，延迟隐藏（允许鼠标滑入导航栏）
      scheduleHideNav();
    }
  });

  // 鼠标在导航栏上时保持显示
  nav.addEventListener('mouseenter', () => {
    showNav();
  });

  nav.addEventListener('mouseleave', () => {
    scheduleHideNav();
  });
}

function showNav() {
  clearTimeout(navHideTimer);
  nav.classList.add('visible');
}

function scheduleHideNav() {
  clearTimeout(navHideTimer);
  navHideTimer = setTimeout(() => {
    nav.classList.remove('visible');
  }, 600);
}
