import Image from "next/image";
import { TrackedLink } from "./TrackedLink";
import { accentColor } from "@/lib/constants";
import { site } from "@/data/site";
import type { Issue } from "@/data/types";

type IssueCardProps = {
  issue: Issue;
  /** The newest edition gets the "Latest edition" flag and image priority. */
  isLatest?: boolean;
};

/**
 * One edition.
 *
 * The issue accent (May lime, September cyan) lives *inside* this card and nowhere
 * else on the page — 03-design-principles.md #6 keeps the master brand stable
 * while letting each edition keep its own colour. Adding a new issue with a new
 * accent needs no component change, only a token in constants.ts.
 */
export function IssueCard({ issue, isLatest = false }: IssueCardProps) {
  const accent = accentColor(issue.accent);
  const pdfLabel = `Open ${issue.title} Edition (PDF)`;

  return (
    <article
      className="group flex h-full flex-col border-t border-line pt-8"
      style={{ borderTopColor: accent }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="label text-muted">
          Issue {issue.issueNumber}
          <span aria-hidden="true" className="mx-2 text-line">
            /
          </span>
          {issue.title}
        </p>

        {isLatest ? (
          <span
            className="label px-2.5 py-1 text-ink"
            style={{ backgroundColor: accent }}
          >
            Latest
          </span>
        ) : null}
      </div>

      <TrackedLink
        href={issue.pdf}
        external
        event="issue_open"
        payload={{ issue_id: issue.id, kind: "view" }}
        aria-label={pdfLabel}
        className="mt-8 block focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {/* Covers keep their printed proportion (08-imagery-guidelines.md). */}
        <div className="frame frame-hover aspect-[3/4] w-full max-w-md shadow-[0_18px_45px_-28px_rgba(21,21,21,0.55)]">
          <Image
            src={issue.cover}
            alt={issue.coverAlt}
            fill
            priority={isLatest}
            sizes="(max-width: 768px) 86vw, (max-width: 1280px) 44vw, 32vw"
            className="object-cover"
          />
        </div>
      </TrackedLink>

      <h3 className="mt-8 text-h3 text-ink">
        {issue.month}{" "}
        <span className="text-muted">{issue.year}</span>
      </h3>

      <p className="measure mt-4 text-body text-muted">{issue.description}</p>

      {issue.featuredNames.length > 0 ? (
        <div className="mt-7">
          <p className="label text-muted/70">Inside this edition</p>
          <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
            {issue.featuredNames.map((name, index) => (
              <li key={name} className="text-caption text-ink">
                {name}
                {index < issue.featuredNames.length - 1 ? (
                  <span aria-hidden="true" className="ml-2 text-line">
                    ·
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-4 pt-9">
        <TrackedLink
          href={issue.pdf}
          external
          event="issue_open"
          payload={{ issue_id: issue.id, kind: "view" }}
          aria-label={pdfLabel}
          className="group/link inline-flex min-h-[2.75rem] items-center gap-2 label text-ink border-b border-ink/25 transition-colors duration-200 hover:border-gold hover:text-gold"
        >
          {site.copy.editions.primaryCta}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 ease-[var(--ease-editorial)] group-hover/link:translate-x-1"
          >
            &rarr;
          </span>
        </TrackedLink>

        {/* Same file, different intent: read in the browser vs. keep a copy. */}
        <TrackedLink
          href={issue.pdf}
          download
          event="issue_open"
          payload={{ issue_id: issue.id, kind: "pdf" }}
          aria-label={`Download ${issue.title} Edition (PDF)`}
          className="inline-flex min-h-[2.75rem] items-center label text-muted transition-colors duration-200 hover:text-ink"
        >
          {site.copy.editions.secondaryCta}
        </TrackedLink>
      </div>
    </article>
  );
}
