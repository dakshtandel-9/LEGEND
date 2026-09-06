# Editorial redesign

The homepage uses the supplied reference for bold typographic hierarchy, image panels, compact contents navigation, and solid color blocks. Colors come from the project's existing design palette: July cyan (#16BCD6), May lime (#D5E35B), editorial blue (#42579B), paper (#F5F2EA), and ink (#151515).

## Files
- `src/app/page.tsx`: the redesigned homepage, with cover story, contents, editions, selected stories, Developers' Diary, about, editorial categories, and contribution sections.
- `src/app/globals.css`: responsive editorial styles below the existing shared styles.
- `src/components/layout/Header.tsx`: existing accessible navigation with the new header styling.
- `src/components/layout/Footer.tsx`: oversized masthead and compact footer navigation.
- `src/data/issues.ts`: original cover image paths.
- `public/issues/`: copies of the actual supplied PDFs, replacing the previous placeholder PDFs.

## Original magazine assets
All new JPEG assets in `public/images/editorial/` come from the supplied files in `Magazine/`; no stock or generated portraits are used.
- `may-cover.jpg`: right-hand cover of the May PDF's first spread.
- `july-cover.jpg`: right-hand cover of the July PDF's first spread.
- `sanjeev.jpg`: embedded cover photograph from July, PDF page 1.
- `oberoi.jpg`: embedded photograph from July, PDF page 22.
- `kotak.jpg`: embedded photograph from July, PDF page 25.
- `courtside.jpg`: embedded photograph from July, PDF page 31.

Reading links use PDF page positions (spread numbers), not printed page labels. The feature selection is explicitly tied to July 2026 so adding a future edition does not redirect these stories to unrelated pages.

## Preview and checks
Use the normal `npm run dev`, `npm run build`, and `npm run verify` scripts. During redesign, port 3000 was already occupied by the previous preview, so the redesigned preview was run on port 3001.

The existing email and social configuration still needs the owner's confirmed values. Submission links retain the configured Google Forms destinations, with the existing email fallback when no form URL is set. The legacy content audit also reports unused placeholder records from the earlier layout; those assets are not rendered by this homepage.


## Motion and image loading
- `src/components/ui/EditorialMotion.tsx` coordinates one-shot section reveals, small image parallax, rotating asterisk details, and reading progress. It uses one reveal observer, one visibility observer, and scroll-triggered animation frames; it never intercepts native scrolling or runs a continuous animation loop.
- `src/components/ui/EditorialImage.tsx` retains Next.js image optimization and native lazy loading for below-fold images. The cover photo remains prioritized. Reserved image space, cached-image detection, a fading loading placeholder, and readable error states prevent empty or shifting panels.
- `src/app/motion.css` contains entrance, reveal, parallax, loading and hover effects. Reveal delays are 80–160ms; parallax travel is capped at 26px desktop and 10px mobile, further bounded by the panel's height.
- Motion respects `prefers-reduced-motion`, including changes made while the page is open. Content remains visible without JavaScript or IntersectionObserver, and keyboard focus reveals its containing panel immediately.
- Browser validation covers lazy/eager image behavior, scroll progress, parallax, one-time reveals, keyboard focus, live reduced-motion changes, mobile navigation, five screen widths, delayed/failed images, and no-JavaScript/observer fallbacks. No animation dependency was added.

## Television / LEGEND intro
- `TelevisionIntro.tsx` and `intro.css` add a 2.2-second, finite brand intro: an oversized LEGEND wordmark opens with a subtle CRT flicker, followed by four shutters opening toward the screen corners. The intro contains only the wordmark and its Skip control, using the magazine palette and CSS with no graphics, network requests or animation dependencies.
- It plays on every page load and refresh, including URLs with section anchors. No session-storage flag suppresses playback. The footer's Replay intro button can play it again. The timing is an intentional introduction, not a simulated network-loading percentage.
- A native dialog contains focus and makes background controls inert. Skip, Escape, timeout, tab hiding and live reduced-motion changes all release focus and scrolling. Cleanup handles React Strict Mode. Returning to the same tab without reloading does not replay the intro.
- Reduced-motion visitors skip the automatic intro; explicit replay shows a still wordmark. Without JavaScript, the dialog remains closed and the page stays accessible.
- Browser checks cover duration, repeated refreshes, anchor URLs, replay, focus and scroll restoration, small phones/landscape, full viewport coverage, paused-animation timeout, reduced motion, and no-JavaScript behavior.
