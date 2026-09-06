import { SectionLabel } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { EditorialRule } from "@/components/ui/EditorialRule";
import { site } from "@/data/site";
import { getLatestIssue } from "@/lib/content";
import { ANCHORS } from "@/lib/constants";

/**
 * "Why LEGEND" — 14-section-specification.md #07.
 *
 * The single dark editorial strip in the page's colour rhythm
 * (04-visual-direction.md). It follows the image-led Developers' Diary
 * section, which is where the pacing needs a full stop.
 *
 * Layout is a large serif statement over a narrow body column, with the
 * oversized issue numeral as a print motif behind it — decorative only, so it
 * is hidden from assistive technology.
 */
export function EditorialPhilosophy() {
  const copy = site.copy.about;
  const latest = getLatestIssue();

  return (
    <section
      id={ANCHORS.about}
      className="section relative overflow-hidden bg-ink"
      aria-labelledby="about-heading"
    >
      {/* Oversized folio numeral — 3% ink-on-ink, the texture note from 04. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none font-[family-name:var(--font-display)] text-[28rem] leading-none text-paper/[0.035] lg:block"
      >
        {latest.issueNumber}
      </span>

      <div className="shell relative">
        <Reveal>
          <SectionLabel tone="dark">{copy.eyebrow}</SectionLabel>
        </Reveal>

        <EditorialRule tone="dark" className="mt-6" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal delay={80} className="lg:col-span-7">
            <h2
              id="about-heading"
              className="text-h2 text-ink-heading"
            >
              {copy.heading}
            </h2>

            {/* Positioning statement, set as the pull quote 03 asks for. */}
            <blockquote className="mt-12 border-l border-gold pl-7">
              <p className="text-h4 italic text-gold-soft">
                {copy.pullQuote}
              </p>
            </blockquote>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal delay={140}>
              <p className="measure text-lead text-ink-body">{copy.body}</p>
            </Reveal>

            <Reveal delay={200}>
              <p className="measure mt-7 text-body text-ink-body/80">
                {copy.bodySecondary}
              </p>
            </Reveal>

            <Reveal delay={260}>
              <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink-line pt-8">
                <div>
                  <dt className="label text-ink-body/60">Published</dt>
                  <dd className="mt-2 text-h4 text-ink-heading">Monthly</dd>
                </div>
                <div>
                  <dt className="label text-ink-body/60">Based in</dt>
                  <dd className="mt-2 text-h4 text-ink-heading">
                    {site.brand.city}
                  </dd>
                </div>
                <div>
                  <dt className="label text-ink-body/60">Formats</dt>
                  <dd className="mt-2 text-h4 text-ink-heading">
                    Print &amp; Digital
                  </dd>
                </div>
                <div>
                  <dt className="label text-ink-body/60">Latest</dt>
                  <dd className="mt-2 text-h4 text-ink-heading">
                    Issue {latest.issueNumber}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
