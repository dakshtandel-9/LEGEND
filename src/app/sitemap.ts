import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * Sitemap — 20-seo-plan.md.
 *
 * The site is a single landing page.
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
  ];
}
