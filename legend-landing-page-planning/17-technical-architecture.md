# 17 — Technical Architecture

## Goal
A lightweight, maintainable, premium landing page deployed on Vercel.

## Stack
```text
Next.js App Router
TypeScript
Tailwind CSS
next/image
next/font
Framer Motion (limited)
Vercel
Google Forms
```

## Explicitly not used
```text
Supabase
Firebase
MongoDB
MySQL
PostgreSQL
Prisma
CRM
CMS
Auth
Server Actions for forms
Custom API routes
Upload backend
Admin dashboard
```

## Rendering
Aim for static rendering.

The homepage should be renderable from local data.

## Recommended project structure
```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css

  components/
    layout/
      Header.tsx
      Footer.tsx

    sections/
      Hero.tsx
      FeaturedPeople.tsx
      Editions.tsx
      FeaturedStories.tsx
      DevelopersDiary.tsx
      EditorialPhilosophy.tsx
      EditorialVerticals.tsx
      PitchStory.tsx
      Partnerships.tsx

    ui/
      Button.tsx
      SectionLabel.tsx
      StoryCard.tsx
      PersonCard.tsx
      IssueCard.tsx
      EditorialRule.tsx

  data/
    site.ts
    issues.ts
    people.ts
    stories.ts
    verticals.ts

  lib/
    constants.ts

public/
  images/
    brand/
    issues/
    people/
    stories/
    ui/

  issues/
    legend-may-2026.pdf
    legend-july-2026.pdf
```

## Forms
Only URLs or embeds.
No form POST endpoint in this project.

## Images
All project imagery is local under `/public/images`.

## PDFs
Static local files under `/public/issues`.

## Content
Use typed local arrays.
Do not hardcode large content blobs directly inside JSX.

## Motion
Prefer CSS transitions first.
Use Framer Motion only for:
- section reveal;
- masked hero line reveal;
- selected image transitions.

## Deployment
Vercel:
- connect Git repository;
- add public Google Form URLs as environment variables;
- deploy;
- add custom domain.

## Security
Because there is no backend and no auth, security surface is small.
Still:
- never expose private tokens;
- only use `NEXT_PUBLIC_*` for truly public values;
- external links use `rel="noreferrer"` where appropriate.
