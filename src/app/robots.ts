import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * robots.txt — 20-seo-plan.md.
 *
 * Everything is public. There is no admin area, no auth and no API surface to
 * exclude (17-technical-architecture.md), so this stays deliberately plain.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
