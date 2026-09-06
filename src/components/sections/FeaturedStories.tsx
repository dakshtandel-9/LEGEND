import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { StoryCard } from "@/components/ui/StoryCard";
import { site } from "@/data/site";
import { getStoryLayout } from "@/lib/content";
import { ANCHORS } from "@/lib/constants";

/**
 * "Stories That Matter" — 14-section-specification.md #05.
 *
 * Deliberately asymmetric: a 7-column lead beside a 5-column secondary, then
 * a row of three. 07-grid-and-spacing.md rules out running one repeated
 * three-column grid down the whole page — hierarchy is the point.
 */
export function FeaturedStories() {
  const { lead, secondary, supporting } = getStoryLayout();
  const { stories: copy } = site.copy;

  return (
    <section
      id={ANCHORS.stories}
      className="section bg-white"
      aria-labelledby="stories-heading"
    >
      <div className="shell">
        <SectionIntro
          label={copy.eyebrow}
          heading={copy.heading}
          intro={copy.intro}
          headingId="stories-heading"
        />

        {/* Row 1 — lead (7 cols) + secondary (5 cols) */}
        <div className="mt-16 grid gap-x-10 gap-y-16 lg:mt-20 lg:grid-cols-12 lg:gap-x-14">
          <Reveal variant="image" className="lg:col-span-7">
            <StoryCard story={lead} variant="lead" />
          </Reveal>

          {secondary ? (
            <Reveal variant="image" delay={100} className="lg:col-span-5">
              <StoryCard story={secondary} variant="secondary" />
            </Reveal>
          ) : null}
        </div>

        {/* Row 2 — three supporting cards */}
        {supporting.length > 0 ? (
          <>
            <div className="mt-20 h-px w-full bg-line" role="presentation" />

            <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
              {supporting.map((story, index) => (
                <Reveal
                  key={story.id}
                  variant="image"
                  delay={index * 80}
                  className="h-full"
                >
                  <StoryCard story={story} />
                </Reveal>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
