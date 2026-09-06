# 19 — Content Maintenance Without a CMS

## Philosophy
This project intentionally has no CMS and no admin panel.

All updates happen through the code repository.

## Monthly update workflow

### Add a new issue
1. Export optimized cover image.
2. Put it in `/public/images/issues`.
3. Put the PDF in `/public/issues`.
4. Add one object to `src/data/issues.ts`.
5. Add selected people to `people.ts`.
6. Add selected stories to `stories.ts`.
7. Update the homepage featured flags.
8. Deploy through Vercel.

## Do not put every print page online
The landing page should stay curated.

For each issue select:
- 1 cover;
- 3–5 recognizable names;
- 2–4 strong stories;
- optional Developers' Diary feature.

## Content verification before deploy
For every update verify:
- spelling of person;
- designation;
- organisation;
- story title;
- issue number;
- image credit;
- web usage rights;
- PDF link.

## Git workflow
Recommended:
```text
main = production
feature/content-issue-03 = monthly content update
```

## Simple client handoff option
If the client does not edit code, maintain a single `content-update-template.md` the client can fill every month and send to the developer.

## Content update template
```text
Issue number:
Month/year:
Cover:
PDF:
Accent color:

Featured people:
1.
2.
3.

Featured stories:
1.
2.
3.

Developers' Diary person:
Homepage lead story:
```
