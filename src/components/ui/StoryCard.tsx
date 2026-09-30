import Image from "next/image";
import { TrackedLink } from "./TrackedLink";
import { getIssueById } from "@/lib/content";
import { site } from "@/data/site";
import type { Story } from "@/data/types";

type StoryCardProps = {
  story: Story;
  /** Drives the crop and type scale, matching the three grid slots. */
  variant?: "lead" | "secondary" | "supporting";
};

const RATIO: Record<NonNullable<StoryCardProps["variant"]>, string> = {
  lead: "aspect-[16/10]",
  secondary: "aspect-[3/4]",
  supporting: "aspect-[4/3]",
};

const SIZES: Record<NonNullable<StoryCardProps["variant"]>, string> = {
  lead: "(max-width: 1024px) 100vw, 58vw",
  secondary: "(max-width: 1024px) 100vw, 36vw",
  supporting: "(max-width: 768px) 100vw, (max-width: 1280px) 46vw, 30vw",
};

/**
 * A story in the "Stories That Matter" grid.
 *
 * Phase one has no /stories/[slug] route (13-information-architecture.md), so
 * the card links into the on-site edition reader — "View in Edition"
 * from the copy deck, rather than a "Read more" that leads nowhere.
 */
export function StoryCard({ story, variant = "supporting" }: StoryCardProps) {
  const issue = getIssueById(story.issueId);
  const isLead = variant === "lead";

  return (
    <article className="group flex h-full flex-col">
      <TrackedLink
        href={issue?.reader ?? "#editions"}
        event="story_card_click"
        payload={{ story_id: story.id, issue_id: story.issueId }}
        aria-label={`${story.title} — ${site.copy.stories.cta}, ${
          issue ? issue.title : "LEGEND"
        }. Read the edition online.`}
        className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <div className={`frame frame-hover w-full ${RATIO[variant]}`}>
          <Image
            src={story.image}
            alt={story.imageAlt}
            fill
            sizes={SIZES[variant]}
            className="object-cover"
          />
        </div>

        <div className={`flex flex-1 flex-col ${isLead ? "mt-8" : "mt-6"}`}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="label text-gold">{story.category}</span>
            {story.pageLabel ? (
              <>
                <span aria-hidden="true" className="h-px w-4 bg-line" />
                <span className="label text-muted">{story.pageLabel}</span>
              </>
            ) : null}
          </div>

          <h3
            className={`mt-4 text-ink transition-colors duration-200 group-hover:text-gold ${
              isLead ? "text-h3" : variant === "secondary" ? "text-h4" : "text-h4"
            }`}
          >
            {story.title}
          </h3>

          {story.subject ? (
            <p className="mt-3 text-caption uppercase tracking-[0.1em] text-muted">
              {story.subject}
            </p>
          ) : null}

          <p
            className={`mt-4 text-muted ${
              isLead ? "measure text-lead" : "text-body"
            }`}
          >
            {story.excerpt}
          </p>

          <span className="mt-auto inline-flex items-center gap-2 pt-7 label text-ink">
            {site.copy.stories.cta}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 ease-[var(--ease-editorial)] group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </span>
        </div>
      </TrackedLink>
    </article>
  );
}
