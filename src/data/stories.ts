import type { Story } from "./types";

/**
 * "Stories That Matter" — the curated homepage selection.
 *
 * 19-content-maintenance.md is explicit that the landing page should not
 * mirror the whole magazine: 2–4 strong stories per edition, no more.
 *
 * HEADLINES ARE DRAFT COPY. Every title below is written for the website
 * (12-copy-deck.md is draft copy pending client approval) rather than lifted
 * from the printed page, so each carries `titleVerified: false` until the
 * editorial team signs it off. `npm run content:check` lists them.
 *
 * Order matters: the entry flagged `featured` becomes the 7-column lead, the
 * next becomes the 5-column secondary, and the remainder form the third row.
 */
export const stories: Story[] = [
  {
    id: "mumbai-rising",
    title: "The city that keeps rewriting itself",
    subject: "Dr. Sanjay Mukherjee, MMRDA",
    category: "Mumbai & Infrastructure",
    excerpt:
      "Transit corridors, reclaimed land and a metropolitan region planning decades ahead. What it takes to build at the scale a city of this size demands — and who carries the decisions.",
    image: "/images/stories/mumbai-rising.svg",
    imageAlt:
      "Editorial photograph accompanying LEGEND's feature on Mumbai's metropolitan development",
    issueId: "may-2026",
    featured: true,
    pageLabel: "Issue 01 · May 2026",
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: false,
      roleVerified: false,
      note: "Draft website headline. Confirm wording and the MMRDA designation before launch.",
    },
  },
  {
    id: "mhada-housing",
    title: "Housing, at the scale of a city",
    subject: "Sanjeev Jaiswal, MHADA",
    category: "Leadership",
    excerpt:
      "Public housing is where policy meets a family's actual address. A look at how supply, redevelopment and trust are being rebuilt in Mumbai.",
    image: "/images/stories/mhada-housing.svg",
    imageAlt:
      "Editorial photograph accompanying LEGEND's feature on public housing in Mumbai",
    issueId: "july-2026",
    pageLabel: "Issue 02 · July 2026",
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: false,
      roleVerified: false,
      note: "Draft website headline. Confirm wording and the MHADA designation before launch.",
    },
  },
  {
    id: "developers-diary-oberoi",
    title: "Building for the long horizon",
    subject: "Vikas Oberoi",
    category: "Developers' Diary",
    excerpt:
      "Land is patient, capital is not. Inside the judgement calls behind a portfolio built to outlast the cycle it was started in.",
    image: "/images/stories/developers-diary.svg",
    imageAlt:
      "Architectural photograph accompanying LEGEND's Developers' Diary feature",
    issueId: "july-2026",
    pageLabel: "Issue 02 · July 2026",
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: false,
      roleVerified: true,
      note: "Draft website headline pending editorial approval.",
    },
  },
  {
    id: "banking-next-generation",
    title: "Banking, rebuilt for a digital generation",
    subject: "Jay Kotak",
    category: "Business & Finance",
    excerpt:
      "What changes when the customer has never walked into a branch — and what an established institution refuses to give up in the rebuild.",
    image: "/images/stories/banking.svg",
    imageAlt:
      "Editorial photograph accompanying LEGEND's feature on digital banking",
    issueId: "july-2026",
    pageLabel: "Issue 02 · July 2026",
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: false,
      roleVerified: true,
      note: "Draft website headline pending editorial approval.",
    },
  },
  {
    id: "courtside",
    title: "Courtside, and the return of the club",
    subject: "Courtside",
    category: "Sport & Community",
    excerpt:
      "Sport as a reason to gather. How a new generation of urban clubs is quietly rebuilding something Indian cities had stopped designing for.",
    image: "/images/stories/courtside.svg",
    imageAlt:
      "Editorial photograph accompanying LEGEND's feature on urban sport and community clubs",
    issueId: "july-2026",
    pageLabel: "Issue 02 · July 2026",
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: false,
      roleVerified: true,
      note: "Draft website headline pending editorial approval.",
    },
  },
  {
    id: "the-nook",
    title: "A Bandra address with intent",
    subject: "The Nook",
    category: "Lifestyle & Hospitality",
    excerpt:
      "Hospitality is a point of view before it is a menu. On rooms, rhythm and the small decisions that make a neighbourhood room feel inevitable.",
    image: "/images/stories/the-nook.svg",
    imageAlt:
      "Interior photograph accompanying LEGEND's hospitality feature on The Nook, Bandra",
    issueId: "july-2026",
    pageLabel: "Issue 02 · July 2026",
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: false,
      roleVerified: true,
      note: "Draft website headline pending editorial approval.",
    },
  },
];
