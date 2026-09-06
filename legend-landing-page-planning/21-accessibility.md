# 21 — Accessibility

## Target
WCAG 2.2 AA where practical.

## Required

### Structure
- one primary H1;
- sequential headings;
- semantic landmarks;
- nav, main, footer.

### Keyboard
All:
- links;
- menu;
- buttons;
- sliders;
- modals
must work by keyboard.

### Focus
Visible focus state.
Do not remove outlines without replacement.

### Color
- body text must meet contrast requirements;
- issue accents are not substitutes for readable text colors.

### Images
Every meaningful image needs alt text.
Decorative textures use empty alt.

### Motion
Respect `prefers-reduced-motion`.

### Mobile touch
Interactive targets at least ~44px.

### External Google Forms
Tell users when a CTA opens an external form/new tab when appropriate.

### PDFs
PDF links should be labeled clearly:
**Open July 2026 Edition (PDF)**

## Mobile menu
- trap focus if implemented as a modal drawer;
- close on Escape;
- return focus to trigger.

## Editorial text
Do not use very thin serif weights for small body copy.
