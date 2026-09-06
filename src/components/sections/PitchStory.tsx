import { SectionLabel } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { EditorialRule } from "@/components/ui/EditorialRule";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { ANCHORS, hasStoryForm, storyFormHref } from "@/lib/constants";

/**
 * "Pitch Your Story" — 14-section-specification.md #09.
 *
 * Editorial conversion, placed late on purpose: 13-information-architecture.md
 * argues that asking for submissions above the fold would make the
 * publication feel transactional.
 *
 * The CTA opens Google Form A in a new tab (16-google-forms-specification.md,
 * recommended integration). Nothing is collected by this application — there
 * is no form element, no action and no handler anywhere in the project.
 *
 * The "does not guarantee publication" disclaimer is required, not optional.
 */
export function PitchStory() {
  const copy = site.copy.pitch;

  return (
    <section
      id={ANCHORS.pitch}
      className="section bg-white"
      aria-labelledby="pitch-heading"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>{copy.eyebrow}</SectionLabel>
            </Reveal>

            <EditorialRule className="mt-6" />

            <Reveal delay={80}>
              <h2 id="pitch-heading" className="mt-8 text-h2 text-ink">
                {copy.heading}
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={140}>
              <p className="measure text-lead text-ink">{copy.body}</p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10">
                <Button
                  href={storyFormHref}
                  external={hasStoryForm}
                  variant="primary"
                  event="pitch_story_click"
                  payload={{ location: "pitch_section" }}
                >
                  {copy.cta}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <p className="measure mt-8 border-l border-gold pl-5 text-caption text-muted">
                {copy.microcopy}
              </p>
            </Reveal>

            {/* What the editorial team actually reads. Setting expectations
                here is cheaper than fielding under-specified pitches. */}
            <Reveal delay={320}>
              <dl className="mt-12 grid gap-x-8 gap-y-7 border-t border-line pt-8 sm:grid-cols-3">
                <div>
                  <dt className="label text-muted/70">01</dt>
                  <dd className="mt-2 text-body text-ink">
                    Who you are and what you are building.
                  </dd>
                </div>
                <div>
                  <dt className="label text-muted/70">02</dt>
                  <dd className="mt-2 text-body text-ink">
                    Why the story matters now.
                  </dd>
                </div>
                <div>
                  <dt className="label text-muted/70">03</dt>
                  <dd className="mt-2 text-body text-ink">
                    Anything already published about it.
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
