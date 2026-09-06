import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { getLatestIssue } from "@/lib/content";
import { ANCHORS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * 404.
 *
 * Phase one is a single route, so this is only reachable from a stale or
 * mistyped link — most likely a moved edition PDF. It stays on-brand and
 * points at the two things a lost visitor actually wants: the latest edition
 * and the homepage (25-launch-checklist.md, "check 404s").
 */
export default function NotFound() {
  const latest = getLatestIssue();

  return (
    <section className="section bg-paper pt-40">
      <div className="shell">
        <p className="label flex items-center gap-3 text-muted">
          <span aria-hidden="true" className="inline-block h-px w-6 bg-gold" />
          Error 404
        </p>

        <h1 className="mt-8 max-w-3xl text-h2 text-ink">
          This page has gone to print.
        </h1>

        <p className="measure mt-7 text-lead text-muted">
          The page you were looking for is not here. The latest edition of{" "}
          {site.brand.name} is, along with everything else on the homepage.
        </p>

        <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button href="/" variant="primary">
            Back to {site.brand.name}
          </Button>

          <Button
            href={latest.pdf}
            external
            variant="secondary"
            event="issue_open"
            payload={{ issue_id: latest.id, kind: "view", location: "404" }}
            ariaLabel={`Open ${latest.title} Edition (PDF)`}
          >
            Read Issue {latest.issueNumber}
          </Button>
        </div>

        <p className="mt-14 border-t border-line pt-6 text-caption text-muted">
          Looking for something specific?{" "}
          <a
            href={`/#${ANCHORS.editions}`}
            className="text-ink underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-gold hover:decoration-gold"
          >
            Browse the editions
          </a>{" "}
          or write to{" "}
          <a
            href={`mailto:${site.contact.editorialEmail}`}
            className="text-ink underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-gold hover:decoration-gold"
          >
            {site.contact.editorialEmail}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
