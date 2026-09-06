import type { ReactNode } from "react";
import { TrackedLink } from "./TrackedLink";
import type { AnalyticsEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "onDark" | "onDarkGhost" | "link";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  event?: AnalyticsEvent;
  payload?: Record<string, string | number | boolean | undefined>;
  className?: string;
  /** Overrides the accessible name when the label alone is ambiguous. */
  ariaLabel?: string;
};

/**
 * Every call to action on the page. Rectangular, not pill-shaped — 04-visual
 * -direction.md is explicit that rounded media/CTA shapes read as SaaS.
 *
 * All variants clear the 44px touch target from 21-accessibility.md.
 */
const BASE =
  "inline-flex items-center justify-center gap-2.5 min-h-[2.875rem] px-7 " +
  "label transition-colors duration-200 ease-[var(--ease-editorial)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-3";

const VARIANTS: Record<Variant, string> = {
  primary: `${BASE} bg-ink text-paper hover:bg-gold hover:text-ink`,
  secondary: `${BASE} border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper`,
  onDark: `${BASE} bg-paper text-ink hover:bg-gold hover:text-ink`,
  onDarkGhost: `${BASE} border border-paper/30 text-paper hover:border-gold hover:text-gold`,
  link:
    "group/link inline-flex items-center gap-2 label text-ink " +
    "border-b border-ink/25 pb-1 transition-colors duration-200 " +
    "hover:border-gold hover:text-gold",
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  event,
  payload,
  className = "",
  ariaLabel,
}: ButtonProps) {
  return (
    <TrackedLink
      href={href}
      external={external}
      event={event}
      payload={payload}
      aria-label={ariaLabel}
      className={`${VARIANTS[variant]} ${className}`}
    >
      {children}
      {variant === "link" ? (
        <span
          aria-hidden="true"
          className="translate-x-0 transition-transform duration-200 ease-[var(--ease-editorial)] group-hover/link:translate-x-1"
        >
          &rarr;
        </span>
      ) : null}
    </TrackedLink>
  );
}
