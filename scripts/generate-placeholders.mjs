/**
 * Generates the launch placeholders in /public.
 *
 * 15-asset-inventory.md lists every real asset as outstanding — logo,
 * portraits and covers require client sign-off and
 * rights clearance (08-imagery-guidelines.md is emphatic: never use random
 * stock portraits of real people). Until those arrive the project still needs
 * files at the paths in src/data, or next/image 404s and the layout collapses.
 *
 * So this writes art-directed SVG placeholders in the brand palette, each
 * carrying a visible "PLACEHOLDER" caption so a stand-in can never be
 * mistaken for approved photography.
 *
 * Replace placeholders with approved imagery and update paths in src/data.
 *
 * Run with:  npm run assets:placeholders
 */

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const DATA = join(ROOT, "src", "data");

/* --- Palette (05-color-system.md) ---------------------------------------- */
const INK = "#151515";
const PAPER = "#F5F2EA";
const PAPER_DEEP = "#ECE7DB";
const MUTED = "#6D6A63";
const LINE = "#D8D2C6";
const GOLD = "#B79D73";
const ACCENT = { "05": "#D5E35B", "07": "#16BCD6" };

const HONORIFICS = new Set(["dr", "mr", "mrs", "ms", "shri", "smt", "the"]);

const titleFromSlug = (slug) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const initialsFromSlug = (slug) => {
  const parts = slug.split("-").filter((p) => !HONORIFICS.has(p.toLowerCase()));
  return parts
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("");
};

const MONTHS = {
  "01": "January", "02": "February", "03": "March", "04": "April",
  "05": "May", "06": "June", "07": "July", "08": "August",
  "09": "September", "10": "October", "11": "November", "12": "December",
};

/* --- SVG templates -------------------------------------------------------- */

// `text-transform` is not a reliable SVG presentation attribute, so any
// uppercasing is done to the string itself at the call site.
const caption = (x, y, text, fill = MUTED, size = 13) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-family="Inter, Helvetica, Arial, sans-serif" ` +
  `font-size="${size}" letter-spacing="2.4">${text}</text>`;

/** 4:5 portrait — a duotone plate carrying the subject's monogram. */
function portraitSvg(slug) {
  const initials = initialsFromSlug(slug);
  const name = titleFromSlug(slug);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000" role="img" aria-label="Placeholder portrait for ${name}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="${PAPER_DEEP}"/>
      <stop offset="55%" stop-color="#DED7C8"/>
      <stop offset="100%" stop-color="#C9C1B0"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#g)"/>
  <circle cx="400" cy="392" r="188" fill="${PAPER}" opacity="0.5"/>
  <path d="M188 1000c0-140 95-236 212-236s212 96 212 236z" fill="${PAPER}" opacity="0.5"/>
  <text x="400" y="470" fill="${INK}" opacity="0.26" text-anchor="middle"
        font-family="Bodoni Moda, Didot, Georgia, serif" font-size="248" letter-spacing="10">${initials}</text>
  <rect x="72" y="880" width="64" height="1.5" fill="${GOLD}"/>
  ${caption(72, 928, "Portrait placeholder", MUTED, 15)}
  ${caption(72, 954, "Replace with approved photography", `${MUTED}`, 12)}
</svg>
`;
}

