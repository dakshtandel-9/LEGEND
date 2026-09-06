import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { EditorialRule } from "@/components/ui/EditorialRule";
import { Button } from "@/components/ui/Button";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { site } from "@/data/site";
import {
  getDevelopersDiaryPeople,
  getDevelopersDiaryStories,
  getIssueById,
  getLatestIssue,
} from "@/lib/content";
import { ANCHORS, accentColor } from "@/lib/constants";

/**
 * "Developers' Diary" — 14-section-specification.md #06.
 *
 * The recurring built-environment series, given a signature treatment: a
 * split section with the architectural image bleeding off the left edge
 * (07-grid-and-spacing.md permits selective bleed) against editorial copy and
 * two profile links.
 *
 * Note SOURCE_NOTES.md — "Developers" here means property and urban
 * development, not software. The visual language stays editorial; nothing on
 * this section should read as a property listing.
 */
export function DevelopersDiary() {
  const copy = site.copy.developersDiary;
  const profiles = getDevelopersDiaryPeople();
  const diaryStories = getDevelopersDiaryStories();

  // The CTA opens the most recent edition carrying a Developers' Diary
  // feature, falling back to the latest edition (12-copy-deck.md allows the
  // phase-one CTA to open the relevant issue instead of a separate page).
  const anchorStory = diaryStories.at(-1);
  const targetIssue =
    (anchorStory ? getIssueById(anchorStory.issueId) : undefined) ??
    getLatestIssue();

  const accent = accentColor(targetIssue.accent);

  return (
    <section
      id={ANCHORS.developersDiary}
      className="section-compact overflow-hidden bg-paper"
      aria-labelledby="diary-heading"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-0">
        {/* ---------- Visual, bled to the left edge ---------- */}
        <Reveal variant="image" className="lg:order-1">
          <div className="frame frame-hover aspect-[4/3] w-full lg:aspect-[5/6] lg:min-h-[34rem]">
            <Image
              src="/images/stories/developers-diary.svg"
              alt="Architectural photograph from LEGEND's Developers' Diary series"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* ---------- Editorial copy ---------- */}
        <div className="lg:order-2">
          <div className="mx-auto w-full max-w-2xl px-5 md:px-8 lg:px-14">
            <Reveal>
              <SectionLabel>{copy.eyebrow}</SectionLabel>
            </Reveal>

            <EditorialRule className="mt-6" />

            <Reveal delay={80}>
              <h2 id="diary-heading" className="mt-8 text-h2 text-ink">
                {copy.heading}
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-7 text-lead text-muted">{copy.body}</p>
            </Reveal>

            {/* Two profile links — 14-section-specification.md */}
            {profiles.length > 0 ? (
              <Reveal delay={200}>
                <ul className="mt-11 border-t border-line">
                  {profiles.map((person) => {
                    const issue = getIssueById(person.issueId);
                    return (
                      <li key={person.id} className="border-b border-line">
                        <TrackedLink
                          href={issue?.pdf ?? `#${ANCHORS.editions}`}
                          external={Boolean(issue?.pdf)}
                          event="developers_diary_click"
                          payload={{ person_id: person.id }}
                          aria-label={`${person.name} — Developers' Diary, ${
                            issue ? issue.title : "LEGEND"
                          }. Opens the edition PDF.`}
                          className="group flex min-h-[4.5rem] items-center justify-between gap-6 py-5"
                        >
                          <span>
                            <span className="block text-h4 text-ink transition-colors duration-200 group-hover:text-gold">
                              {person.name}
                            </span>
                            {issue ? (
                              <span className="mt-1.5 block text-caption text-muted">
                                Issue {issue.issueNumber} · {issue.title}
                              </span>
                            ) : null}
                          </span>

                          <span
                            aria-hidden="true"
                            className="shrink-0 text-gold transition-transform duration-200 ease-[var(--ease-editorial)] group-hover:translate-x-1"
                          >
                            &rarr;
                          </span>
                        </TrackedLink>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ) : null}

            <Reveal delay={260}>
              <div className="mt-11 flex flex-wrap items-center gap-6">
                <Button
                  href={targetIssue.pdf}
                  external
                  variant="primary"
                  event="developers_diary_click"
                  payload={{ issue_id: targetIssue.id, location: "section_cta" }}
                  ariaLabel={`${copy.cta} — open ${targetIssue.title} Edition (PDF)`}
                >
                  {copy.cta}
                </Button>

                {/* The one place an issue accent appears outside an issue card. */}
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-block h-2.5 w-2.5"
                    style={{ backgroundColor: accent }}
                  />
                  <span className="label text-muted">
                    Issue {targetIssue.issueNumber} · {targetIssue.title}
                  </span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
