# LEGEND — Landing Page

A premium editorial landing page for **LEGEND Magazine, Mumbai** — "The Magazine of Extraordinary Stories."

Built to the specification in [`legend-landing-page-planning/`](legend-landing-page-planning/), which stays in the repository as the source of truth for design, copy and content decisions.

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript, `strict` |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Fonts | `next/font` — Bodoni Moda (display), Inter (sans), self-hosted |
| Images | `next/image`, all local under `/public/images` |
| Forms | Google Forms via `NEXT_PUBLIC_*` URLs |
| Hosting | Vercel |

**No** database, CMS, CRM, auth, admin panel, API route or custom form backend — per [`17-technical-architecture.md`](legend-landing-page-planning/17-technical-architecture.md). The whole page is statically prerendered.

---

## Getting started

```bash
npm install
cp .env.example .env.local     # then fill in the two Google Form URLs
npm run dev                    # http://localhost:3000
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (flat config) |
| `npm run content:check` | **Pre-launch content audit** — see below |
| `npm run assets:placeholders` | Regenerate placeholder imagery and stub PDFs |
| `npm run verify` | typecheck + lint + content:check |

---

## Project structure

```
src/
  app/
    layout.tsx            fonts, metadata, JSON-LD, skip link, header/footer
    page.tsx              the eleven sections, in the specified order
    globals.css           design tokens, type scale, motion primitives
    not-found.tsx         branded 404
    opengraph-image.tsx   OG card, generated as a real PNG at build time
    sitemap.ts robots.ts icon.svg

  components/
    layout/               Header (sticky + accessible drawer), Footer
    sections/             one file per page section
    ui/                   Button, Reveal, EditorialRule, cards, Wordmark…

  data/                   ← all editorial content lives here
    types.ts issues.ts people.ts stories.ts verticals.ts site.ts

  lib/
    constants.ts          form URLs, anchors, issue accent tokens
    content.ts            selectors over the data files
    analytics.ts          outbound-click events, vendor-agnostic
    use-in-view.ts        IntersectionObserver hook

public/
  images/{people,stories,issues,verticals}/
  issues/                 edition PDFs

scripts/
  generate-placeholders.mjs
  check-content.mjs