/** 3:4 magazine cover in the edition's accent. */
function coverSvg(slug) {
  const [year, month] = slug.split("-");
  const monthName = MONTHS[month] ?? "";
  const accent = ACCENT[month] ?? GOLD;
  const issueNumber = month === "05" ? "01" : month === "07" ? "02" : "—";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" width="900" height="1200" role="img" aria-label="Placeholder cover for ${monthName} ${year}">
  <rect width="900" height="1200" fill="${INK}"/>
  <rect x="34" y="34" width="832" height="1132" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
  <text x="450" y="248" fill="${PAPER}" text-anchor="middle"
        font-family="Bodoni Moda, Didot, Georgia, serif" font-size="118" letter-spacing="22">LEGEND</text>
  <rect x="330" y="300" width="240" height="1.5" fill="${GOLD}"/>
  ${caption(276, 352, "Excellence &#183; Culture &#183; Vision", GOLD, 15)}
  <rect x="34" y="640" width="360" height="120" fill="${accent}"/>
  <text x="72" y="722" fill="${INK}" font-family="Bodoni Moda, Didot, Georgia, serif" font-size="86">${issueNumber}</text>
  <text x="196" y="700" fill="${INK}" font-family="Inter, Helvetica, Arial, sans-serif" font-size="19" letter-spacing="3.5">ISSUE</text>
  <text x="196" y="730" fill="${INK}" font-family="Inter, Helvetica, Arial, sans-serif" font-size="19" letter-spacing="3.5">${monthName.toUpperCase()} ${year}</text>
  <text x="72" y="900" fill="${PAPER}" font-family="Bodoni Moda, Didot, Georgia, serif" font-size="58">The Magazine of</text>
  <text x="72" y="964" fill="${PAPER}" font-family="Bodoni Moda, Didot, Georgia, serif" font-size="58">Extraordinary Stories</text>
  <rect x="72" y="1046" width="64" height="1.5" fill="${GOLD}"/>
  ${caption(72, 1094, "Cover placeholder", "#8A857B", 14)}
  ${caption(72, 1120, "Replace with the printed cover artwork", "#8A857B", 12)}
</svg>
`;
}

/** Wide editorial plate for story and hero imagery. */
function editorialSvg(slug, width, height) {
  const name = titleFromSlug(slug);
  const w = width;
  const h = height;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Placeholder editorial image: ${name}">
  <rect width="${w}" height="${h}" fill="${PAPER_DEEP}"/>
  <g stroke="${LINE}" stroke-width="1">
    ${Array.from({ length: 11 }, (_, i) => {
      const x = Math.round((w / 12) * (i + 1));
      return `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
    }).join("\n    ")}
  </g>
  <rect x="${Math.round(w * 0.08)}" y="${Math.round(h * 0.16)}" width="${Math.round(w * 0.42)}" height="${Math.round(h * 0.62)}" fill="${INK}" opacity="0.86"/>
  <rect x="${Math.round(w * 0.44)}" y="${Math.round(h * 0.3)}" width="${Math.round(w * 0.3)}" height="${Math.round(h * 0.46)}" fill="${GOLD}" opacity="0.75"/>
  <rect x="${Math.round(w * 0.68)}" y="${Math.round(h * 0.1)}" width="${Math.round(w * 0.22)}" height="${Math.round(h * 0.34)}" fill="${MUTED}" opacity="0.42"/>
  <rect x="${Math.round(w * 0.08)}" y="${Math.round(h * 0.845)}" width="64" height="1.5" fill="${GOLD}"/>
  ${caption(Math.round(w * 0.08), Math.round(h * 0.9), name, MUTED, Math.round(h * 0.022))}
  ${caption(Math.round(w * 0.08), Math.round(h * 0.945), "Editorial image placeholder", MUTED, Math.round(h * 0.017))}
</svg>
`;
}

/* --- Discovery ------------------------------------------------------------ */

/** Pulls every local asset path referenced by the content files. */
async function collectAssetPaths() {
  const files = await readdir(DATA);
  const paths = new Set();

  for (const file of files) {
    if (!file.endsWith(".ts")) continue;
    const source = await readFile(join(DATA, file), "utf8");
    for (const match of source.matchAll(/["'](\/images\/[^"']+)["']/g)) {
      paths.add(match[1]);
    }
  }

  // Referenced directly in Hero.tsx rather than through the data files.
  paths.add("/images/stories/hero-editorial.svg");
  return [...paths].sort();
}

/* --- Main ----------------------------------------------------------------- */

const written = [];
const skipped = [];

for (const assetPath of await collectAssetPaths()) {
  const target = join(PUBLIC, assetPath);
  await mkdir(dirname(target), { recursive: true });

  const slug = assetPath.split("/").pop().replace(/\.[^.]+$/, "");

  // Only SVG placeholders are generated. If a path already points at real
  // artwork (.webp/.jpg), leave it well alone.
  if (!assetPath.endsWith(".svg")) {
    skipped.push(assetPath);
    continue;
  }

  let svg;
  if (assetPath.includes("/people/")) {
    svg = portraitSvg(slug);
  } else if (assetPath.includes("/issues/")) {
    svg = coverSvg(slug);
  } else if (assetPath.includes("/verticals/")) {
    svg = editorialSvg(slug, 800, 1000);
  } else if (slug === "hero-editorial") {
    svg = editorialSvg("legend-editorial-composition", 1200, 1500);
  } else {
    svg = editorialSvg(slug, 1600, 1000);
  }

  await writeFile(target, svg, "utf8");
  written.push(assetPath);
}

console.log(`\nGenerated ${written.length} placeholder asset(s) in /public:\n`);
for (const path of written) console.log(`  ${path}`);
if (skipped.length) {
  console.log(`\nLeft alone (not SVG — assumed to be real artwork):\n`);
  for (const path of skipped) console.log(`  ${path}`);
}
console.log(
  "\nThese are stand-ins. Replace them with rights-cleared assets before launch —\n" +
    "see legend-landing-page-planning/15-asset-inventory.md.\n",
);
