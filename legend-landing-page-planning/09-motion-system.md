# 09 — Motion System

## Principle
Motion should make the site feel composed, not busy.

## Timing
- micro interaction: `160–220ms`;
- content reveal: `350–550ms`;
- image reveal: `500–700ms`;
- slow editorial hover: `600–900ms`.

## Recommended effects

### 1. Hero text reveal
Mask/clip each line upward once on load.

### 2. Image reveal
Opacity + slight translate or clip-path.
Avoid dramatic scale-ins.

### 3. Story image hover
Desktop only:
`scale(1.00) → scale(1.025)`

### 4. Thin rule animation
A line may expand from 0 to 100% when entering viewport.

### 5. Issue cover movement
Very subtle layered parallax, maximum a few pixels.

### 6. Featured names
Slow horizontal editorial ticker is acceptable if it pauses on hover and does not make content inaccessible.

## Avoid
- bouncing buttons;
- auto-rotating 3D magazines;
- cursor followers;
- constant marquee everywhere;
- random blur transitions;
- heavy page-turn simulation;
- background videos unless the client has a truly strong editorial film.

## Reduced motion
Respect `prefers-reduced-motion`.
All essential information must remain visible without animation.
