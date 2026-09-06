import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // All imagery is first-party and served from /public. No remote patterns
    // are configured on purpose — the project has no external image sources.
    formats: ["image/avif", "image/webp"],

    // The launch placeholders in /public/images are SVG. Next's optimizer
    // refuses SVG unless explicitly allowed, so it is enabled here and locked
    // down with a sandboxed CSP. Once real WebP/AVIF photography replaces the
    // placeholders, these three lines can be deleted.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
