import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { getLatestIssue, getIssuesNewestFirst } from "@/lib/content";
import { ANCHORS, hasStoryForm, storyFormHref } from "@/lib/constants";

/**
 * Hero — 14-section-specification.md #02.
 *
 * Desktop is 5 columns of copy against 7 columns of visual, with the two
 * edition covers layered against the portrait as supporting proof. Mobile
 * stacks copy first, then the visual.
 *
 * The headline animates as masked lines rising once on load
 * (09-motion-system.md #1). That runs on pure CSS with a per-line delay, so
 * there is no client component and no JavaScript in the critical path — the
 * text is in the server-rendered HTML either way.
 */
export function Hero() {
  const latest = getLatestIssue();
  const [newest, previous] = getIssuesNewestFirst();
  const { hero } = site.copy;

  return (
    <section
      id={ANCHORS.top}
      className="relative overflow-hidden bg-paper pb-16 pt-28 md:pb-24 md:pt-36 lg:min-h-[86vh] lg:pt-44"
      aria-labelledby="hero-heading"
    >
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* ---------- Copy: 5 columns ---------- */}
          <div className="lg:col-span-5">
            <p
              className="label line-mask text-muted"
              style={{ "--line-delay": "60ms" } as React.CSSProperties}
            >
              {/* The animated span must stay display:block, so the flex row
                  lives one level in. */}
              <span>
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-block h-px w-8 bg-gold"
                  />
                  {hero.eyebrow}
                </span>
              </span>
            </p>

            <h1
              id="hero-heading"
              className="mt-7 text-display text-ink"
            >
              {hero.headingLines.map((line, index) => (
                <span
                  key={line}
                  className="line-mask"
                  style={
                    { "--line-delay": `${160 + index * 110}ms` } as React.CSSProperties
                  }
                >
                  <span>{line}</span>
                </span>
              ))}
            </h1>

            <p
              className="line-mask mt-8 max-w-xl text-lead text-muted"
              style={{ "--line-delay": "440ms" } as React.CSSProperties}
            >
              <span>{hero.body}</span>
            </p>

            {/* `.rise` rather than `.line-mask` — a mask would clip the
                buttons' focus outlines. */}
            <div
              className="rise mt-11 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
              style={{ "--line-delay": "540ms" } as React.CSSProperties}
            >
              <Button
                href={latest.pdf}
                external
                variant="primary"
                event="hero_latest_issue_click"
                payload={{ issue_id: latest.id }}
                ariaLabel={`${hero.primaryCta} — open ${latest.title} Edition (PDF)`}
              >
                {hero.primaryCta}
              </Button>

              <Button
                href={storyFormHref}
                external={hasStoryForm}
                variant="secondary"
                event="hero_pitch_story_click"
                payload={{ location: "hero" }}
              >
                {hero.secondaryCta}
              </Button>
            </div>

            {/* Thin line metadata beneath — 04-visual-direction.md */}
            <div
              className="rise mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-6"
              style={{ "--line-delay": "640ms" } as React.CSSProperties}
            >
              <span className="label text-ink">{site.brand.tagline}</span>
              <span aria-hidden="true" className="h-px w-6 bg-line" />
              <span className="label text-muted">{site.brand.cadence}</span>
            </div>
          </div>

          {/* ---------- Visual: 7 columns ---------- */}
          <div className="lg:col-span-7">
            <div className="relative lg:pl-12">
              {/* One art-directed composition, not a wall of small faces. */}
              <div className="frame aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-[4/5]">
                <Image
                  src="/images/stories/hero-editorial.svg"
                  alt="LEGEND editorial cover composition for the latest edition"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>

              {/* Layered edition covers as supporting proof. Offset, small,
                  and never overlapping the portrait's focal area on mobile. */}
              <div className="pointer-events-none absolute -bottom-8 right-3 flex items-end gap-3 sm:-bottom-10 sm:right-6 lg:right-0">
                {previous ? (
                  <div className="frame aspect-[3/4] w-20 rotate-[-4deg] shadow-[0_16px_40px_-24px_rgba(21,21,21,0.7)] sm:w-28 lg:w-32">
                    <Image
                      src={previous.cover}
                      alt={previous.coverAlt}
                      fill
                      sizes="(max-width: 640px) 80px, 128px"
                      className="object-cover"
                    />
                  </div>
                ) : null}

                {newest ? (
                  <div className="frame aspect-[3/4] w-24 shadow-[0_20px_50px_-24px_rgba(21,21,21,0.75)] sm:w-32 lg:w-40">
                    <Image
                      src={newest.cover}
                      alt={newest.coverAlt}
                      fill
                      sizes="(max-width: 640px) 96px, 160px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>

              {/* Caption rail, running vertically on desktop like a print folio. */}
              <p className="mt-14 text-caption text-muted lg:absolute lg:-left-2 lg:top-0 lg:mt-0 lg:origin-top-left lg:rotate-90 lg:whitespace-nowrap">
                Issue {latest.issueNumber} · {latest.title} · {site.brand.city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
