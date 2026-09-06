"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { site } from "@/data/site";
import { verticals } from "@/data/verticals";
import { ANCHORS } from "@/lib/constants";

/**
 * "What We Cover" — 14-section-specification.md #08.
 *
 * A large annotated text list, not a grid of icon cards. Hovering a vertical
 * swaps the sticky image panel beside it on desktop; on mobile the panel is
 * dropped entirely rather than shrunk to a thumbnail.
 *
 * Accessibility note: hover is pure enhancement here. Every label and
 * description is always rendered and always visible, so nothing is gated
 * behind a pointer — which is why the rows are plain list items and not
 * buttons that would announce a state change with no content behind it.
 */
export function EditorialVerticals() {
  const [activeIndex, setActiveIndex] = useState(0);
  const copy = site.copy.verticals;
  const active = verticals[activeIndex] ?? verticals[0];

  return (
    <section
      id={ANCHORS.verticals}
      className="section bg-paper"
      aria-labelledby="verticals-heading"
    >
      <div className="shell">
        <SectionIntro
          label={copy.eyebrow}
          heading={copy.heading}
          headingId="verticals-heading"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---------- The list ---------- */}
          <ol className="lg:col-span-7">
            {verticals.map((vertical, index) => (
              <li
                key={vertical.id}
                onMouseEnter={() => setActiveIndex(index)}
                className={`group border-t border-line py-7 transition-colors duration-300 ${
                  index === verticals.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="flex items-baseline gap-5 sm:gap-7">
                  <span
                    aria-hidden="true"
                    className={`w-8 shrink-0 label transition-colors duration-300 ${
                      index === activeIndex ? "text-gold" : "text-muted/50"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3
                      className={`text-h3 transition-colors duration-300 ${
                        index === activeIndex ? "text-gold" : "text-ink"
                      }`}
                    >
                      {vertical.label}
                    </h3>
                    <p className="measure mt-3 text-body text-muted">
                      {vertical.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* ---------- Sticky image panel (desktop only) ---------- */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32">
              <div className="frame aspect-[4/5] w-full">
                {active ? (
                  <Image
                    // Keying on the id remounts the element so the crossfade
                    // restarts cleanly on every change.
                    key={active.id}
                    src={active.image}
                    alt={active.imageAlt}
                    fill
                    sizes="40vw"
                    className="animate-[fade-in_500ms_var(--ease-editorial)] object-cover"
                  />
                ) : null}
              </div>

              {active ? (
                <p className="mt-5 flex items-center gap-3 text-caption text-muted">
                  <span
                    aria-hidden="true"
                    className="inline-block h-px w-6 bg-gold"
                  />
                  {active.label}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