```

---

## Editing content

There is no CMS. Everything is a typed object in `src/data`, reviewed through Git.

**Adding an edition** ([`19-content-maintenance.md`](legend-landing-page-planning/19-content-maintenance.md)):

1. Add the cover to `public/images/issues/` and the PDF to `public/issues/`.
2. Append one object to `src/data/issues.ts` — it becomes "latest" automatically.
3. Add 3–5 people to `people.ts` and 2–4 stories to `stories.ts`.
4. Move the `featured` flags to the new selection.
5. `npm run verify`, then deploy.

Nothing else needs to change. The hero, editions grid, footer thumbnail, sitemap and OG image all derive from the data.

Add a new accent colour by adding a token in `globals.css` and an entry in `ACCENT_VAR` in `src/lib/constants.ts`.

For a client who does not edit code, [`CONTENT_UPDATE_TEMPLATE.md`](CONTENT_UPDATE_TEMPLATE.md) is a fill-in-the-blanks brief to send the developer each month.

### The content audit

`npm run content:check` is the approval workflow a CMS would otherwise provide. It reads the same data the page renders and separates two things:

- **Blocking errors** — a missing image, a story pointing at an edition that does not exist, a form URL still set to the example value. Exits non-zero.
- **Pending sign-off** — image rights not cleared, a headline not verified, placeholders still in use. Reported loudly, exits zero, because these are the client's calls rather than bugs.

It currently reports **0 errors and 33 pending items**, which is the outstanding pre-launch list.

---

## Before launch

Everything below is a client-supplied asset or approval, not outstanding development. `npm run content:check` lists all of it precisely.

- [ ] **Google Forms** — create both forms per [`16-google-forms-specification.md`](legend-landing-page-planning/16-google-forms-specification.md) and set `NEXT_PUBLIC_STORY_FORM_URL` / `NEXT_PUBLIC_PARTNERSHIP_FORM_URL` in Vercel. *Until then, both CTAs fall back to a pre-addressed `mailto:` rather than a dead link.*
- [ ] **Photography** — every image in `/public/images` is a generated placeholder. Replace with rights-cleared assets and update the paths in `src/data`, then flip `imageRightsConfirmed` to `true`.
- [ ] **Edition PDFs** — `/public/issues/*.pdf` are one-page stubs. Replace with the real editions, keeping the clean file names.
- [ ] **Masthead** — add the official logo SVG to `/public/images/brand/` and set `site.brand.logo`. Until then `<Wordmark />` type-sets the name in Bodoni Moda.
- [ ] **Contact details** — the emails, Instagram handle and location in `site.contact` are placeholders. Confirm them and set `confirmed: true`.
- [ ] **Copy** — the six story headlines are website drafts, not lifted from the printed page. Editorial should approve the wording and flip `titleVerified`.
- [ ] **Designations** — the MMRDA and MHADA attributions need checking against the printed editions.
- [ ] **Domain** — set `NEXT_PUBLIC_SITE_URL`; it drives `metadataBase`, canonical, sitemap and robots.

Then work through [`24-qa-checklist.md`](legend-landing-page-planning/24-qa-checklist.md) and [`25-launch-checklist.md`](legend-landing-page-planning/25-launch-checklist.md).

---

## Deploying to Vercel

1. Push the repository and import it in Vercel — the framework is detected automatically.
2. Add the three `NEXT_PUBLIC_*` variables to Production and Preview.
3. Deploy, add the custom domain, and decide the www / non-www redirect.
4. Submit `/sitemap.xml` in Google Search Console.
5. Test the link preview in WhatsApp, LinkedIn and X — the URL is meant to be shared through social, so the OG card matters.

---

## Implementation notes

A few decisions where the build resolves an ambiguity or departs from the letter of the plan. Each is reversible.

**No Framer Motion.** The stack list mentions it "only where motion genuinely improves the editorial experience," while [`22-performance-budget.md`](legend-landing-page-planning/22-performance-budget.md) says not to install libraries for things a small native implementation covers. Every effect in [`09-motion-system.md`](legend-landing-page-planning/09-motion-system.md) — masked line reveal, scroll reveal, rule draw, hover scale, pausing ticker — is CSS plus one 40-line `IntersectionObserver` hook, so the library would have added ~50 kB for nothing. First Load JS is **113 kB**. If richer choreography is wanted later, add it then.

**Placeholders are marked as placeholders.** Each generated image carries a small visible caption ("Portrait placeholder — replace with approved photography"). That is deliberate: [`08-imagery-guidelines.md`](legend-landing-page-planning/08-imagery-guidelines.md) forbids stock portraits standing in for real people, and an obviously-temporary asset cannot be shipped by accident.

**The OG image is generated, not drawn.** [`20-seo-plan.md`](legend-landing-page-planning/20-seo-plan.md) asks for `/images/brand/legend-og.jpg`. `src/app/opengraph-image.tsx` renders a real PNG at build time instead, so the "Issue 02 · July 2026" line stays correct when an edition is added. To use art-directed artwork instead, delete that file and point `openGraph.images` at a static asset.

**SVG is enabled in the image optimizer.** `dangerouslyAllowSVG` is on in `next.config.ts` because the placeholders are SVG, locked behind a sandboxed CSP and used only for first-party files. Delete those three lines once real raster photography is in place.

**Cards link into the edition PDFs.** Phase one has no `/stories/[slug]` routes, so portraits and story cards open the edition they appeared in, labelled "View in Edition" and announced as opening a new tab. The content model is shaped so those routes can be added later without reworking the data.

**Credibility wording is enforced in the components, not just the copy.** Nothing renders "interviewed by" or "exclusive"; the featured section carries a standing note that appearance in LEGEND is not an interview.

**`/public/images/verticals/`** is one folder beyond the structure in `17-technical-architecture.md`, added because the "What We Cover" section needs its own imagery.

**`npm run lint` runs ESLint directly** rather than `next lint`, which is deprecated in Next 15.5.
#   L E G E N D  
 