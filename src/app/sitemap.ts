import type { MetadataRoute } from "next";
import { issues } from "@/data/issues";
import { SITE_URL } from "@/lib/constants";

/**
 * Sitemap — 20-seo-plan.md.
 *
 * Phase one is a single route (13-information-architecture.md), so the map is
 * the homepage plus the edition PDFs, which are public, cleanly named and
 * worth indexing in their own right.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...issues.map((issue) => ({
      url: `${SITE_URL}${issue.pdf}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
