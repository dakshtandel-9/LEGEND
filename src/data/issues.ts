import type { Issue } from "./types";

/**
 * Editions, newest last. `getLatestIssue()` in src/lib/content.ts derives the
 * "latest" edition from this array, so adding Issue 03 is a one-object change
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
    id: "july-2026",
    issueNumber: "02",
    month: "July",
    year: 2026,
    title: "July 2026",
    description:
      "Housing at scale, business legacy, banking and the culture of a changing Mumbai — reported across leadership, real estate and public life.",
    cover: "/images/editorial/july-cover.jpg",
    coverAlt: "Cover of LEGEND Issue 02, July 2026",
    pdf: "/issues/legend-july-2026.pdf",
    accent: "july",
    featuredNames: [
      "Sanjeev Jaiswal",
      "Gautam Singhania",
      "Vikas Oberoi",
      "Jay Kotak",
    ],
  },
];
