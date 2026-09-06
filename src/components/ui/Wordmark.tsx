import Image from "next/image";
import { site } from "@/data/site";

type WordmarkProps = {
  /** Controls the optical size of the masthead. */
  size?: "sm" | "md" | "lg";
  tone?: "ink" | "paper";
  className?: string;
};

const SIZE: Record<NonNullable<WordmarkProps["size"]>, string> = {
  sm: "text-[1.05rem] tracking-[0.28em]",
  md: "text-[1.35rem] tracking-[0.3em]",
  lg: "text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.26em]",
};

const PIXEL_HEIGHT: Record<NonNullable<WordmarkProps["size"]>, number> = {
  sm: 20,
  md: 26,
  lg: 44,
};

/**
 * The LEGEND masthead.
 *
 * 06-typography.md: use the official logo asset and do not recreate the
 * masthead in a web font *if the real asset is available*. It is not yet
 * (15-asset-inventory.md lists it as outstanding), so this type-sets the name
 * in the display serif as an interim. Drop the SVG into
 * /public/images/brand/ and set `site.brand.logo` — every masthead on the
 * page switches over, header and footer included, with no other change.
 */
export function Wordmark({
  size = "md",
  tone = "ink",
  className = "",
}: WordmarkProps) {
  if (site.brand.logo) {
    return (
      <Image
        src={site.brand.logo}
        alt={site.brand.name}
        height={PIXEL_HEIGHT[size]}
        width={PIXEL_HEIGHT[size] * 5}
        priority
        className={`h-auto w-auto ${className}`}
        style={{ height: PIXEL_HEIGHT[size] }}
      />
    );
  }

  return (
    <span
      className={`font-[family-name:var(--font-display)] font-medium uppercase leading-none ${
        SIZE[size]
      } ${tone === "paper" ? "text-paper" : "text-ink"} ${className}`}
    >
      {site.brand.name}
    </span>
  );
}
