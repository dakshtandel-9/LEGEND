# 26 — Master Build Prompt

Copy this into your coding agent after the official assets are placed in the project.

---

You are building a premium editorial landing page for **LEGEND Magazine, Mumbai**.

Read every Markdown file in the `legend-landing-page-planning` folder before changing code.

## Product scope
Build a **single responsive landing page only**.

Do NOT build:
- CRM;
- CMS;
- database;
- Supabase;
- Firebase;
- auth;
- admin dashboard;
- custom backend;
- custom form API;
- payment flow.

## Forms
Use only these public environment variables:

```text
NEXT_PUBLIC_STORY_FORM_URL
NEXT_PUBLIC_PARTNERSHIP_FORM_URL
```

Buttons should open the relevant Google Form.
Do not store submissions in the application.

## Assets
All images are local:
```text
/public/images
```

All magazine PDFs are local:
```text
/public/issues
```

Use `next/image` for images.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- `next/font`
- Framer Motion only when useful

## Visual direction
The website must feel:
- premium;
- editorial;
- contemporary;
- intelligent;
- restrained.

It must NOT look like:
- a SaaS startup;
- a dashboard;
- a generic agency template;
- a property-sales portal.

## Master palette
- Ink `#151515`
- Paper `#F5F2EA`
- White `#FFFFFF`
- Gold `#B79D73`
- May accent `#D5E35B`
- July accent `#16BCD6`

Treat these as proposed design tokens and keep them centralized.

## Typography
- serif display font such as Bodoni Moda;
- sans body font such as Inter;
- use official LEGEND logo asset for masthead.

## Required sections in this exact page order
1. Header
2. Hero
3. Featured in LEGEND
4. Latest Editions
5. Stories That Matter
6. Developers' Diary
7. Why LEGEND
8. Editorial Verticals
9. Pitch Your Story
10. Partnerships
11. Footer

## Hero copy
Eyebrow:
`LEGEND · MUMBAI`

H1:
`The people shaping India. The stories worth remembering.`

Body:
`LEGEND is a Mumbai-born editorial magazine profiling leaders, builders, creators and institutions shaping business, culture and the world around us.`

Primary:
`Explore Latest Edition`

Secondary:
`Pitch Your Story`

Brand line:
`Excellence · Culture · Vision`

## Credibility rule
Use **“Featured in LEGEND”** for the personality section.

Do not claim every person was interviewed or was an exclusive unless the local content data explicitly says so.

## Data
Create typed local files:
```text
src/data/issues.ts
src/data/people.ts
src/data/stories.ts
src/data/verticals.ts
```

No database.

## Responsive behavior
Mobile is first-class.
Do not simply shrink desktop layouts.
Use:
- stacked compositions;
- horizontal scroll where useful;
- large readable typography;
- 20–24px side padding;
- tap targets 44px+.

## Motion
Keep motion subtle:
- mask reveal;
- opacity/translate;
- small image scale on hover;
- line reveal.

Respect reduced-motion preference.

## Performance
- statically render where possible;
- do not preload PDFs;
- optimize local images;
- keep third-party JS minimal;
- target Lighthouse 90+.

## SEO
Add:
- metadata;
- canonical;
- OG;
- favicon;
- sitemap;
- robots.

## Quality bar
The finished page should feel like a digital luxury editorial publication, not a component library demo.

Before finishing:
- run typecheck;
- run lint;
- verify mobile;
- verify both Google Form links;
- verify local PDF links;
- verify no backend/API/database code was added.

---

End of build prompt.
