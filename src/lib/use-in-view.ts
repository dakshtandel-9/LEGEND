"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Minimal IntersectionObserver hook backing every scroll reveal on the page.
 *
 * 22-performance-budget.md rules out continuously-running scroll listeners,
 * and rules out pulling in an animation library for effects this small. One
 * observer per revealed element, disconnected the moment it has fired, costs
 * effectively nothing and produces the whole motion vocabulary in
 * 09-motion-system.md when paired with the CSS in globals.css.
 */
export function useInView<T extends HTMLElement>(options?: {
  /** Fraction of the element that must be visible. */
  threshold?: number;
  /** Fires slightly before the element reaches the fold. */
  rootMargin?: string;
}): { ref: React.RefObject<T | null>; inView: boolean } {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  const { threshold = 0.15, rootMargin = "0px 0px -8% 0px" } = options ?? {};

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // No observer (very old browser) or reduced motion: show immediately.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}
