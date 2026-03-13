/**
 * 自定义光标模块
 * 实现内点实时跟随 + 外环弹性跟随效果
 */
export function initCursor() {
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  // 内点实时跟随鼠标
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
  });

  // 外环弹性跟随动画 (缓动算法)
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // 绑定 hover 状态切换
  bindHoverTargets();
}

/**
 * 为所有 .hover-target 元素绑定光标样式切换
 * 可在 DOM 更新后重新调用
 */
export function bindHoverTargets() {
  document.querySelectorAll('.hover-target').forEach((el) => {
    // 防止重复绑定
    if (el.dataset.cursorBound) return;
    el.dataset.cursorBound = 'true';
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}
