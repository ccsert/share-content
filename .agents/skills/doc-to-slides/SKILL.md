---
name: doc-to-slides
description: >
  Convert any source document (speech notes, proposals, outlines, meeting notes, tutorials, PRDs)
  into a data-driven full-screen slide deck using the AI Collab Slides engine.
  Use this skill whenever the user mentions slides, presentations, decks,幻灯片, 演示, PPT,
  or wants to turn written content into a visual presentation. Also trigger when the user asks
  to "create a talk", "make a slideshow", "generate presentation from this doc", "把这个做成幻灯片",
  "帮我做一个演示", or provides a document and asks for a visual/presentation version of it.
  Even if the user doesn't explicitly say "slides", if they have a document and mention presenting,
  sharing, or demoing it, use this skill.
---

# Doc to Slides

Turn any source document into a polished, animated full-screen slide deck.

## How this skill works

The slide engine is a zero-framework Vanilla JS + Vite project. All content lives in a single
data file (`src/slides/data.js`). You never touch styles, animations, cursor, or navigation code.
Your job is to transform user-provided content into the correct data structure.

## Before you start

1. Read the full technical reference: `references/playbook.md` in this skill directory.
   It contains every slide type, field, CSS class, color token, and component you can use.
2. Confirm the source document with the user — ask for it if not provided.
3. Clarify audience, tone, and target slide count if not obvious (default: 12–20 slides).

## Workflow

### Step 1: Analyze the source document

Break the document into logical sections. Identify:
- A single compelling title and subtitle (→ cover slide)
- 3–5 major themes or chapters (→ section slides as dividers)
- Comparisons, pros/cons, before/after (→ split-content)
- Lists of features, principles, or tools (→ cards)
- Sequential processes or timelines (→ flow)
- Complex one-off visuals (→ raw, use sparingly)

### Step 2: Present your outline first

Before writing any code, present a numbered outline to the user:

```
Slide 1 (cover): 主标题 — 一句话目的
Slide 2 (section): 章节名 — 切入主题
Slide 3 (split-content): 问题 vs 方案 — 建立痛点
...
```

Wait for the user to confirm or adjust before generating code.

### Step 3: Generate `src/slides/data.js`

Produce a complete, self-contained JavaScript file that:
- Exports `TOTAL_SLIDES` (must match array length exactly)
- Exports `slides` array
- Uses only the 6 allowed types: `cover`, `section`, `split-content`, `cards`, `flow`, `raw`
- Follows every field constraint documented in `references/playbook.md`

### Step 4: Update `index.html`

Change the `<title>` tag and the slide counter default text (`1 / N`) to match the new content.

### Step 5: Verify

Tell the user to run `pnpm dev` and review the result. Offer to adjust specific slides.

## Slide type quick reference

| Type | When to use | Key fields |
|------|------------|------------|
| `cover` | Opening slide only | `tag`, `title`, `subtitle`, `pills` |
| `section` | Chapter dividers | `label`, `title`, `desc` |
| `split-content` | Compare two sides | `title`, `left{boxTitle,boxTitleClass,items/html}`, `right{...}` |
| `cards` | Feature grids (2-3 cols) | `title`, `cards[{icon,title,body,colorClass?}]`, `cols`, `centered?`, `maxWidth?` |
| `flow` | Step-by-step process | `title`, `steps[{num,label,desc}]` |
| `raw` | Last resort for custom HTML | `html`, `slideClass?`, `className?` |

## Hard rules (non-negotiable)

These exist because violating them breaks rendering or visual consistency:

1. `TOTAL_SLIDES` must exactly equal `slides.length`. Navigation breaks otherwise.
2. Every interactive element in `raw` HTML must have class `hover-target`. The custom cursor depends on it.
3. Content elements must use `anim-1` through `anim-6` classes for staged entrance. Without them, content appears without animation.
4. Titles support inline HTML: `<span class="accent">`, `<span class="accent2">`, `<span class="accent3">` for colored emphasis.
5. `split-content` box titles use `boxTitleClass: 'red'` for problems and `'green'` for solutions.
6. Card `colorClass` supports only `'green'` and `'orange'`. Omit for default purple.
7. List item `dot` field accepts a CSS color string (e.g. `'#f76c6c'`) or the keyword `'green'`.
8. Do not add new CSS files, modify existing styles, or introduce external dependencies.
9. Do not modify `renderer.js`, `navigation.js`, `cursor.js`, or `main.js` unless the user explicitly asks.

## Content quality guidelines

These make the difference between a mediocre deck and a great one:

- **Information density**: each slide should convey one idea. If you need a scroll bar, split the slide.
- **Narrative flow**: background → problem → approach → solution → impact → conclusion.
- **Quantify outcomes** wherever possible ("reduced build time by 40%" not "made builds faster").
- **Card limit**: 2 lines of body text per card. If you need more, use split-content instead.
- **Flow steps**: 4–6 is the sweet spot. Fewer feels thin; more gets cramped.
- **Emoji usage**: one per title/label as a visual anchor. Never multiple emoji in a row.
- **Section slides**: use them to give the audience a mental reset between major topics.
- **Raw slides**: only when no standard type fits. Reuse existing CSS components (`.card`, `.list`, `.quote-box`, `.split`, `.flow`) inside raw HTML rather than inventing new markup.

## Color semantics

| Color | Token | Use for |
|-------|-------|---------|
| Purple | `var(--accent)` / `#7c6af7` | Primary emphasis, default styling |
| Green/Cyan | `var(--accent2)` / `#56cfb2` | Solutions, pros, success states |
| Orange | `var(--accent3)` / `#f7a76c` | Secondary highlights, warnings |
| Red | `#f76c6c` | Problems, cons, pain points |

## Example output structure

```javascript
export const TOTAL_SLIDES = 15;

export const slides = [
  {
    type: 'cover',
    tag: '⚡ Topic Tag',
    title: 'Main Title<br>Second Line',
    subtitle: 'A compelling one-line description',
    pills: ['🔧 Tag 1', '🤖 Tag 2', '⚡ Tag 3'],
  },
  {
    type: 'section',
    label: 'Part 01',
    title: '🔍 Chapter Title',
    desc: 'What this chapter covers',
  },
  // ... more slides
];
```

## Reference

For the complete technical specification including all CSS components, animation details,
and advanced patterns, read:

→ `references/playbook.md` (in this skill directory)

Read it before generating any slides. It is the authoritative source of truth for field names,
allowed values, and rendering behavior.
