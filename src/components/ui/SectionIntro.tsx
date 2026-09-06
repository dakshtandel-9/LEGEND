import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { EditorialRule } from "./EditorialRule";

type Tone = "light" | "dark";

type SectionLabelProps = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
};

/**
 * The uppercase eyebrow that opens each section — "FROM THE PAGES OF LEGEND",
 * "EDITOR'S SELECTION" (04-visual-direction.md).
 *
 * The gold tick before the text is the one piece of decoration allowed to
 * repeat; it reads as an issue marker rather than an icon.
 */
export function SectionLabel({
  children,
  tone = "light",
  className = "",
}: SectionLabelProps) {
  return (
    <p
      className={`label flex items-center gap-3 ${
        tone === "dark" ? "text-gold-soft" : "text-muted"
      } ${className}`}
    >
      <span aria-hidden="true" className="inline-block h-px w-6 bg-gold" />
      {children}
    </p>
  );
}

type SectionIntroProps = {
  label: string;
  heading: ReactNode;
  intro?: string;
  tone?: Tone;
  /** Right-hand slot for a CTA that belongs on the heading line. */
  aside?: ReactNode;
  className?: string;
  /** Headings render as h2 by default; the hero supplies the single h1. */
  headingId?: string;
};

/**
 * Label → rule → heading → intro. Repeating this exact opening across every
 * section is what gives the page its editorial rhythm (03-design-principles.md
 * #5, "clear hierarchy"), so it is one component rather than nine variations.
 */
export function SectionIntro({
  label,
  heading,
  intro,
  tone = "light",
  aside,
  className = "",
  headingId,
}: SectionIntroProps) {
  const dark = tone === "dark";

  return (
    <div className={className}>
      <Reveal>
        <SectionLabel tone={tone}>{label}</SectionLabel>
      </Reveal>

      <EditorialRule tone={dark ? "dark" : "default"} className="mt-6" />

      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
        <Reveal delay={80} className="max-w-3xl">
          <h2
            id={headingId}
            className={`text-h2 ${dark ? "text-ink-heading" : "text-ink"}`}
          >
            {heading}
          </h2>
        </Reveal>

        {aside ? (
          <Reveal delay={160} className="shrink-0">
            {aside}
          </Reveal>
        ) : null}
      </div>

      {intro ? (
        <Reveal delay={140}>
          <p
            className={`measure mt-7 text-lead ${
              dark ? "text-ink-body" : "text-muted"
            }`}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
