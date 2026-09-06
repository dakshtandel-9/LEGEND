"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  event?: AnalyticsEvent;
  payload?: Record<string, string | number | boolean | undefined>;
  /** Opens in a new tab with the correct rel, and announces that to AT. */
  external?: boolean;
  children: ReactNode;
};

/**
 * The single anchor primitive used for every outbound and in-page link.
 *
 * Two jobs beyond a plain <a>:
 *  1. fires the named event from 23-analytics-events.md *before* navigation,
 *     which is the only reliable moment for a Google Forms outbound click;
 *  2. attaches target/rel and a visually-hidden "opens in a new tab" note for
 *     external destinations (21-accessibility.md).
 */
export function TrackedLink({
  href,
  event,
  payload,
  external = false,
  children,
  ...rest
}: TrackedLinkProps) {
  const externalProps = external
    ? { target: "_blank" as const, rel: "noreferrer noopener" }
    : {};

  return (
    <a
      href={href}
      {...externalProps}
      {...rest}
      onClick={(e) => {
        if (event) track(event, payload);
        rest.onClick?.(e);
      }}
    >
      {children}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
