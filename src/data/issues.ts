import type { Issue } from "./types";

/**
 * Editions, newest last. `getLatestIssue()` in src/lib/content.ts derives the
 * "latest" edition from this array, so adding a new issue is a one-object change
 * (19-content-maintenance.md).
 *
 * Source PDFs live in /Magazine and are never published — the site shows
 * each edition's cover only. `page` numbers elsewhere are print folios.
 */
export const issues: Issue[] = [
  {
    id: "may-2026",
    issueNumber: "01",
    month: "May",
    year: 2026,
    title: "May 2026",
    description:
      "The first edition: Mumbai's USD 96 billion day at Davos, the next generation inheriting India's great enterprises, and the quiet architects shaping the city.",
    cover: "/images/issues/may-2026-cover.jpg",
    coverAlt: "Cover of LEGEND Issue 01, May 2026, featuring Dr. Sanjay Mukherjee, IAS",
    coverWidth: 1100,
    coverHeight: 1556,
    accent: "may",
    published: "May 2026",
    coverStory: {
      subject: "Dr. Sanjay Mukherjee, IAS",
      headline: "Mumbai Rising",
      page: 8,
    },
    featuredNames: [
      "Dr. Sanjay Mukherjee",
      "Jeet Adani",
      "Nikhil Kamath",
      "Sabeer Bhatia",
      "Dr. Niranjan Hiranandani",
    ],
  },
  {
    id: "september-2026",
    issueNumber: "02",
    month: "September",
    year: 2026,
    title: "September 2026",
    description:
      "The people rebuilding Mumbai's housing, banking and skyline, all moving at once — led by MHADA's mission to deliver eight lakh homes by 2030.",
    cover: "/images/issues/september-2026-cover.jpg",
    coverAlt: "Cover of LEGEND Issue 02, September 2026, featuring Sanjeev Jaiswal, IAS",
    coverWidth: 1100,
    coverHeight: 1556,
    accent: "september",
    published: "14 September 2026",
    coverStory: {
      subject: "Sanjeev Jaiswal, IAS",
      headline: "MHADA: The Housing Mission",
      page: 10,
    },
    featuredNames: [
      "Sanjeev Jaiswal",
      "Vikas Oberoi",
      "Jay Kotak",
      "Kangana Ranaut",
      "Gautam Singhania",
    ],
  },
  {
    id: "october-2026",
    issueNumber: "03",
    month: "October",
    year: 2026,
    title: "October 2026",
    description:
      "Three decades in the service of Maharashtra: Manisha Patankar Mhaiskar, IAS, on the cover — with builders, founders and ministers betting on what comes next.",
    cover: "/images/issues/october-2026-cover.jpg",
    coverAlt:
      "Cover of LEGEND Issue 03, October 2026, featuring Manisha Patankar Mhaiskar, IAS",
    coverWidth: 1100,
    coverHeight: 1556,
    accent: "october",
    published: "4 October 2026",
    coverStory: {
      subject: "Manisha Patankar Mhaiskar, IAS",
      headline: "The Steady Hand of Maharashtra",
      page: 10,
    },
    featuredNames: [
      "Manisha Patankar Mhaiskar",
      "Abhishek Lodha",
      "Seema Singh",
      "Devi Sahny",
      "Ashish Shelar",
    ],
  },
];
