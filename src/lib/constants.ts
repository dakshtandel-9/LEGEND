/**
 * Runtime configuration and shared constants.
 *
 * The two Google Form URLs are the project's entire "backend"
 * (16-google-forms-specification.md). They are read from NEXT_PUBLIC_*
 * variables so the client can swap forms in Vercel without a code change.
 *
 * Next.js inlines NEXT_PUBLIC_* at build time, so these must be referenced as
 * full literal `process.env.X` expressions — destructuring `process.env` would
 * not be replaced and would resolve to undefined in the browser.
 */

import { site } from "@/data/site";

/** Public origin, used for metadataBase, canonical, sitemap and robots. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://legendmagazine.in"
).replace(/\/$/, "");

/** Form A — editorial submissions. */
export const STORY_FORM_URL = process.env.NEXT_PUBLIC_STORY_FORM_URL ?? "";

/** Form B — advertising and partnerships. */
export const PARTNERSHIP_FORM_URL =
  process.env.NEXT_PUBLIC_PARTNERSHIP_FORM_URL ?? "";

/**
 * True when a form URL is actually configured.
 *
 * Buttons stay rendered either way — a missing URL falls back to the relevant
 * mailto: address rather than shipping a dead link, so an unconfigured
 * preview deploy is still usable.
 */
export const hasStoryForm = STORY_FORM_URL.length > 0;
export const hasPartnershipForm = PARTNERSHIP_FORM_URL.length > 0;

/**
 * Resolved CTA destinations.
 *
 * When the Google Form URL is present the button opens the form in a new tab.
 * When it is not — an early preview deploy, or before the client has created
 * the forms — it degrades to a pre-addressed mailto: rather than a dead `#`.
 * `external` should follow `hasStoryForm` / `hasPartnershipForm` so a mailto:
 * link is not labelled "opens in a new tab".
 */
export const storyFormHref = hasStoryForm
  ? STORY_FORM_URL
  : `mailto:${site.contact.editorialEmail}?subject=${encodeURIComponent(
      "Story pitch for LEGEND",
    )}`;

export const partnershipFormHref = hasPartnershipForm
  ? PARTNERSHIP_FORM_URL
  : `mailto:${site.contact.partnershipsEmail}?subject=${encodeURIComponent(
      "Partnership enquiry — LEGEND",
    )}`;

/** Section anchors — 13-information-architecture.md. */
export const ANCHORS = {
  top: "top",
  featured: "featured",
  editions: "editions",
  stories: "stories",
  developersDiary: "developers-diary",
  about: "about",
  verticals: "verticals",
  pitch: "pitch",
  partnerships: "partnerships",
  contact: "contact",
} as const;

/**
 * Issue accent colours, resolved from the token names in the content data.
 * Kept as CSS custom-property references so a palette change in globals.css
 * flows through without editing components (05-color-system.md).
 */
export const ACCENT_VAR: Record<string, string> = {
  may: "var(--color-may)",
  july: "var(--color-july)",
  blue: "var(--color-editorial-blue)",
  gold: "var(--color-gold)",
};

export function accentColor(accent: string): string {
  return ACCENT_VAR[accent] ?? ACCENT_VAR.gold!;
}
