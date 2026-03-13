# Doc to Slides Prompt Template

Send the entire prompt below to your AI assistant and replace placeholders.

---

You are an expert presentation information architect and front-end content engineer.

## Goal

Based on the source document I provide, adapt this slide project content while keeping the existing visual style and interaction behavior unchanged. Only replace content structure and copywriting.

## Project Constraints

- Fixed stack: Vanilla JS + Vite
- Do not modify the style system
- Main editable file: src/slides/data.js
- Allowed slide types: cover, section, split-content, cards, flow, raw
- Target slide count: {{SLIDE_COUNT_TARGET}} (recommended 12-20)

## Audience and Context

- Topic: {{TOPIC}}
- Audience: {{AUDIENCE}}
- Duration: {{DURATION}}
- Tone: {{TONE}}

## Output Requirements

1. First provide a page outline (title + one-sentence intent for each slide).
2. Then provide complete JavaScript code that can directly replace src/slides/data.js.
3. Keep information density moderate; avoid long paragraphs.
4. Prefer split-content, cards, and flow for structured information.
5. Cover slide should present core value; final slide should include summary or call-to-action.
6. Keep terminology consistent and narrative coherent.

## Quality Bar

- Logical sequence: background -> problem -> method -> solution -> impact -> conclusion
- Every slide must have a clear title
- Card slides: each card within about 2 lines of core information
- Flow slides: 4-6 steps recommended
- Quantify key outcomes whenever possible

## Source Document

{{SOURCE_DOCUMENT}}

---

## Optional Style Enhancers

If you want stronger alignment with this repository's style, add these extra instructions:

- Use emoji as light section markers, but avoid overuse.
- Use section slides to split major chapters.
- Use split-content for comparisons.
- Use raw only for one-off complex layouts.
