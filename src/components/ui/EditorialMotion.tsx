"use client";

import { useEffect, useRef } from "react";

/** Progressive enhancement: content is visible until observers are available.
 * One scheduled frame per scroll event; no scroll interception or render loop.
 */
export function EditorialMotion() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".editorial-home");
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 700px)");
    let dispose = () => {};

    const setup = () => {
      dispose();
      const reveals = Array.from(root.querySelectorAll<HTMLElement>("[data-motion]"));
      const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
      if (preference.matches || !("IntersectionObserver" in window)) {
        reveals.forEach((element) => { element.dataset.motionState = "visible"; });
        return;
      }

      let frame = 0;
      const active = new Set<HTMLElement>();
      const reveal = (element: HTMLElement) => {
        element.dataset.motionState = "visible";
        revealObserver.unobserve(element);
      };
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        });
      }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });

      reveals.forEach((element) => {
        // Never hide content already in view, including restored scroll positions.
        if (element.getBoundingClientRect().top < window.innerHeight - 24) {
          element.dataset.motionState = "visible";
        } else {
          element.dataset.motionState = "pending";
          revealObserver.observe(element);
        }
      });

      const update = () => {
        frame = 0;
        const height = window.innerHeight;
        const total = document.documentElement.scrollHeight - height;
        const fraction = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
        progressRef.current?.style.setProperty("--reading-progress", String(fraction));
        // Read every rect before writing styles to avoid repeated layout flushes.
        const positions = Array.from(active, (element) => {
          const box = (element.parentElement ?? element).getBoundingClientRect();
          return {
            element,
            position: Math.max(-1, Math.min(1, (height / 2 - box.top - box.height / 2) / ((height + box.height) / 2))),
            // Stay inside the overscan even on short tablet/landscape panels.
            travel: Math.min(compact.matches ? 10 : 26, box.height * (compact.matches ? 0.025 : 0.05)),
          };
        });
        positions.forEach(({ element, position, travel }) => {
          if (element.dataset.parallax === "image") {
            element.style.setProperty("--parallax-y", `${(position * travel).toFixed(2)}px`);
          } else {
            element.style.setProperty("--parallax-turn", `${(position * 45).toFixed(2)}deg`);
          }
        });
      };
      const schedule = () => {
        if (!frame && !document.hidden) frame = requestAnimationFrame(update);
      };
      const layerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) active.add(element);
          else active.delete(element);
          element.toggleAttribute("data-parallax-active", entry.isIntersecting);
        });
        schedule();
      }, { rootMargin: "120px" });
      layers.forEach((element) => layerObserver.observe(element));

      const focusReveal = (event: FocusEvent) => {
        let element = event.target instanceof Element ? event.target : null;
        while (element && root.contains(element)) {
          if (element instanceof HTMLElement && element.hasAttribute("data-motion")) reveal(element);
          element = element.parentElement;
        }
      };
      const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
      resizeObserver?.observe(document.body);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      window.addEventListener("pageshow", schedule);
      document.addEventListener("visibilitychange", schedule);
      root.addEventListener("focusin", focusReveal);
      root.dataset.motionReady = "true";
      progressRef.current?.setAttribute("data-active", "true");
      schedule();

      dispose = () => {
        cancelAnimationFrame(frame);
        revealObserver.disconnect();
        layerObserver.disconnect();
        resizeObserver?.disconnect();
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        window.removeEventListener("pageshow", schedule);
        document.removeEventListener("visibilitychange", schedule);
        root.removeEventListener("focusin", focusReveal);
        delete root.dataset.motionReady;
        reveals.forEach((element) => { delete element.dataset.motionState; });
        layers.forEach((element) => {
          element.style.removeProperty("--parallax-y");
          element.style.removeProperty("--parallax-turn");
          element.removeAttribute("data-parallax-active");
        });
        progressRef.current?.removeAttribute("data-active");
      };
    };

    setup();
    preference.addEventListener("change", setup);
    return () => { preference.removeEventListener("change", setup); dispose(); };
  }, []);

  return <div ref={progressRef} className="reading-progress" aria-hidden="true" />;
}
