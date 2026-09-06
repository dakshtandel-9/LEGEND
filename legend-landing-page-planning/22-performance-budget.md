# 22 — Performance Budget

## Targets
- Lighthouse Performance: 90+
- LCP: under ~2.5 seconds on reasonable mobile connection
- CLS: under 0.1
- INP: good
- initial JS: keep lean

## Image budget
Hero:
- ideally under ~350 KB optimized.

Standard cards:
- ~80–180 KB each depending on dimensions.

Do not ship full-resolution print images.

## PDF rule
Never preload magazine PDFs.
Only fetch/open when the user clicks.

## Fonts
- use `next/font`;
- load only necessary weights;
- avoid five serif weights and five sans weights.

Recommended:
- Display: 400 / 500
- Sans: 400 / 500 / 600

## Animation
Avoid scroll listeners that run continuously.
Prefer:
- IntersectionObserver;
- CSS;
- limited Framer Motion.

## Third-party scripts
Minimize.
Google Forms should open externally or load only when user requests an embed.

## Local images
Use `next/image` with correct `sizes`.

Example:
```tsx
sizes="(max-width: 768px) 100vw, 50vw"
```

## Bundle discipline
Do not install large libraries for:
- icons;
- sliders;
- simple accordions
if small native/CSS implementations are enough.
