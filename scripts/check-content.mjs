/**
 * Pre-launch content audit.
 *
 * The project has no CMS and no admin panel by design, so there is no
 * approval workflow to stop unverified content reaching production. This
 * script is that gate. It reads the same typed data the page renders and
 * checks it against 11-content-inventory.md, 24-qa-checklist.md and
 * 25-launch-checklist.md.
 *
 * Two severities, and the distinction matters:
 *   ERROR   — something is broken. A referenced file is missing, a story
 *             points at an edition that does not exist. Exits non-zero.
 *   PENDING — something is unfinished but not broken: rights not cleared,
 *             a headline not signed off, placeholders still in place. These
 *             are reported loudly and do NOT fail the command, because they
 *             are decisions for the client, not bugs for the developer.
 *
 * Run with:  npm run content:check
 */

import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");

const errors = [];
const pending = [];

const error = (area, message) => errors.push({ area, message });
const warn = (area, message) => pending.push({ area, message });

const exists = async (publicPath) => {
  try {
    await access(join(PUBLIC, publicPath), constants.R_OK);
    return true;
  } catch {
    return false;
  }
};

/* --- Load the content ----------------------------------------------------- */

let issues, people, stories, verticals, site;

try {
  // Node strips the type annotations; the data files import only types from
  // ./types, and those statements are erased before resolution.
  ({ issues } = await import("../src/data/issues.ts"));
  ({ people } = await import("../src/data/people.ts"));
  ({ stories } = await import("../src/data/stories.ts"));
  ({ verticals } = await import("../src/data/verticals.ts"));
  ({ site } = await import("../src/data/site.ts"));
} catch (cause) {
  console.error(
    "\nCould not load src/data. This script needs Node 22.6+ for TypeScript " +
      "type stripping.\n",
  );
  console.error(cause);
  process.exit(1);
}

const issueIds = new Set(issues.map((issue) => issue.id));

/* --- Assets --------------------------------------------------------------- */

const assets = [
  ...issues.flatMap((i) => [
    { path: i.cover, owner: `issue "${i.id}" cover` },
    ...Array.from({ length: i.pageCount }, (_, index) => ({
      path: `/reader/${i.id}/page-${String(index + 1).padStart(2, "0")}.jpg`,
      owner: `issue "${i.id}" page ${index + 1}`,
    })),
  ]),
  ...people.map((p) => ({ path: p.image, owner: `person "${p.id}"` })),
  ...stories.map((s) => ({ path: s.image, owner: `story "${s.id}"` })),
  ...verticals.map((v) => ({ path: v.image, owner: `vertical "${v.id}"` })),
  { path: "/images/stories/hero-editorial.svg", owner: "hero composition" },
];

let placeholderCount = 0;

for (const { path, owner } of assets) {
  if (!(await exists(path))) {
    error("assets", `${owner} → ${path} does not exist in /public.`);
    continue;
  }

  if (path.endsWith(".svg")) {
    placeholderCount += 1;
  }
}

if (placeholderCount > 0) {
  warn(
    "assets",
    `${placeholderCount} placeholder asset(s) still in use. Replace with ` +
      `rights-cleared imagery (15-asset-inventory.md).`,
  );
}

/* --- Referential integrity ------------------------------------------------ */

for (const person of people) {
  if (!issueIds.has(person.issueId)) {
    error("data", `person "${person.id}" references unknown issue "${person.issueId}".`);
  }
  if (!person.imageAlt?.trim()) {
    error("a11y", `person "${person.id}" has no alt text.`);
  }
}

for (const story of stories) {
  if (!issueIds.has(story.issueId)) {
    error("data", `story "${story.id}" references unknown issue "${story.issueId}".`);
  }
  if (!story.imageAlt?.trim()) {
    error("a11y", `story "${story.id}" has no alt text.`);
  }
}

const leadStories = stories.filter((s) => s.featured);
if (leadStories.length !== 1) {
  error(
    "data",
    `exactly one story must be flagged \`featured\` as the grid lead; found ${leadStories.length}.`,
  );
}

