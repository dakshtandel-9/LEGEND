"use client";

import { useEffect, useId, useRef } from "react";

const INTRO_DURATION = 2200;
const REPLAY_EVENT = "legend:replay-intro";

/** A finite, skippable brand introduction, independent of network loading.
 * A closed server-rendered dialog never blocks a no-JavaScript visit.
 */
export function TelevisionIntro() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const finishRef = useRef<() => void>(() => {});
  const id = useId().replaceAll(":", "");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || typeof dialog.showModal !== "function") return;
    const root = document.documentElement;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    let active = false;
    let attempted = false;
    let previousOverflow = "";
    let previousGutter = "";

    const finish = () => {
      if (!active) return;
      active = false;
      clearTimeout(timer);
      dialog.close();
      delete dialog.dataset.playing;
      root.classList.remove("tv-intro-running");
      root.style.overflow = previousOverflow;
      root.style.scrollbarGutter = previousGutter;
    };
    finishRef.current = finish;

    const play = () => {
      if (active || document.hidden) return;
      previousOverflow = root.style.overflow;
      previousGutter = root.style.scrollbarGutter;
      // Native dialog supplies focus containment and makes the page inert.
      dialog.showModal();
      active = true;
      // A reserved scrollbar gutter clips the full-screen wordmark on phones.
      root.style.scrollbarGutter = "auto";
      root.style.overflow = "hidden";
      root.classList.add("tv-intro-running");
      dialog.dataset.playing = "true";
      timer = setTimeout(finish, INTRO_DURATION);
    };
    const autoPlay = () => {
      if (attempted || document.hidden) return;
      attempted = true;
      if (preference.matches) return;
      play();
    };
    const cancel = (event: Event) => { event.preventDefault(); finish(); };
    const visibility = () => { if (document.hidden) finish(); else autoPlay(); };
    const preferenceChange = () => { if (preference.matches) finish(); };

    dialog.addEventListener("cancel", cancel);
    window.addEventListener(REPLAY_EVENT, play);
    document.addEventListener("visibilitychange", visibility);
    preference.addEventListener("change", preferenceChange);
    autoPlay();
    return () => {
      finish();
      dialog.removeEventListener("cancel", cancel);
      window.removeEventListener(REPLAY_EVENT, play);
      document.removeEventListener("visibilitychange", visibility);
      preference.removeEventListener("change", preferenceChange);
      finishRef.current = () => {};
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="tv-intro" aria-label="Welcome to LEGEND" aria-describedby={`${id}-description`}>
      <p id={`${id}-description`} className="sr-only">A two-second animated introduction. Press Escape or Skip intro to enter the magazine.</p>
      <div className="tv-shutters" aria-hidden="true"><i /><i /><i /><i /></div>
      <button className="tv-skip" type="button" onClick={() => finishRef.current()}>Skip intro</button>
      <div className="tv-signal" aria-hidden="true">
        <div className="tv-programme"><div className="tv-wordmark">LEGEND</div></div>
      </div>
    </dialog>
  );
}

export function ReplayIntro() {
  return <button className="intro-replay" type="button" onClick={() => window.dispatchEvent(new Event(REPLAY_EVENT))}>Replay intro <span aria-hidden="true">↗</span></button>;
}
