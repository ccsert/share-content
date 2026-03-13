/**
 * 幻灯片数据定义
 * 每个 slide 对象描述一页的类型、内容和结构
 */
export const TOTAL_SLIDES = 19;

export const slides = [
  // ── Slide 1: Cover ──
  {
    type: 'cover',
    tag: '⚡ Engineering Practice',
    title: 'AI协作开发<br>工程化实践',
    subtitle: '从单线程等待到真正的并行协作',
    pills: ['🔧 工具链现代化', '🤖 AI编程助手', '⚡ 并行开发', '📐 工程化思维'],
  },

  // ── Slide 2: 引言 ──
  {
    type: 'split-content',
    title: '一、引言：<span class="accent">根本痛点</span>',
    left: {
      boxTitle: '⚠ 传统单线程问题',
      boxTitleClass: 'red',
      items: [
        { dot: '#f76c6c', text: '单线程模型的<strong>吞吐量限制</strong>' },
        { dot: '#f76c6c', text: '同步等待机制导致<strong>效率低下</strong>' },
        { dot: '#f76c6c', text: '大量时间浪费在<strong>确认和往复沟通</strong>' },
      ],
    },
    right: {
      boxTitle: '✅ 解决方向',
      boxTitleClass: 'green',
      html: `
        <div style="font-size:15px;color:var(--text-muted);line-height:1.8;margin-top:8px;">
          通过<strong style="color:#fff">工程化手段</strong>实现人与AI的真正<strong style="color:var(--accent2)">并行协作</strong>，让开发者能够同步推进多条工作线索，而不是被迫等待。
        </div>
        <div class="hover-target" style="margin-top:16px;padding:12px 16px;background:rgba(86,207,178,0.1);border-radius:8px;border:1px solid rgba(86,207,178,0.3);font-size:14px;color:var(--accent2);transition:all 0.3s;">
          🎯 核心：人与AI真正并行，而非串行等待
        </div>`,
    },
  },

  // ── Slide 3: Section - 工具链 ──
  {
    type: 'section',
    label: 'Part 02',
    title: '🔧 工具链现代化',
    desc: '用更好的工具解决上下文污染与浏览器自动化问题',
  },

  // ── Slide 4: Skills系统 ──
  {
    type: 'split-content',
    title: 'Skills系统：解决 <span class="accent">MCP 上下文污染</span>',
    left: {
      boxTitle: '⚠ MCP 的隐形开销',
      boxTitleClass: 'red',
      items: [
        { dot: '#f76c6c', text: 'Agent启动时<strong>自动注册所有工具</strong>' },
        { dot: '#f76c6c', text: '持久占用上下文窗口，AI<strong>越来越健忘</strong>' },
      ],
    },
    right: {
      boxTitle: '✅ Skills 的按需哲学',
      boxTitleClass: 'green',
      items: [
        { text: '<strong>按需加载</strong>：仅在需要时占用上下文' },
        { text: '<strong>智能发现</strong>：<code style="color:var(--accent2)">find-skills</code> 自动推荐' },
        { text: '<strong>自主创建</strong>：<code style="color:var(--accent2)">skill-creator</code> 沉淀工作流' },
      ],
    },
  },

  // ── Slide 5: Section - AI生态 ──
  {
    type: 'section',
    label: 'Part 03',
    title: '🤖 AI 编程助手生态',
    desc: '选择适合你的 Coding Agent 工具',
  },

  // ── Slide 6: 工具选择原则 ──
  {
    type: 'cards',
    title: '工具选择的 <span class="accent">4 大原则</span>',
    centered: true,
    cols: 2,
    maxWidth: '800px',
    cards: [
      { icon: '🔓', title: '不强绑定供应商', body: '保持灵活性，随时切换更聪明的模型' },
      { icon: '🔗', title: '支持外部集成', body: '能无缝接入 CLI、CI/CD 和自动化管道', colorClass: 'green' },
      { icon: '📚', title: '文档完善 & 社区活跃', body: '遇到玄学 Bug 时，社区是你唯一的救命稻草', colorClass: 'orange' },
      { icon: '🔍', title: '开源或透明架构', body: '黑盒工具在复杂工程中往往会成为瓶颈' },
    ],
  },

  // ── Slide 7: Section - 并行开发 ──
  {
    type: 'section',
    label: 'Part 04',
    title: '⚡ 并行开发实践',
    desc: 'Git Worktree + vibekanban 实现真正的效率倍增',
  },

  // ── Slide 8: Git Worktree ──
  {
    type: 'raw',
    html: `
    <h2 class="slide-title anim-1">Git Worktree：<span class="accent">并行开发基础</span></h2>
    <div class="split">
      <div class="anim-2">
        <div style="font-size:15px;color:var(--text-muted);margin-bottom:16px;line-height:1.6;">允许在同一仓库中创建多个工作目录，每个目录可独立检出不同分支。</div>
        <div class="list">
          <div class="list-item hover-target"><div class="list-dot green"></div><div>打破<strong>单分支开发</strong>的限制</div></div>
          <div class="list-item hover-target"><div class="list-dot green"></div><div>真正实现<strong>并行多线开发</strong></div></div>
        </div>
        <div class="hover-target" style="margin-top:16px;font-size:13px;color:rgba(247,108,108,0.9);padding:12px;background:rgba(247,108,108,0.1);border-radius:8px;border:1px dashed rgba(247,108,108,0.3);transition:all 0.3s;">
          ⚠️ 直接使用的痛点：需手动管理工作区 · 合并冲突复杂 · 依赖难追踪
        </div>
      </div>
      <div class="hover-target anim-3" style="background:#0d1117;border:1px solid var(--border);border-radius:12px;padding:20px;font-family:monospace;font-size:14px;color:#c9d1d9;line-height:1.8;transition:all 0.3s;">
        <span style="color:#8b949e"># 传统方式：串行等待</span><br>
        <span style="color:#ff7b72">git</span> checkout feature-a <br><br>
        <span style="color:#8b949e"># Worktree方式：三个任务同时进行 ✅</span><br>
        <span style="color:#ff7b72">git</span> worktree add ../feature-a feature-a<br>
        <span style="color:#ff7b72">git</span> worktree add ../feature-b feature-b<br>
        <span style="color:#ff7b72">git</span> worktree add ../bugfix-1 bugfix-1<br>
      </div>
    </div>`,
  },

  // ── Slide 9: vibekanban ──
  {
    type: 'cards',
    title: 'vibekanban：<span class="accent2">任务驱动的并行工作流</span>',
    cols: 3,
    cards: [
      { icon: '📋', title: '自动任务创建', body: '基于仓库特性自动生成任务及其关联关系' },
      { icon: '🌿', title: '工作区自动化', body: '为每个任务自动创建对应的 Git Worktree', colorClass: 'green' },
      { icon: '🤖', title: 'Agent 集成', body: '在工作区内与 OpenCode / Claude Code 对接', colorClass: 'orange' },
      { icon: '⚔️', title: '冲突处理', body: '集成化的冲突解决，支持 Agent 辅助处理' },
      { icon: '📊', title: '可视化管理', body: '看板式任务管理界面，直观掌控全局', colorClass: 'green' },
    ],
  },

  // ── Slide 10: 端到端工作流 ──
  {
    type: 'flow',
    title: '端到端<span class="accent">并行工作流</span>',
    steps: [
      { num: 1, label: '需求分析 → 任务拆解', desc: '（人工）识别可并行的独立任务' },
      { num: 2, label: '任务输入 vibekanban', desc: '（自动）自动创建 Worktree' },
      { num: 3, label: '为每个工作区分配 Agent', desc: '（自动调度）并行开发' },
      { num: 4, label: '任务完成 → 提交合并请求', desc: '（自动）' },
      { num: 5, label: '人工审核 → 最终合并', desc: '（人工）质量把关与冲突解决' },
    ],
  },

  // ── Slide 11: 实战案例 ──
  {
    type: 'raw',
    html: `
    <h2 class="slide-title anim-1">🔥 实战案例：<span class="accent3">开发带权限的 Dashboard</span></h2>
    <div class="quote-box hover-target anim-2" style="margin-bottom:24px;border-color:var(--accent3);">
      <strong>传统串行：</strong>建表(1h) → 写接口(1h) → 写前端UI(2h) → 联调(1h) = <strong>5小时</strong>
    </div>
    <div class="cards cols-3 anim-3">
      <div class="card hover-target" style="border-top:3px solid var(--accent)">
        <div class="card-title">Worktree 1：数据库层</div>
        <div class="card-body"><strong>分配给 Agent A：</strong><br>设计 User/Role 表结构，编写 Prisma schema，生成迁移文件。</div>
      </div>
      <div class="card hover-target" style="border-top:3px solid var(--accent2)">
        <div class="card-title">Worktree 2：API 接口层</div>
        <div class="card-body"><strong>分配给 Agent B：</strong><br>基于统一的接口文档，编写 Mock 数据和 JWT 鉴权中间件逻辑。</div>
      </div>
      <div class="card hover-target" style="border-top:3px solid var(--accent3)">
        <div class="card-title">Worktree 3：前端 UI 层</div>
        <div class="card-body"><strong>分配给 Agent C：</strong><br>使用 Tailwind 编写静态页面，预留 API 请求的 Hook。</div>
      </div>
    </div>
    <div class="hover-target anim-4" style="text-align:center;margin-top:20px;color:var(--accent2);font-weight:bold;font-size:18px;padding:10px;border-radius:8px;transition:all 0.3s;">
      🚀 并行耗时：Max(1h, 1h, 2h) + 合并联调(0.5h) = 2.5小时 (提效 50%)
    </div>`,
  },

  // ── Slide 12: 避坑指南 ──
  {
    type: 'raw',
    html: `
    <h2 class="slide-title anim-1">🚧 避坑指南：<span class="accent">并行开发的真实挑战</span></h2>
    <div class="list anim-2">
      <div class="list-item hover-target">
        <div class="list-dot" style="background:#f76c6c;margin-top:12px"></div>
        <div>
          <strong style="color:#f76c6c;font-size:16px;">坑 1：任务粒度过大导致 AI 幻觉</strong><br>
          <span style="color:var(--text-muted);font-size:14px;">现象：让 AI "写个登录模块"，结果它引入了一堆不需要的第三方库。<br>
          解法：拆分到函数级或组件级，明确输入输出。</span>
        </div>
      </div>
      <div class="list-item hover-target">
        <div class="list-dot" style="background:#f76c6c;margin-top:12px"></div>
        <div>
          <strong style="color:#f76c6c;font-size:16px;">坑 2：忽略依赖关系导致"地狱级"合并冲突</strong><br>
          <span style="color:var(--text-muted);font-size:14px;">现象：两个 Agent 同时修改了核心的配置文件。<br>
          解法：人工梳理依赖图，有交集的任务必须串行，完全解耦的任务才并行。</span>
        </div>
      </div>
      <div class="list-item hover-target">
        <div class="list-dot" style="background:#f76c6c;margin-top:12px"></div>
        <div>
          <strong style="color:#f76c6c;font-size:16px;">坑 3：缺乏验收标准导致反复返工</strong><br>
          <span style="color:var(--text-muted);font-size:14px;">现象：Agent 跑完了，但代码根本跑不起来。<br>
          解法：强制 TDD（测试驱动开发），先让 AI 写测试用例，测试通过才算任务完成。</span>
        </div>
      </div>
    </div>`,
  },

  // ── Slide 13: 时间对比 ──
  {
    type: 'raw',
    className: 'centered',
    html: `
    <h2 class="slide-title anim-1" style="text-align:center;border:none;margin-bottom:24px;">效率对比：<span class="accent">串行</span> vs <span class="accent2">并行</span></h2>
    <div class="split anim-2" style="max-width:800px;text-align:center;">
      <div class="split-box hover-target" style="padding:40px 20px;">
        <div style="font-size:14px;color:var(--text-muted);letter-spacing:2px;margin-bottom:12px;">🐢 传统串行开发</div>
        <div style="font-size:64px;font-weight:800;color:#f76c6c;line-height:1;">6h</div>
        <div style="font-size:14px;color:var(--text-muted);margin-top:12px;">Task1 + Task2 + Task3</div>
      </div>
      <div class="split-box hover-target" style="padding:40px 20px;border-color:var(--accent2);box-shadow:0 0 20px rgba(86,207,178,0.1);">
        <div style="font-size:14px;color:var(--text-muted);letter-spacing:2px;margin-bottom:12px;">🚀 现代并行开发</div>
        <div style="font-size:64px;font-weight:800;color:var(--accent2);line-height:1;">2.5h</div>
        <div style="font-size:14px;color:var(--text-muted);margin-top:12px;">Max(T1, T2, T3) + 冲突处理</div>
      </div>
    </div>`,
  },

  // ── Slide 14: Section - 工程化思维 ──
  {
    type: 'section',
    label: 'Part 05',
    title: '📐 工程化思维升级',
    desc: '文档先行 · 任务粒度 · 人类价值重新定义',
  },

  // ── Slide 15: 文档先行 ──
  {
    type: 'raw',
    html: `
    <h2 class="slide-title anim-1">思维升级：<span class="accent">文档先行原则</span></h2>
    <div class="quote-box hover-target anim-2" style="margin-bottom:20px;">
      核心理念：用<strong>文档驱动</strong>开发流程，而非代码驱动。让文档本身成为 Agent 可以理解和执行的规范。
    </div>
    <div class="cards cols-2 anim-3">
      <div class="card hover-target">
        <div class="card-title">实施步骤</div>
        <div class="list" style="margin-top:10px;">
          <div class="list-item" style="padding:8px;margin-bottom:4px;font-size:13px;"><div class="list-dot"></div><div>明确需求转换为文档</div></div>
          <div class="list-item" style="padding:8px;margin-bottom:4px;font-size:13px;"><div class="list-dot"></div><div>定义清晰的集成协议</div></div>
          <div class="list-item" style="padding:8px;margin-bottom:4px;font-size:13px;"><div class="list-dot"></div><div>Agent 基于规范处理琐碎事务</div></div>
        </div>
      </div>
      <div class="card green hover-target">
        <div class="card-title">带来的优势</div>
        <div class="list" style="margin-top:10px;">
          <div class="list-item" style="padding:8px;margin-bottom:4px;font-size:13px;"><div class="list-dot green"></div><div>降低沟通成本和歧义</div></div>
          <div class="list-item" style="padding:8px;margin-bottom:4px;font-size:13px;"><div class="list-dot green"></div><div>Agent 执行更精准</div></div>
          <div class="list-item" style="padding:8px;margin-bottom:4px;font-size:13px;"><div class="list-dot green"></div><div>建立可追溯的需求链路</div></div>
        </div>
      </div>
    </div>`,
  },

  // ── Slide 16: 任务粒度设计 ──
  {
    type: 'split-content',
    title: '思维升级：<span class="accent2">任务粒度设计</span>',
    left: {
      boxTitle: '细粒度任务的好处',
      boxTitleClass: 'green',
      items: [
        { dot: 'green', text: '<strong>便于并行化</strong>：更多独立任务' },
        { dot: 'green', text: '<strong>便于验证</strong>：成功标准明确' },
        { dot: 'green', text: '<strong>便于 Agent 处理</strong>：减少决策难度' },
      ],
    },
    right: {
      boxTitle: '需要人工参与的部分',
      boxTitleClass: 'red',
      items: [
        { dot: '#f76c6c', text: '任务拆解时的<strong>逻辑检查</strong>' },
        { dot: '#f76c6c', text: '<strong>依赖关系</strong>的确认' },
        { dot: '#f76c6c', text: '重要架构的<strong>决策审核</strong>' },
      ],
    },
  },

  // ── Slide 17: 人类价值重新定义 ──
  {
    type: 'raw',
    className: 'centered',
    html: `
    <h2 class="slide-title anim-1" style="text-align:center;border:none;margin-bottom:20px;">人类价值的<span class="accent">重新定义</span></h2>
    <div class="anim-2" style="display:flex;gap:40px;align-items:center;margin-bottom:30px;">
      <div class="hover-target" style="background:rgba(255,255,255,0.05);padding:24px 40px;border-radius:16px;text-align:center;color:var(--text-muted);transition:all 0.3s;">
        <div style="font-size:20px;margin-bottom:12px;">传统价值</div>
        <div style="line-height:2;">编写代码<br>逐行调试<br>手工测试</div>
      </div>
      <div style="font-size:32px;color:var(--accent);">→</div>
      <div class="hover-target" style="background:rgba(124,106,247,0.1);border:1px solid var(--accent);padding:24px 40px;border-radius:16px;text-align:center;color:#fff;box-shadow:0 0 20px rgba(124,106,247,0.2);transition:all 0.3s;">
        <div style="font-size:20px;margin-bottom:12px;color:var(--accent);">现代价值</div>
        <div style="line-height:2;font-weight:bold;">规划和架构<br>系统设计<br>流程协调</div>
      </div>
    </div>
    <div class="quote-box hover-target anim-3" style="font-size:15px;max-width:800px;">
      💡 开发者并没有变得"无用"——恰恰相反，这对开发者提出了<strong>更高的要求</strong>。能够有效协调资源、设计工程流程、做出关键决策的工程师，将比单纯的代码编写者更加宝贵。
    </div>`,
  },

  // ── Slide 18: 从执行者到协调者 ──
  {
    type: 'cards',
    title: '心态转变：<span class="accent3">从执行者到协调者</span>',
    cols: 3,
    cards: [
      { icon: '🧠', title: '接受现实', body: '接受 AI 在特定代码片段上写得比自己更快、更标准。' },
      { icon: '🎯', title: '转变视角', body: '从"我来做"转变为"我来协调"，成为团队的 Tech Lead。' },
      { icon: '🦅', title: '提升格局', body: '投入精力到战略层面（架构、安全、性能）而非战术层面。' },
    ],
  },

  // ── Slide 19: 总结 ──
  {
    type: 'raw',
    slideClass: 'slide-section',
    html: `
    <div class="section-label anim-1">Conclusion</div>
    <div class="section-title anim-2" style="margin-bottom:40px;">工程师的新定义</div>
    <div class="anim-3" style="display:flex;flex-wrap:wrap;justify-content:center;gap:16px;max-width:900px;">
      <div class="card hover-target" style="width:160px;text-align:center;padding:20px 10px;">
        <div class="card-icon">🏛️</div>
        <div class="card-title" style="font-size:14px;">架构师</div>
        <div class="card-body" style="font-size:12px;">系统整体设计</div>
      </div>
      <div class="card hover-target" style="width:160px;text-align:center;padding:20px 10px;">
        <div class="card-icon">⚙️</div>
        <div class="card-title" style="font-size:14px;">工程师</div>
        <div class="card-body" style="font-size:12px;">优化开发流程</div>
      </div>
      <div class="card hover-target" style="width:160px;text-align:center;padding:20px 10px;border-color:var(--accent);box-shadow:0 0 15px var(--glow);">
        <div class="card-icon">🎯</div>
        <div class="card-title" style="font-size:14px;color:var(--accent);">协调者</div>
        <div class="card-body" style="font-size:12px;">多工具/AI协作</div>
      </div>
      <div class="card hover-target" style="width:160px;text-align:center;padding:20px 10px;">
        <div class="card-icon">📖</div>
        <div class="card-title" style="font-size:14px;">学习者</div>
        <div class="card-body" style="font-size:12px;">拓展技术视野</div>
      </div>
      <div class="card hover-target" style="width:160px;text-align:center;padding:20px 10px;">
        <div class="card-icon">🧠</div>
        <div class="card-title" style="font-size:14px;">思考者</div>
        <div class="card-body" style="font-size:12px;">探索工程价值</div>
      </div>
    </div>`,
  },
];
