import type { Issue } from "./types";

/**
 * Editions, newest last. `getLatestIssue()` in src/lib/content.ts derives the
 * "latest" edition from this array, so adding a new issue is a one-object change
 * (19-content-maintenance.md).
 */
export const issues: Issue[] = [
  {
    id: "may-2026",
    issueNumber: "01",
    month: "May",
    year: 2026,
    title: "May 2026",
    description:
      "Leadership, enterprise and Mumbai's development story — the first edition of LEGEND, built around the people deciding how the city grows.",
    cover: "/images/editorial/may-cover.jpg",
    coverAlt: "Cover of LEGEND Issue 01, May 2026",
    pdf: "/issues/legend-may-2026.pdf",
    accent: "may",
    featuredNames: [
      "Dr. Sanjay Mukherjee",
      "Jeet Adani",
      "Nikhil Kamath",
      "Dr. Niranjan Hiranandani",
    ],
  },
  {
    id: "september-2026",
    issueNumber: "03",
    month: "September",
    year: 2026,
    title: "September 2026",
    description:
      "Issue 03 follows Tukaram Mundhe, IAS, and the standard behind a career shaped by public service and repeated transfers.",
    cover: "/images/editorial/tukaram-cover.jpg",
    coverAlt: "September 2026 cover of LEGEND featuring Tukaram Mundhe, IAS",
    pdf: "/issues/legend-september-2026.pdf",
    accent: "september",
    featuredNames: [
      "Tukaram Mundhe",
      "Vikas Oberoi",
      "Jay Kotak",
    ],
  },
];
