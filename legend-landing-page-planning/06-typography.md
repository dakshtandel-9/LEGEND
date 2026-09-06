# 06 — Typography System

## Goal
Create a strong print-editorial voice without making the page difficult to read.

## Recommended fonts

### Display serif
**Bodoni Moda**
Use for:
- hero H1;
- major section titles;
- pull quotes;
- editorial numbers.

Alternative:
**Cormorant Garamond** if Bodoni feels too fashion-oriented.

### Sans-serif
**Inter**
Use for:
- body copy;
- navigation;
- metadata;
- buttons;
- labels;
- form information.

## Masthead
Use the official LEGEND logo/masthead asset.
Do not recreate the masthead using a web font if the actual logo is available.

## Desktop type scale

| Style | Size | Line height | Notes |
|---|---:|---:|---|
| Hero H1 | 80–112px | 0.92–1.0 | Responsive clamp |
| H2 | 56–72px | 1.0 | Main sections |
| H3 | 32–42px | 1.05 | Story titles |
| H4 | 22–28px | 1.15 | Smaller cards |
| Body Large | 19–21px | 1.55 | Intro copy |
| Body | 16–18px | 1.6 | Standard |
| Label | 11–13px | 1.2 | Uppercase, tracked |
| Caption | 12–13px | 1.45 | Credits/meta |

## Mobile scale
Use `clamp()` rather than fixed jumps.

Suggested:
```css
--hero: clamp(3.2rem, 12vw, 7rem);
--h2: clamp(2.5rem, 8vw, 4.5rem);
--h3: clamp(1.6rem, 5vw, 2.6rem);
```

## Letter spacing
- serif headlines: `-0.02em` to `-0.04em`;
- uppercase labels: `0.10em` to `0.16em`;
- body: normal.

## Rules
- Maximum body width: ~70 characters.
- Avoid all-caps long paragraphs.
- Do not use more than two font families.
- Avoid center-aligning long text.
