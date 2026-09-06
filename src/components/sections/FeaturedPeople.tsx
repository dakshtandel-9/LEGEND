import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { PersonCard } from "@/components/ui/PersonCard";
import { site } from "@/data/site";
import { getFeaturedPeople, getAlsoFeaturedPeople } from "@/lib/content";
import { ANCHORS } from "@/lib/constants";

/**
 * "Featured in LEGEND" — 14-section-specification.md #03.
 *
 * One large lead portrait plus four compact profiles on desktop; a horizontal
 * snap rail on mobile, so portraits keep editorial scale on a phone instead
 * of collapsing into thumbnails (03-design-principles.md #9).
 *
 * The names that did not make the grid run beneath as a slow ticker. Per
 * 09-motion-system.md that is only acceptable because it pauses on hover and
 * on focus, and because the same names are plain text in the DOM.
 */
export function FeaturedPeople() {
  const featured = getFeaturedPeople();
  const [lead, ...supporting] = featured;
  const alsoFeatured = getAlsoFeaturedPeople();
  const { featured: copy } = site.copy;

  if (!lead) return null;

  return (
    <section
      id={ANCHORS.featured}
      className="section bg-white"
      aria-labelledby="featured-heading"
    >
      <div className="shell">
        <SectionIntro
          label={copy.eyebrow}
          heading={copy.heading}
          intro={copy.body}
          headingId="featured-heading"
        />

        {/* ---------- Desktop: 1 large + 4 compact ---------- */}
        <div className="mt-16 hidden md:grid md:grid-cols-12 md:gap-x-6 md:gap-y-14 lg:mt-20">
          <Reveal variant="image" className="md:col-span-7 lg:col-span-6">
            <PersonCard person={lead} variant="lead" />
          </Reveal>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:col-span-5 lg:col-span-6">
            {supporting.map((person, index) => (
              <Reveal
                key={person.id}
                variant="image"
                delay={80 + index * 70}
                className="h-full"
              >
                <PersonCard person={person} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------- Mobile: horizontal rail ---------- */}
        <div className="md:hidden">
          <div
            className="rail -mx-5 mt-12 gap-5 px-5 pb-2"
            role="group"
            aria-label="Featured personalities — scroll horizontally"
          >
            {featured.map((person) => (
              <div key={person.id} className="w-[68vw] max-w-xs">
                <PersonCard person={person} />
              </div>
            ))}
          </div>
          <p className="mt-4 text-caption text-muted/70">Scroll for more &rarr;</p>
        </div>

        {/* ---------- Also featured ---------- */}
        {alsoFeatured.length > 0 ? (
          <div className="mt-20 border-t border-line pt-8">
            <p className="label text-muted">{copy.alsoFeaturedLabel}</p>

            <div className="ticker mt-6 overflow-hidden" aria-hidden="true">
              <div className="ticker-track">
                {[0, 1].map((pass) => (
                  <ul key={pass} className="flex shrink-0 items-center">
                    {alsoFeatured.map((person) => (
                      <li
                        key={`${pass}-${person.id}`}
                        className="flex items-center whitespace-nowrap text-h4 text-ink/70"
                      >
                        {person.name}
                        <span className="mx-7 inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            {/* The accessible copy of the same list — the ticker above is
                decorative, this is what a screen reader announces. */}
            <ul className="sr-only">
              {alsoFeatured.map((person) => (
                <li key={person.id}>
                  {person.name} — featured in LEGEND
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Credibility guard — PROJECT_CONTEXT.md */}
        <p className="mt-8 text-caption text-muted/80">{copy.disclaimer}</p>
      </div>
    </section>
  );
}