const featuredPeople = people.filter((p) => p.featured);
if (featuredPeople.length !== 5) {
  warn(
    "layout",
    `the "Featured in LEGEND" grid is designed for 5 portraits (1 lead + 4); found ${featuredPeople.length}.`,
  );
}

// Categories on content should exist as editorial verticals, so the
// "What We Cover" list stays a true index of the publication.
const verticalLabels = new Set(verticals.map((v) => v.label));
for (const item of [...people, ...stories]) {
  if (!verticalLabels.has(item.category)) {
    warn(
      "data",
      `"${item.id}" uses category "${item.category}", which is not one of the ten verticals.`,
    );
  }
}

/* --- Editorial sign-off (11-content-inventory.md) ------------------------- */

for (const item of [...people, ...stories]) {
  const s = item.status;
  const label = item.name ?? item.title;

  if (!s.approvedForWeb) {
    warn("approval", `"${label}" is not marked approvedForWeb.`);
  }
  if (!s.imageRightsConfirmed) {
    warn("rights", `"${label}" — image rights not confirmed.`);
  }
  if (!s.titleVerified) {
    warn("copy", `"${label}" — wording not verified against the printed edition.`);
  }
  if (!s.roleVerified) {
    warn("copy", `"${label}" — designation/organisation not verified.`);
  }
}

/* --- Configuration (16-google-forms-specification.md, 25-launch) ---------- */

const env = await readFile(join(ROOT, ".env.local"), "utf8").catch(() => "");

const formVars = [
  ["NEXT_PUBLIC_STORY_FORM_URL", "editorial submissions"],
  ["NEXT_PUBLIC_PARTNERSHIP_FORM_URL", "advertising / partnerships"],
];

for (const [key, purpose] of formVars) {
  const value =
    process.env[key] ?? env.match(new RegExp(`^${key}=(.*)$`, "m"))?.[1]?.trim();

  if (!value) {
    warn("config", `${key} is not set — the ${purpose} CTA falls back to mailto:.`);
  } else if (value.includes("REPLACE_WITH")) {
    error("config", `${key} still holds the example value from .env.example.`);
  } else if (!value.startsWith("https://docs.google.com/forms/")) {
    warn("config", `${key} does not look like a Google Form URL: ${value}`);
  }
}

if (!site.contact.confirmed) {
  warn(
    "config",
    "site.contact.confirmed is false — email addresses, Instagram handle and " +
      "location are placeholders pending client sign-off.",
  );
}

if (!site.brand.logo) {
  warn(
    "assets",
    "no official masthead SVG yet; <Wordmark /> is type-setting the name. " +
      "Add the file and set site.brand.logo.",
  );
}

/* --- Report --------------------------------------------------------------- */

const group = (items) =>
  items.reduce((acc, item) => {
    (acc[item.area] ??= []).push(item.message);
    return acc;
  }, {});

const print = (title, items) => {
  if (items.length === 0) return;
  console.log(`\n${title} (${items.length})`);
  for (const [area, messages] of Object.entries(group(items))) {
    console.log(`\n  ${area}`);
    for (const message of messages) console.log(`    · ${message}`);
  }
};

console.log("\nLEGEND — pre-launch content audit");
console.log("─".repeat(60));

print("BLOCKING ERRORS", errors);
print("PENDING CLIENT SIGN-OFF", pending);

console.log("\n" + "─".repeat(60));

if (errors.length === 0 && pending.length === 0) {
  console.log("All checks passed. Ready to launch.\n");
  process.exit(0);
}

if (errors.length === 0) {
  console.log(
    `No blocking errors. ${pending.length} item(s) need client sign-off before\n` +
      "the site goes live — see legend-landing-page-planning/25-launch-checklist.md.\n",
  );
  process.exit(0);
}

console.log(`${errors.length} blocking error(s). Fix these before deploying.\n`);
process.exit(1);
