import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { IssueCard } from "@/components/ui/IssueCard";
import { site } from "@/data/site";
import { getIssuesNewestFirst, getLatestIssue } from "@/lib/content";
import { ANCHORS } from "@/lib/constants";

/**
 * "The Latest Editions" — 14-section-specification.md #04.
 *
 * Two large issue cards at launch, newest first. Nothing here loads a PDF:
 * the covers are optimised images and the files are only fetched when a
 * visitor clicks (22-performance-budget.md).
 */
export function Editions() {
  const editions = getIssuesNewestFirst();
  const latest = getLatestIssue();
  const { editions: copy } = site.copy;

  return (
    <section
      id={ANCHORS.editions}
      className="section bg-paper"
      aria-labelledby="editions-heading"
    >
      <div className="shell">
        <SectionIntro
          label={copy.eyebrow}
          heading={copy.heading}
          intro={copy.intro}
          headingId="editions-heading"
        />

        <div className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-2 lg:mt-20 lg:gap-x-20">
          {editions.map((issue, index) => (
            <Reveal key={issue.id} variant="image" delay={index * 90}>
              <IssueCard issue={issue} isLatest={issue.id === latest.id} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
