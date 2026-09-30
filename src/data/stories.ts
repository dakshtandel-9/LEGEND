import type { Story } from "./types";

/** The September 2026 cover story selected for the homepage. */
export const stories: Story[] = [
  {
    id: "tukaram-mundhe-cover-story",
    title: "The officer who would not bend",
    subject: "Tukaram Mundhe, IAS",
    category: "Leadership",
    excerpt:
      "A profile of the administrator behind the headlines, tracing a career in public service and the standard he has held through repeated transfers.",
    image: "/images/editorial/tukaram-munde.jpg",
    imageAlt: "Tukaram Mundhe seated for his LEGEND cover portrait",
    issueId: "september-2026",
    featured: true,
    pageLabel: "Issue 03 · September 2026",
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: false,
      roleVerified: false,
      note: "Supplied September PDF is marked Draft; confirm editorial copy and image rights before public launch.",
    },
  },
];
