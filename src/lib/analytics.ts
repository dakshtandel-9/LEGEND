/**
 * Outbound-click tracking — 23-analytics-events.md.
 *
 * Deliberately dependency-free. The page ships no analytics vendor of its own;
 * this helper simply hands the event to whatever the client eventually
 * installs (GA4 via gtag, GTM via dataLayer, or Vercel Analytics) and is a
 * silent no-op until one of them exists. That keeps the third-party JS budget
 * at zero for launch (22-performance-budget.md) without having to retrofit
 * call sites later.
 *
 * Note the Google Forms limitation from 23-analytics-events.md: we can measure
 * the outbound click reliably, but not the submission itself.
 */

/** The complete event vocabulary. A union keeps typos out of the funnel. */
export type AnalyticsEvent =
  | "hero_latest_issue_click"
  | "hero_pitch_story_click"
  | "featured_person_click"
  | "issue_may_open"
  | "issue_september_open"
  | "issue_open"
  | "story_card_click"
  | "developers_diary_click"
  | "pitch_story_click"
  | "partnership_click"
  | "instagram_click"
  | "email_click";

type EventPayload = Record<string, string | number | boolean | undefined>;

type GtagWindow = Window & {
  gtag?: (command: "event", name: string, params?: EventPayload) => void;
  dataLayer?: Array<Record<string, unknown>>;
  va?: (command: "event", params: Record<string, unknown>) => void;
};

export function track(event: AnalyticsEvent, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;

  const w = window as GtagWindow;

  try {
    w.gtag?.("event", event, payload);
    w.dataLayer?.push({ event, ...payload });
    w.va?.("event", { name: event, data: payload });
  } catch {
    // Analytics must never break a navigation. Swallow and move on.
  }
}

/**
 * Per-issue open events. Unknown editions fall back to a generic `issue_open`
 * carrying the id.
 */
export function trackIssueOpen(issueId: string, kind: "view" | "pdf"): void {
  const named: Record<string, AnalyticsEvent> = {
    "may-2026": "issue_may_open",
    "september-2026": "issue_september_open",
  };

  track(named[issueId] ?? "issue_open", { issue_id: issueId, kind });
}
