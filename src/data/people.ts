import type { Person } from "./types";

/**
 * The "Featured in LEGEND" shortlist from 11-content-inventory.md.
 *
 * CREDIBILITY RULE (02-brand-analysis.md, PROJECT_CONTEXT.md):
 * These people appeared in the pages of LEGEND. Nothing here claims an
 * interview or an exclusive, and no component adds that language. If a
 * specific profile IS a confirmed interview, say so in the data first.
 *
 * Designations are deliberately sparse. A role is only stated where the
 * source inventory states it; everywhere else the card carries the editorial
 * category instead of an invented job title.
 *
 * Array order is the rendered order — the first `featured` entry becomes the
 * large lead portrait, the next four fill the compact column.
 */
export const people: Person[] = [
  {
    id: "dr-sanjay-mukherjee",
    name: "Dr. Sanjay Mukherjee",
    organisation: "MMRDA",
    image: "/images/people/dr-sanjay-mukherjee.svg",
    imageAlt: "Portrait of Dr. Sanjay Mukherjee, featured in LEGEND",
    category: "Mumbai & Infrastructure",
    issueId: "may-2026",
    featured: true,
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: true,
      roleVerified: false,
      note: "Confirm the exact designation at MMRDA against the printed edition before launch.",
    },
  },
  {
    id: "gautam-singhania",
    name: "Gautam Singhania",
    image: "/images/people/gautam-singhania.svg",
    imageAlt: "Portrait of Gautam Singhania, featured in LEGEND",
    category: "Enterprise & Legacy",
    issueId: "july-2026",
    featured: true,
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: true,
      roleVerified: true,
    },
  },
  {
    id: "vikas-oberoi",
    name: "Vikas Oberoi",
    image: "/images/people/vikas-oberoi.svg",
    imageAlt: "Portrait of Vikas Oberoi, featured in LEGEND",
    category: "Developers' Diary",
    issueId: "july-2026",
    featured: true,
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: true,
      roleVerified: true,
    },
  },
  {
    id: "nikhil-kamath",
    name: "Nikhil Kamath",
    image: "/images/people/nikhil-kamath.svg",
    imageAlt: "Portrait of Nikhil Kamath, featured in LEGEND",
    category: "Business & Finance",
    issueId: "may-2026",
    featured: true,
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: true,
      roleVerified: true,
    },
  },
  {
    id: "kangana-ranaut",
    name: "Kangana Ranaut",
    image: "/images/people/kangana-ranaut.svg",
    imageAlt: "Portrait of Kangana Ranaut, featured in LEGEND",
    category: "Culture & Public Life",
    issueId: "may-2026",
    featured: true,
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: true,
      roleVerified: true,
    },
  },
  {
    id: "sanjeev-jaiswal",
    name: "Sanjeev Jaiswal",
    role: "IAS",
    organisation: "MHADA",
    image: "/images/people/sanjeev-jaiswal.svg",
    imageAlt: "Portrait of Sanjeev Jaiswal, featured in LEGEND",
    category: "Leadership",
    issueId: "july-2026",
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: true,
      roleVerified: false,
      note: "Confirm the exact designation at MHADA against the printed edition before launch.",
    },
  },
  {
    id: "jeet-adani",
    name: "Jeet Adani",
    image: "/images/people/jeet-adani.svg",
    imageAlt: "Portrait of Jeet Adani, featured in LEGEND",
    category: "Enterprise & Legacy",
    issueId: "may-2026",
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: true,
      roleVerified: true,
    },
  },
  {
    id: "dr-niranjan-hiranandani",
    name: "Dr. Niranjan Hiranandani",
    image: "/images/people/dr-niranjan-hiranandani.svg",
    imageAlt: "Portrait of Dr. Niranjan Hiranandani, featured in LEGEND",
    category: "Developers' Diary",
    issueId: "may-2026",
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: true,
      roleVerified: true,
    },
  },
  {
    id: "jay-kotak",
    name: "Jay Kotak",
    image: "/images/people/jay-kotak.svg",
    imageAlt: "Portrait of Jay Kotak, featured in LEGEND",
    category: "Business & Finance",
    issueId: "july-2026",
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: true,
      roleVerified: true,
    },
  },
  {
    id: "gayatri-yadav",
    name: "Gayatri Yadav",
    image: "/images/people/gayatri-yadav.svg",
    imageAlt: "Portrait of Gayatri Yadav, featured in LEGEND",
    category: "Leadership",
    issueId: "july-2026",
    status: {
      approvedForWeb: true,
      imageRightsConfirmed: false,
      titleVerified: true,
      roleVerified: true,
    },
  },
];
