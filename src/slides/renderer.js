import { TOTAL_SLIDES } from './data.js';

/**
 * 根据 slide 数据生成 HTML 字符串
 */
function renderListItems(items) {
  return items
    .map((item) => {
      const dotStyle = item.dot && item.dot !== 'green'
        ? ` style="background:${item.dot};box-shadow:0 0 8px ${item.dot}"`
        : '';
      const dotClass = item.dot === 'green' ? ' green' : '';
      return `<div class="list-item hover-target"><div class="list-dot${dotClass}"${dotStyle}></div><div>${item.text}</div></div>`;
    })
    .join('');
}

function renderSplitBox(box, animClass) {
  const titleClass = box.boxTitleClass ? ` ${box.boxTitleClass}` : '';
  let content = '';
  if (box.items) {
    content = `<div class="list" style="margin-top:0">${renderListItems(box.items)}</div>`;
  } else if (box.html) {
    content = box.html;
  }
  return `
    <div class="split-box hover-target ${animClass}">
      <div class="split-box-title${titleClass}">${box.boxTitle}</div>
      ${content}
    </div>`;
}

export function renderSlide(slide, index) {
  const num = `<div class="slide-num">${String(index + 1).padStart(2, '0')} / ${TOTAL_SLIDES}</div>`;
  const activeClass = index === 0 ? ' active' : '';

  switch (slide.type) {
    case 'cover':
      return `
        <div class="slide slide-cover${activeClass}" data-index="${index}">
          ${num}
          <div class="cover-tag anim-1">${slide.tag}</div>
          <div class="cover-title anim-2">${slide.title}</div>
          <div class="cover-subtitle anim-3">${slide.subtitle}</div>
          <div class="cover-pills anim-4">
            ${slide.pills.map((p) => `<span class="pill hover-target">${p}</span>`).join('')}
          </div>
        </div>`;

    case 'section':
      return `
        <div class="slide slide-section${activeClass}" data-index="${index}">
          ${num}
          <div class="section-label anim-1">${slide.label}</div>
          <div class="section-title anim-2">${slide.title}</div>
          <div class="section-desc anim-3">${slide.desc}</div>
        </div>`;

    case 'split-content':
      return `
        <div class="slide slide-content${activeClass}" data-index="${index}">
          ${num}
          <h2 class="slide-title anim-1">${slide.title}</h2>
          <div class="split">
            ${renderSplitBox(slide.left, 'anim-2')}
            ${renderSplitBox(slide.right, 'anim-3')}
          </div>
        </div>`;

    case 'cards': {
      const centered = slide.centered ? ' centered' : '';
      const maxW = slide.maxWidth ? ` style="max-width:${slide.maxWidth}"` : '';
      const cardsHtml = slide.cards
        .map((c) => {
          const colorClass = c.colorClass ? ` ${c.colorClass}` : '';
          return `
          <div class="card${colorClass} hover-target">
            <div class="card-icon">${c.icon}</div>
            <div class="card-title">${c.title}</div>
            <div class="card-body">${c.body}</div>
          </div>`;
        })
        .join('');
      return `
        <div class="slide slide-content${centered}${activeClass}" data-index="${index}">
          ${num}
          <h2 class="slide-title anim-1" ${slide.centered ? 'style="text-align:center;border:none;margin-bottom:20px;"' : ''}>${slide.title}</h2>
          <div class="cards cols-${slide.cols} anim-2"${maxW}>
            ${cardsHtml}
          </div>
        </div>`;
    }

    case 'flow': {
      let flowHtml = '';
      slide.steps.forEach((step, i) => {
        const anim = `anim-${i + 2}`;
        flowHtml += `<div class="flow-step hover-target ${anim}"><div class="flow-num">${step.num}</div><div class="flow-content"><strong>${step.label}</strong> <span>${step.desc}</span></div></div>`;
        if (i < slide.steps.length - 1) {
          flowHtml += `<div class="flow-arrow ${anim}"></div>`;
        }
      });
      return `
        <div class="slide slide-content centered${activeClass}" data-index="${index}">
          ${num}
          <h2 class="slide-title anim-1" style="text-align:center;border:none;margin-bottom:20px;">${slide.title}</h2>
          <div class="flow">${flowHtml}</div>
        </div>`;
    }

    case 'raw': {
      const cls = slide.slideClass || 'slide-content';
      const extra = slide.className ? ` ${slide.className}` : '';
      return `
        <div class="slide ${cls}${extra}${activeClass}" data-index="${index}">
          ${num}
          ${slide.html}
        </div>`;
    }

    default:
      return '';
  }
}
