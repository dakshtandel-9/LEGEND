"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { site } from "@/data/site";
import { hasStoryForm, storyFormHref } from "@/lib/constants";

/**
 * Masthead and primary navigation.
 *
 * Behaviour from 14-section-specification.md: sits transparently on the hero,
 * then compacts to an opaque bar with a 1px divider once the page scrolls.
 *
 * The mobile drawer implements the full requirement in 21-accessibility.md —
 * focus moves into the drawer on open, Tab is trapped inside it, Escape
 * closes, and focus returns to the trigger.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* --- Sticky/compact state ----------------------------------------------
     A passive listener reading a single boolean is cheap; the alternative
     (an observer on a sentinel) buys nothing here.                        */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  /* --- Drawer: scroll lock, Escape, focus trap ---------------------------- */
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    // Move focus into the drawer so the next Tab stays inside it.
    const focusables = () =>
      Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusables();
      const first = items[0];
      const last = items.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <header
      className={`editorial-header fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-[var(--ease-editorial)] ${
        scrolled || open
          ? "border-b border-line bg-paper/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell">
        <div
          className={`flex items-center justify-between gap-8 transition-[height] duration-300 ease-[var(--ease-editorial)] ${
            scrolled ? "h-16" : "h-20 md:h-24"
          }`}
        >
          {/* Masthead */}
          <a
            href="#top"
            aria-label={`${site.brand.name} — back to top`}
            className="flex shrink-0 items-center"
          >
            <Wordmark size={scrolled ? "sm" : "md"} />
          </a>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="label relative inline-flex min-h-[2.75rem] items-center text-ink/75 transition-colors duration-200 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Primary CTA — 12-copy-deck.md */}
            <TrackedLink
              href={storyFormHref}
              external={hasStoryForm}
              event="pitch_story_click"
              payload={{ location: "header" }}
              className="hidden min-h-[2.625rem] items-center bg-ink px-6 label text-paper transition-colors duration-200 hover:bg-gold hover:text-ink sm:inline-flex"
            >
              {site.copy.hero.secondaryCta}
            </TrackedLink>

            {/* Drawer trigger */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => (open ? close() : setOpen(true))}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">
                {open ? "Close menu" : "Open menu"}
              </span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 block h-px w-6 bg-ink transition-transform duration-300 ease-[var(--ease-editorial)] ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 bg-ink transition-transform duration-300 ease-[var(--ease-editorial)] ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        hidden={!open}
        className="border-t border-line bg-paper lg:hidden"
      >
        <nav aria-label="Mobile" className="shell py-8">
          <ul className="flex flex-col">
            {site.nav.map((item) => (
              <li key={item.href} className="border-b border-line/70">
                <a
                  href={item.href}
                  onClick={close}
                  className="flex min-h-[3.5rem] items-center justify-between text-h4 text-ink"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-gold">
                    &rarr;
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <TrackedLink
            href={storyFormHref}
            external={hasStoryForm}
            event="pitch_story_click"
            payload={{ location: "mobile_menu" }}
            onClick={close}
            className="mt-8 flex min-h-[3.25rem] w-full items-center justify-center bg-ink px-6 label text-paper"
          >
            {site.copy.hero.secondaryCta}
          </TrackedLink>

          <p className="mt-6 text-caption text-muted">
            {site.brand.tagline}
          </p>
        </nav>
      </div>
    </header>
  );
}
