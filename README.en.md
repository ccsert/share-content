<div align="center">

# AI Collab Slides

![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?style=flat-square&logo=javascript&logoColor=111)
![Vanilla](https://img.shields.io/badge/Framework-Vanilla_JS-222?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-1f9d55?style=flat-square)

A full-screen slide engine built with **Vanilla JS + Vite**, focused on one core workflow:

Users provide a new source document, and AI adapts it into slides while preserving the project's existing visual style.

[中文文档](README.md)

</div>

## Table of Contents

- [Core Positioning](#core-positioning)
- [Highlights](#highlights)
- [Preview](#preview)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Document-Driven Workflow](#document-driven-workflow)
- [Prompt Template](#prompt-template)
- [How to Add or Edit Slides](#how-to-add-or-edit-slides)
- [Interaction](#interaction)
- [Design and Motion](#design-and-motion)
- [Development Notes](#development-notes)
- [Contributing](#contributing)

## Core Positioning

This repository is not just a fixed demo deck.

It is a reusable style engine:

- Input: any source document (speech notes, proposal, PRD, course outline)
- Process: AI splits content into pages and maps them to existing slide types
- Output: a new deck with consistent visual language and interaction

## Highlights

- Document-driven: from manual page-by-page writing to AI-assisted structure generation
- Data-driven: update `src/slides/data.js` to replace the whole deck content
- Rich transitions: 10 built-in page transitions that rotate automatically
- Complete interaction: keyboard, wheel, touch swipe, bottom dot navigation
- Unified look: animated dark gradient + componentized styles + dual-layer cursor
- Lightweight: Vite-only build tooling with zero framework runtime overhead

## Preview

- Local URL after running dev server: `http://localhost:5173`

## Tech Stack

- Vanilla JavaScript (ES Modules)
- Vite 6
- Native CSS (CSS Variables + animation system)

## Quick Start

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start development server

```bash
pnpm dev
```

### 3. Build for production

```bash
pnpm build
```

### 4. Preview production build

```bash
pnpm preview
```

## Project Structure

```text
.
├── index.html
├── src/
│   ├── main.js
│   ├── js/
│   │   ├── cursor.js
│   │   └── navigation.js
│   ├── slides/
│   │   ├── data.js
│   │   └── renderer.js
│   └── styles/
│       ├── variables.css
│       ├── base.css
│       ├── animations.css
│       ├── cursor.css
│       ├── slides.css
│       ├── components.css
│       └── nav.css
├── vite.config.js
├── SLIDES-PLAYBOOK.md
├── DOC-TO-SLIDES-PROMPT.md
└── DOC-TO-SLIDES-PROMPT.en.md
```

## Document-Driven Workflow

1. Prepare a source document
   : Markdown, plain text, meeting notes, or an outline.
2. Feed your document + prompt template to AI
   : Use `DOC-TO-SLIDES-PROMPT.en.md`.
3. Let AI generate slide data
   : Target file is `src/slides/data.js` using existing types (cover, section, split-content, cards, flow, raw).
4. Run and review
   : Start `pnpm dev`, then check pacing, density, and visual rhythm.
5. Fine-tune manually
   : Polish a few key pages and keep narrative consistency.

## Prompt Template

- Copy and use `DOC-TO-SLIDES-PROMPT.en.md` directly.
- Replace placeholders: topic, audience, duration, source document.
- The output format is constrained for direct replacement of `src/slides/data.js`.

## Copilot Skill (Recommended)

This project ships with a `doc-to-slides` Skill. Once installed, AI automatically loads all project constraints — no manual prompt copy-pasting needed.

### Why Skill > Prompt Template?

| | Prompt Template | Skill |
|---|---|---|
| Loading | User manually copies | AI auto-detects and loads |
| Constraint coverage | Depends on user diligence | Always loads full spec |
| Trigger threshold | Must know the template exists | Just say "make slides" |
| Maintenance | Template can drift from code | Single source of truth |

### Installation

Skill lives at `~/.agents/skills/doc-to-slides/`:

```text
doc-to-slides/
├── SKILL.md              # Core instructions (workflow + hard rules + quality bar)
└── references/
    └── playbook.md       # Full technical spec (types, fields, CSS, colors)
```

With VS Code + GitHub Copilot, the skill auto-activates when you mention slides, presentations, decks, or similar keywords.

### Usage

Just say:

```
Turn this document into slides:

[paste your content]
```

The AI will automatically:
1. Load all constraints from the skill
2. Analyze your document structure
3. Present an outline for your approval
4. Generate a drop-in replacement for `src/slides/data.js`

## How to Add or Edit Slides

Edit `src/slides/data.js`. Each slide is an object. Common types:

- `cover`
- `section`
- `split-content`
- `cards`
- `flow`
- `raw`

Example:

```js
{
  type: 'section',
  label: 'Part 06',
  title: '📦 New Chapter',
  desc: 'Chapter description',
}
```

## Interaction

- Next: `→` / `↓` / `Space` / wheel down / swipe left
- Previous: `←` / `↑` / wheel up / swipe right
- Bottom navigation bar: auto appears when cursor moves to bottom area

## Design and Motion

- Top progress bar updates per page
- Transition effect rotates on each page change (10 total)
- Elements use `anim-*` classes for staged entrance

## Development Notes

- Content updates: `src/slides/data.js`
- Theme tuning: `src/styles/variables.css`
- New layout type: extend switch branches in `src/slides/renderer.js`

## Contributing

Issues and PRs are welcome:

1. Fork the repository
2. Create branch: `feat/your-feature`
3. Commit and open a PR

## Acknowledgement

Built to share practical engineering workflows for AI-assisted development. Reuse and remix are welcome.
