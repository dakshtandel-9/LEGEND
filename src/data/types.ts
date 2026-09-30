/**
 * Content model for the LEGEND landing page.
 *
 * There is no database and no CMS by design (17-technical-architecture.md).
 * Every piece of editorial content is a typed object in `src/data`, version
 * controlled in Git and updated with a pull request per issue
 * (19-content-maintenance.md).
 *
 * Base shapes follow 18-local-content-model.md exactly. The `EditorialStatus`
 * fields are the pre-publication flags required by 11-content-inventory.md;
 * `npm run content:check` reads them and reports anything not cleared for
 * launch, which is what a CMS approval workflow would otherwise give us.
 */

export type IssueAccent = "may" | "september" | (string & {});

/**
 * Rights and verification flags carried alongside every person and story.
 * Nothing here is rendered — it exists so the pre-launch audit can prove a
 * human confirmed each claim (11-content-inventory.md, 24-qa-checklist.md).
 */
export type EditorialStatus = {
  /** Client has approved this item appearing on the public website. */
  approvedForWeb: boolean;
  /** Web usage rights for the accompanying photograph are confirmed. */
  imageRightsConfirmed: boolean;
  /** Headline/title wording checked against the printed edition. */
  titleVerified: boolean;
  /** Designation and organisation checked against the printed edition. */
  roleVerified: boolean;
  /** Photographer or agency credit, kept even when not displayed. */
  imageCredit?: string;
  /** Free-text note for whoever runs the pre-launch check. */
  note?: string;
};

export type Issue = {
  id: string;
  issueNumber: string;
  month: string;
  year: number;
  title: string;
  description: string;
  cover: string;
  /** Local file under /public/issues. Never preloaded (22-performance-budget.md). */
  pdf: string;
  accent: IssueAccent;
  featuredNames: string[];
  /** Cover alt text — issues carry meaning, so this is never decorative. */
  coverAlt: string;
};

export type Person = {
  id: string;
  name: string;
  /** Omitted when the exact designation has not been verified in print. */
  role?: string;
  organisation?: string;
  image: string;
  imageAlt: string;
  category: string;
  issueId: string;
  /** Appears in the "Featured in LEGEND" editorial grid. */
  featured?: boolean;
  status: EditorialStatus;
};

export type Story = {
  id: string;
  title: string;
  subject?: string;
  category: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  issueId: string;
  /** Lead story in the "Stories That Matter" grid. Exactly one should be true. */
  featured?: boolean;
  /** Optional deep link — a page reference inside the edition PDF. */
  pageLabel?: string;
  status: EditorialStatus;
};

export type Vertical = {
  id: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
};
