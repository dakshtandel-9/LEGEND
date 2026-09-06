"use client";

import { useInView } from "@/lib/use-in-view";

type EditorialRuleProps = {
  className?: string;
  /** Rules inside dark sections need the lighter hairline. */
  tone?: "default" | "dark" | "gold";
};

const TONE_CLASS: Record<NonNullable<EditorialRuleProps["tone"]>, string> = {
  default: "bg-line",
  dark: "bg-ink-line",
  gold: "bg-gold",
};

/**
 * The hairline divider that carries most of the page's print vocabulary.
 * Draws itself left-to-right on entry — 09-motion-system.md, effect 4.
 */
export function EditorialRule({
  className = "",
  tone = "default",
}: EditorialRuleProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <div
      ref={ref}
      role="presentation"
      data-revealed={inView ? "true" : "false"}
      className={`rule ${TONE_CLASS[tone]} ${className}`}
    />
  );
}
