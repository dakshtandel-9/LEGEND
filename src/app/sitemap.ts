import type { MetadataRoute } from "next";
import { issues } from "@/data/issues";
import { SITE_URL } from "@/lib/constants";

/**
 * Sitemap — 20-seo-plan.md.
 *
 * The homepage and on-site edition readers are all public pages.
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
      url: `${SITE_URL}${issue.reader}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
