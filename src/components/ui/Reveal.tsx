"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/lib/use-in-view";

type RevealProps = {
  children: ReactNode;
  /** Renders as this element so reveals never add stray wrapper divs. */
  as?: ElementType;
  /** "image" uses the slower, longer-travel curve from 09-motion-system.md. */
  variant?: "content" | "image";
  /** Stagger, in milliseconds. Keep under ~240ms total or it reads as slow. */
  delay?: number;
  className?: string;
};

/**
 * Opacity + translate reveal on scroll.
 *
 * The animation itself lives in globals.css against `[data-reveal]`, which
 * means `prefers-reduced-motion` is handled in one place and the element is
 * never left invisible. A <noscript> rule in layout.tsx covers JS being off.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "content",
  delay = 0,
  className,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-revealed={inView ? "true" : "false"}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
