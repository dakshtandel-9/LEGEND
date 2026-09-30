/**
 * Brand facts, navigation and the full copy deck.
 *
 * 17-technical-architecture.md: "Do not hardcode large content blobs directly
 * inside JSX." Every visible string on the page originates here or in one of
 * the other files in src/data, so copy edits never require touching layout.
 *
 * Wording is transcribed from 12-copy-deck.md, which is itself DRAFT COPY
 * pending client approval (25-launch-checklist.md).
 */

export const site = {
  /** Source-supported brand facts (SOURCE_NOTES.md). */
  brand: {
    name: "LEGEND",
    tagline: "Excellence · Culture · Vision",
    descriptor: "The Magazine of Extraordinary Stories",
    city: "Mumbai",
    cadence: "Monthly · Mumbai · Print & Digital",
    /**
     * Path to the official masthead SVG, once supplied (15-asset-inventory.md).
     * While this is null the <Wordmark /> component type-sets the name in the
     * display serif — 06-typography.md prefers the real asset whenever it
     * exists, so drop the file in and set the path here.
     */
    logo: null as string | null,
  },

  /**
   * Contact and social details.
   *
   * PENDING CLIENT CONFIRMATION — 25-launch-checklist.md lists "final contact
   * details" and "social links" as approval gates. The values below are
   * plausible placeholders so the footer renders complete; `content:check`
   * fails the launch audit while `confirmed` is false.
   */
  contact: {
    confirmed: false,
    editorialEmail: "editorial@legendmagazine.in",
    partnershipsEmail: "partnerships@legendmagazine.in",
    instagramHandle: "@legendmagazine",
    instagramUrl: "https://www.instagram.com/legendmagazine",
    location: "Mumbai, India",
  },

  /** Header navigation — 12-copy-deck.md, anchors from 13-information-architecture.md. */
  nav: [
    { label: "Stories", href: "#stories" },
    { label: "Editions", href: "#editions" },
    { label: "Developers' Diary", href: "#developers-diary" },
    { label: "About", href: "#about" },
    { label: "Partner With Us", href: "#partnerships" },
  ],

  /** Footer navigation — 12-copy-deck.md. */
  footerNav: [
    { label: "Editions", href: "#editions" },
    { label: "Developers' Diary", href: "#developers-diary" },
    { label: "Editorial Submissions", href: "#pitch" },
    { label: "Advertising & Partnerships", href: "#partnerships" },
  ],

  copy: {
    hero: {
      eyebrow: "LEGEND · MUMBAI",
      /** Split into art-directed lines for the masked reveal (09-motion-system.md). */
      headingLines: ["The people shaping India.", "The stories worth remembering."],
      body: "LEGEND is a Mumbai-born editorial magazine profiling leaders, builders, creators and institutions shaping business, culture and the world around us.",
      primaryCta: "Explore Latest Edition",
      secondaryCta: "Pitch Your Story",
    },

    featured: {
      eyebrow: "From the pages of LEGEND",
      heading: "Featured in LEGEND",
      body: "Leaders, builders, creators and public figures whose work, choices and ideas deserve a closer look.",
      /** Guards the credibility rule in PROJECT_CONTEXT.md. Keep it visible. */
      disclaimer:
        "Appearance in LEGEND. Not every profile is an interview or an exclusive.",
      alsoFeaturedLabel: "Also featured",
    },

    editions: {
      eyebrow: "The archive",
      heading: "The Latest Editions",
      intro:
        "Explore the stories, people and ideas featured across LEGEND's recent issues.",
      primaryCta: "View Edition",
    },

    stories: {
      eyebrow: "Editor's selection",
      heading: "Stories That Matter",
      intro:
        "Beyond the headline is the decision, ambition and human story that made it possible.",
      cta: "View in Edition",
    },

    developersDiary: {
      eyebrow: "Signature series",
      heading: "Developers' Diary",
      body: "Inside the vision, decisions and philosophies of the people reshaping India's cities, skylines and built environment.",
      cta: "Explore Developers' Diary",
    },

    about: {
      eyebrow: "Why LEGEND",
      heading: "We look beyond the headline.",
      body: "LEGEND is interested in the architecture behind achievement — the judgment, risk, persistence, relationships and ideas that turn ambition into consequence.",
      bodySecondary:
        "From institutions transforming Mumbai to founders, developers, public figures and creators shaping modern India, we document stories worth returning to.",
      /** Website interpretation of the print positioning (02-brand-analysis.md). */
      pullQuote:
        "A Mumbai-born editorial platform documenting the people, institutions and ideas shaping what comes next.",
    },

    verticals: {
      eyebrow: "Editorial verticals",
      heading: "What We Cover",
    },

    pitch: {
      eyebrow: "Editorial submissions",
      heading: "Have a story worth telling?",
      body: "We profile people, institutions and ideas creating meaningful change. If you believe your work belongs in the conversation, introduce it to our editorial team.",
      cta: "Pitch Your Story",
      microcopy:
        "Submissions are reviewed by the editorial team and do not guarantee publication.",
    },

    partnerships: {
      eyebrow: "Brand partnerships",
      heading: "Build your presence with LEGEND.",
      body: "For advertising, branded collaborations, special features and partnership opportunities, speak with our team.",
      cta: "Discuss a Partnership",
      /** Keeps the commercial route unmistakably separate from editorial. */
      microcopy:
        "Commercial enquiries only. Editorial submissions are reviewed separately and are never influenced by advertising.",
    },

    footer: {
      description: "The Magazine of Extraordinary Stories. Mumbai.",
      legal: "© LEGEND. All rights reserved.",
      latestIssueLabel: "Latest edition",
    },
  },

  seo: {
    title:
      "LEGEND Magazine | Extraordinary Stories of Leadership, Business & Culture",
    description:
      "Discover LEGEND, a Mumbai-born editorial magazine profiling leaders, builders, creators and institutions shaping business, culture and modern India.",
    keywords: [
      "LEGEND Magazine",
      "Mumbai magazine",
      "Indian business magazine",
      "leadership profiles",
      "Developers' Diary",
      "editorial magazine India",
    ],
  },
} as const;

export type Site = typeof site;
