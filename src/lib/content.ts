/**
 * Selectors over the local content files.
 *
 * Components ask for what they need through these helpers instead of slicing
 * arrays inline, so adding Issue 03 stays a data-only change
 * (19-content-maintenance.md) and the homepage curation rules live in one
 * readable place.
 */

import { contents } from "@/data/contents";
import { issues } from "@/data/issues";
import { people } from "@/data/people";
import { stories } from "@/data/stories";
import type { ContentsEntry, Issue, Person, Story } from "@/data/types";

/** Newest edition — the last entry in `issues`. */
export function getLatestIssue(): Issue {
  const latest = issues.at(-1);
  if (!latest) {
    throw new Error("src/data/issues.ts must contain at least one edition.");
  }
  return latest;
}

/** Editions newest-first, as the "Latest Editions" section presents them. */
export function getIssuesNewestFirst(): Issue[] {
  return [...issues].reverse();
}

export function getIssueById(id: string): Issue | undefined {
  return issues.find((issue) => issue.id === id);
}

/** The latest edition's cover story — the homepage's opening panel. */
export function getCoverStory(): Story {
  const story = stories.find((item) => item.placement === "cover");
  if (!story) {
    throw new Error("src/data/stories.ts needs one story with placement \"cover\".");
  }
  return story;
}

/** "Inside the issues" — illustrated features, in data order. */
export function getFeatureStories(): Story[] {
  return stories.filter((story) => story.placement === "feature");
}

/** Developers' Diary — one builder per edition, in data order. */
export function getDiaryStories(): Story[] {
  return stories.filter((story) => story.placement === "diary");
}

/** An edition's contents, in page order. */
export function getContents(issueId: string): ContentsEntry[] {
  return contents
    .filter((entry) => entry.issueId === issueId)
    .sort((a, b) => a.page - b.page);
}

/** Totals for the archive line under the founder's list. */
export function getArchiveStats(): { editions: number; profiles: number } {
  return { editions: issues.length, profiles: contents.length };
}

/**
 * Short issue reference for cards: "Issue 03 · September 2026".
 * Falls back to an empty string rather than rendering "undefined".
 */
export function issueLabel(issueId: string): string {
  const issue = getIssueById(issueId);
  return issue ? `Issue ${issue.issueNumber} · ${issue.title}` : "";
}

/** The five portraits in the editorial grid — first is the large lead. */
export function getFeaturedPeople(): Person[] {
  return people.filter((person) => person.featured);
}

/** Everyone else, shown as names in the ticker beneath the grid. */
export function getAlsoFeaturedPeople(): Person[] {
  return people.filter((person) => !person.featured);
}

/** People belonging to a given editorial vertical. */
export function getPeopleByCategory(category: string): Person[] {
  return people.filter((person) => person.category === category);
}

/**
 * The story grid, split into its three art-directed slots
 * (14-section-specification.md): a 7-column lead, a 5-column secondary and a
 * three-card row. Anything beyond the first five entries is intentionally
 * dropped from the homepage — the page stays curated.
 */
export function getStoryLayout(): {
  lead: Story;
  secondary: Story | undefined;
  supporting: Story[];
} {
  const lead = stories.find((story) => story.featured) ?? stories[0];
  if (!lead) {
    throw new Error("src/data/stories.ts must contain at least one story.");
  }

  const rest = stories.filter((story) => story.id !== lead.id);
  return {
    lead,
    secondary: rest[0],
    supporting: rest.slice(1, 4),
  };
}

/** Developers' Diary stories, newest edition first. */
export function getDevelopersDiaryStories(): Story[] {
  return stories.filter((story) => story.category === "Developers' Diary");
}

/** The two profile links shown beside the Developers' Diary copy. */
export function getDevelopersDiaryPeople(): Person[] {
  return getPeopleByCategory("Developers' Diary").slice(0, 2);
}
