import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { getLatestIssue } from "@/lib/content";

/**
 * Open Graph / Twitter card image — 20-seo-plan.md.
 *
 * Generated at build time as a real PNG rather than shipped as a hand-made
 * asset, so the "latest edition" line stays correct when a new issue is added
 * and there is one less file to keep in sync (19-content-maintenance.md).
 *
 * 1.91:1 as required by 08-imagery-guidelines.md. The link preview is the
 * first thing most people see, because this URL is meant to be shared through
 * WhatsApp and Instagram (PROJECT_CONTEXT.md).
 *
 * To replace it with art-directed artwork instead, delete this file and add
 * `openGraph.images` in layout.tsx pointing at /images/brand/legend-og.jpg.
 */
export const alt = `${site.brand.name} — ${site.brand.descriptor}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Fetches Bodoni Moda as a TTF for Satori, which cannot parse woff2.
 * Google serves TTF to clients that do not advertise woff2 support, so the
 * request is deliberately plain. Any failure falls back to the built-in
 * sans — a slightly different card is far better than a failed build.
 */
async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@500&display=swap",
    ).then((res) => (res.ok ? res.text() : ""));

    const url = css.match(/src:\s*url\((https:\/\/[^)]+\.ttf)\)/)?.[1];
    if (!url) return null;

    const font = await fetch(url);
    return font.ok ? await font.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const latest = getLatestIssue();
  const displayFont = await loadDisplayFont();

  const ink = "#151515";
  const paper = "#F5F2EA";
  const gold = "#B79D73";
  const muted = "#CFC9BD";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: ink,
          padding: 64,
          fontFamily: displayFont ? "Bodoni Moda" : "sans-serif",
        }}
      >
        {/* Inset gold frame */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            right: 32,
            bottom: 32,
            border: `1px solid ${gold}`,
            display: "flex",
          }}
        />

        {/* Top rail */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: muted,
          }}
        >
          <div style={{ display: "flex" }}>{site.brand.city} · Monthly</div>
          <div style={{ display: "flex", color: gold }}>
            Issue {latest.issueNumber} · {latest.title}
          </div>
        </div>

        {/* Masthead */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 168,
              lineHeight: 1,
              letterSpacing: 28,
              color: paper,
            }}
          >
            {site.brand.name}
          </div>

          <div
            style={{
              display: "flex",
              width: 200,
              height: 2,
              backgroundColor: gold,
              marginTop: 40,
            }}
          />

          <div
            style={{
              display: "flex",
              marginTop: 34,
              fontSize: 40,
              color: muted,
            }}
          >
            {site.brand.descriptor}
          </div>
        </div>

        {/* Bottom rail */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: gold,
          }}
        >
          <div style={{ display: "flex" }}>{site.brand.tagline}</div>
          <div style={{ display: "flex", color: muted, letterSpacing: 3 }}>
            Print &amp; Digital
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: displayFont
        ? [
            {
              name: "Bodoni Moda",
              data: displayFont,
              weight: 500 as const,
              style: "normal" as const,
            },
          ]
        : undefined,
    },
  );
}
