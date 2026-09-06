# 08 — Imagery Guidelines

## Priority
1. Original approved editorial photography.
2. Magazine cover art.
3. Approved event / company imagery.
4. Custom editorial graphics.
5. Stock only when absolutely necessary.

## Never use random stock portraits
If a story is about a real person, use an image the publication has rights to use.

## Required aspect ratios
Prepare variants where possible:

| Usage | Ratio |
|---|---|
| Person portrait | 4:5 |
| Lead story | 3:4 or 16:10 |
| Landscape feature | 16:9 |
| Square tile | 1:1 |
| Issue cover | Preserve original |
| OG image | 1.91:1 |

## Local storage plan
```text
/public/images/
  brand/
  people/
  stories/
  issues/
  ui/
```

Example:
```text
/public/images/people/vikas-oberoi.webp
/public/images/issues/2026-07-cover.webp
```

## File format
- AVIF/WebP for web images where practical;
- PNG only when transparency is needed;
- SVG for logos/icons.

## Naming
Use lowercase kebab-case:
`dr-sanjay-mukherjee.webp`

Avoid:
`IMG_7392-final-v4.jpg`

## Image credits
Keep credits in the local content data even if they are not shown in every card.

## Rights checklist
Before launch confirm:
- web usage permission;
- photographer credit requirements;
- whether cover imagery can be used in digital marketing;
- whether photos may be cropped;
- whether third-party logos may be displayed.

## Editing treatment
- natural skin tone;
- no heavy beauty retouching;
- no AI face alteration;
- avoid excessive saturation;
- preserve original editorial character.

## Next.js implementation
Use `next/image`.
Set meaningful `sizes`.
Only preload the actual hero/LCP image.
