# 18 — Local Content Model

There is no database. Content lives in typed local files.

## Type definitions

```ts
export type Issue = {
  id: string;
  issueNumber: string;
  month: string;
  year: number;
  title: string;
  description: string;
  cover: string;
  pdf: string;
  accent: "may" | "july" | string;
  featuredNames: string[];
};

export type Person = {
  id: string;
  name: string;
  role?: string;
  organisation?: string;
  image: string;
  category: string;
  issueId: string;
  featured?: boolean;
  imageCredit?: string;
};

export type Story = {
  id: string;
  title: string;
  subject?: string;
  category: string;
  excerpt: string;
  image: string;
  issueId: string;
  featured?: boolean;
  pdf?: string;
  pageLabel?: string;
};

export type Vertical = {
  id: string;
  label: string;
  description: string;
  image?: string;
};
```

## Example issue
```ts
export const issues: Issue[] = [
  {
    id: "may-2026",
    issueNumber: "01",
    month: "May",
    year: 2026,
    title: "May 2026",
    description:
      "Leadership, enterprise, Mumbai development and extraordinary stories.",
    cover: "/images/issues/2026-05-cover.webp",
    pdf: "/issues/legend-may-2026.pdf",
    accent: "may",
    featuredNames: [
      "Dr. Sanjay Mukherjee",
      "Jeet Adani",
      "Nikhil Kamath"
    ]
  },
  {
    id: "july-2026",
    issueNumber: "02",
    month: "July",
    year: 2026,
    title: "July 2026",
    description:
      "Housing, business legacy, real estate, banking, culture and lifestyle.",
    cover: "/images/issues/2026-07-cover.webp",
    pdf: "/issues/legend-july-2026.pdf",
    accent: "july",
    featuredNames: [
      "Sanjeev Jaiswal",
      "Gautam Singhania",
      "Vikas Oberoi"
    ]
  }
];
```

## Why local data is better here
For two issues and one landing page:
- faster;
- cheaper;
- simpler;
- easier to version in Git;
- no backend maintenance;
- no unnecessary CMS.

## Updating later
To add Issue 03:
1. add cover image;
2. add PDF;
3. add one object to `issues.ts`;
4. add selected people/stories;
5. deploy.

No migration or admin panel required.
