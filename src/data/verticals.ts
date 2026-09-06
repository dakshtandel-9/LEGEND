import type { Vertical } from "./types";

/**
 * The ten editorial verticals from 10-content-architecture.md, in the order
 * given there. Rendered as a large text list — no icons (14-section-spec).
 *
 * `id` doubles as the anchor-free hover key and must stay stable, because the
 * category strings on people and stories are matched against `label`.
 */
export const verticals: Vertical[] = [
  {
    id: "leadership",
    label: "Leadership",
    description:
      "Public administrators, institutional leaders and the people whose decisions set the terms for everyone else.",
    image: "/images/verticals/leadership.svg",
    imageAlt: "Editorial image representing LEGEND's Leadership coverage",
  },
  {
    id: "business-finance",
    label: "Business & Finance",
    description:
      "Founders, investors, banking and enterprise — capital and conviction, and what they are being pointed at.",
    image: "/images/verticals/business-finance.svg",
    imageAlt: "Editorial image representing LEGEND's Business and Finance coverage",
  },
  {
    id: "developers-diary",
    label: "Developers' Diary",
    description:
      "Real-estate developers, urban builders and the leadership shaping the built environment.",
    image: "/images/verticals/developers-diary.svg",
    imageAlt: "Editorial image representing LEGEND's Developers' Diary series",
  },
  {
    id: "enterprise-legacy",
    label: "Enterprise & Legacy",
    description:
      "Business families, legacy companies and the delicate work of generational transition.",
    image: "/images/verticals/enterprise-legacy.svg",
    imageAlt: "Editorial image representing LEGEND's Enterprise and Legacy coverage",
  },
  {
    id: "mumbai-infrastructure",
    label: "Mumbai & Infrastructure",
    description:
      "Housing, transport, city-building and the institutions carrying a metropolitan region forward.",
    image: "/images/verticals/mumbai-infrastructure.svg",
    imageAlt: "Editorial image representing LEGEND's Mumbai and Infrastructure coverage",
  },
  {
    id: "culture-public-life",
    label: "Culture & Public Life",
    description:
      "Public personalities, creators and cultural figures, covered for their work rather than their headlines.",
    image: "/images/verticals/culture-public-life.svg",
    imageAlt: "Editorial image representing LEGEND's Culture and Public Life coverage",
  },
  {
    id: "design-architecture",
    label: "Design & Architecture",
    description:
      "Designers, architects, spaces and the aesthetics a city ends up living inside.",
    image: "/images/verticals/design-architecture.svg",
    imageAlt: "Editorial image representing LEGEND's Design and Architecture coverage",
  },
  {
    id: "social-impact",
    label: "Social Impact",
    description:
      "Foundations, communities and purpose-led initiatives measured by what actually changed.",
    image: "/images/verticals/social-impact.svg",
    imageAlt: "Editorial image representing LEGEND's Social Impact coverage",
  },
  {
    id: "lifestyle-hospitality",
    label: "Lifestyle & Hospitality",
    description:
      "Restaurants, hotels and urban lifestyle — taste as a discipline, not a trend cycle.",
    image: "/images/verticals/lifestyle-hospitality.svg",
    imageAlt: "Editorial image representing LEGEND's Lifestyle and Hospitality coverage",
  },
  {
    id: "sport-community",
    label: "Sport & Community",
    description:
      "Sport, clubs and the new urban experiences bringing people back into shared space.",
    image: "/images/verticals/sport-community.svg",
    imageAlt: "Editorial image representing LEGEND's Sport and Community coverage",
  },
];
