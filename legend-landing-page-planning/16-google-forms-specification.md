# 16 — Google Forms Specification

## Architecture decision
All enquiry forms use Google Forms.

There is:
- no custom backend;
- no database;
- no CRM;
- no API form handler.

## Two separate forms

### Form A — Editorial Submission
Suggested title:
**Pitch Your Story to LEGEND**

Recommended fields:
1. Full name
2. Role / designation
3. Organisation
4. City
5. Email
6. Phone / WhatsApp
7. Story category
8. Tell us what you are building / doing
9. Why does this story matter now?
10. Website
11. LinkedIn
12. Instagram
13. Existing press coverage URL
14. Optional notes

Category options:
- Leadership
- Business & Finance
- Developers' Diary
- Enterprise & Legacy
- Mumbai & Infrastructure
- Culture & Public Life
- Design & Architecture
- Social Impact
- Lifestyle & Hospitality
- Sport & Community
- Other

Confirmation message:
**Thank you. The LEGEND editorial team will review your submission. Submission does not guarantee publication.**

### Form B — Advertising / Partnership Enquiry
Suggested title:
**Partner With LEGEND**

Recommended fields:
1. Name
2. Company / brand
3. Role
4. Email
5. Phone
6. Website
7. Type of enquiry
8. Campaign / partnership objective
9. Approximate timeline
10. Notes

Type options:
- Print advertising
- Digital collaboration
- Sponsored / branded content enquiry
- Special edition
- Event partnership
- Other

## Integration options

### Recommended: CTA opens Google Form
Advantages:
- simplest;
- reliable;
- no custom form maintenance;
- no backend;
- easy for client to manage.

Use:
```ts
const STORY_FORM_URL = process.env.NEXT_PUBLIC_STORY_FORM_URL;
const PARTNERSHIP_FORM_URL = process.env.NEXT_PUBLIC_PARTNERSHIP_FORM_URL;
```

Open with:
```tsx
<a href={STORY_FORM_URL} target="_blank" rel="noreferrer">
  Pitch Your Story
</a>
```

### Alternative: responsive iframe embed
Use if the client insists on keeping visitors on-page.

Place the embed inside:
- a full-width section;
- a modal;
- or an expandable drawer.

Do not iframe both forms at once on initial page load.

## Environment variables
```text
NEXT_PUBLIC_STORY_FORM_URL=
NEXT_PUBLIC_PARTNERSHIP_FORM_URL=
```

## Tracking
Track CTA click before the user leaves for Google Forms.

## Do not do
- reverse-engineer Google Forms as a fragile custom POST unless absolutely necessary;
- collect form data in your own app;
- promise publication;
- mix advertising enquiries with editorial selection.
