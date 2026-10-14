import { stories } from "./stories";
import type { Person } from "./types";

/**
 * People pictured on the homepage, derived from `stories` so names, images
 * and rights flags have one source. Read by the Person selectors in
 * src/lib/content.ts.
 */
export const people: Person[] = stories.map((story) => ({
  id: story.id,
  name: story.subject ?? story.title,
  image: story.image,
  imageAlt: story.imageAlt,
  category: story.category,
  issueId: story.issueId,
  featured: story.placement !== "diary",
  status: story.status,
}));
