import Image from "next/image";
import { TrackedLink } from "./TrackedLink";
import { getIssueById } from "@/lib/content";
import type { Person } from "@/data/types";

type PersonCardProps = {
  person: Person;
  /** "lead" is the single large portrait; "compact" fills the supporting column. */
  variant?: "lead" | "compact";
  priority?: boolean;
};

/**
 * A portrait card for the "Featured in LEGEND" grid.
 *
 * Wording is load-bearing here. The card states the category and the edition
 * the person appeared in — never "interviewed by" or "exclusive"
 * (02-brand-analysis.md, credibility rule). The link destination is the
 * edition itself, which is the only claim the site can actually support.
 */
export function PersonCard({
  person,
  variant = "compact",
  priority = false,
}: PersonCardProps) {
  const issue = getIssueById(person.issueId);
  const lead = variant === "lead";

  const meta = [person.role, person.organisation].filter(Boolean).join(", ");
  const issueRef = issue ? `Issue ${issue.issueNumber} · ${issue.title}` : "";

  return (
    <article className="group h-full">
      <TrackedLink
        href={issue?.reader ?? "#editions"}
        event="featured_person_click"
        payload={{ person_id: person.id, issue_id: person.issueId }}
        aria-label={`${person.name} — featured in LEGEND ${issueRef}. Read the edition online.`}
        className="block h-full focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <div className="frame frame-hover aspect-[4/5] w-full">
          <Image
            src={person.image}
            alt={person.imageAlt}
            fill
            priority={priority}
            sizes={
              lead
                ? "(max-width: 768px) 88vw, (max-width: 1280px) 46vw, 38vw"
                : "(max-width: 768px) 62vw, (max-width: 1280px) 30vw, 18vw"
            }
            className="object-cover"
          />
        </div>

        <div className={lead ? "mt-7" : "mt-5"}>
          <p className="label text-gold">{person.category}</p>

          <h3
            className={`mt-3 text-ink ${
              lead ? "text-h3" : "text-h4"
            } transition-colors duration-200 group-hover:text-gold`}
          >
            {person.name}
          </h3>

          {meta ? (
            <p className="mt-2 text-caption text-muted">{meta}</p>
          ) : null}

          <p className="mt-3 text-caption text-muted/80">
            Featured in {issueRef}
          </p>
        </div>
      </TrackedLink>
    </article>
  );
}
