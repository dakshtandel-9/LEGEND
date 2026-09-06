import { SectionLabel } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import {
  ANCHORS,
  hasPartnershipForm,
  partnershipFormHref,
} from "@/lib/constants";

/**
 * "Partnerships" — 14-section-specification.md #10.
 *
 * Commercial enquiries, and 16-google-forms-specification.md is emphatic that
 * this must not blend into editorial submissions: a different Google Form, a
 * different inbox, and a visibly different treatment. Where "Pitch Your Story"
 * is open white space and editorial serif, this is a bordered gold-framed
 * panel on paper — it reads as a rate-card conversation, not a pitch.
 */
export function Partnerships() {
  const copy = site.copy.partnerships;

  const offers = [
    { title: "Print advertising", note: "Placements across the monthly edition." },
    { title: "Branded content", note: "Clearly marked, editorially supervised." },
    { title: "Special editions", note: "Themed features and collaborations." },
    { title: "Event partnerships", note: "Co-hosted and supported formats." },
  ];

  return (
    <section
      id={ANCHORS.partnerships}
      className="section bg-paper"
      aria-labelledby="partnerships-heading"
    >
      <div className="shell">
        <Reveal variant="image">
          <div className="border border-gold/45 bg-white/60 px-6 py-12 sm:px-10 md:px-14 md:py-16 lg:px-20 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <SectionLabel>{copy.eyebrow}</SectionLabel>

                <h2
                  id="partnerships-heading"
                  className="mt-8 text-h2 text-ink"
                >
                  {copy.heading}
                </h2>

                <p className="measure mt-7 text-lead text-muted">{copy.body}</p>

                <div className="mt-10">
                  <Button
                    href={partnershipFormHref}
                    external={hasPartnershipForm}
                    variant="primary"
                    event="partnership_click"
                    payload={{ location: "partnerships_section" }}
                  >
                    {copy.cta}
                  </Button>
                </div>

                <p className="measure mt-8 text-caption text-muted">
                  {copy.microcopy}
                </p>
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <p className="label text-muted/70">Ways to work together</p>

                <ul className="mt-6 border-t border-line">
                  {offers.map((offer) => (
                    <li
                      key={offer.title}
                      className="flex items-baseline gap-4 border-b border-line py-5"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-gold"
                      />
                      <span>
                        <span className="block text-h4 text-ink">
                          {offer.title}
                        </span>
                        <span className="mt-1.5 block text-caption text-muted">
                          {offer.note}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 text-caption text-muted">
                  Prefer email?{" "}
                  <a
                    href={`mailto:${site.contact.partnershipsEmail}`}
                    className="text-ink underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-gold hover:decoration-gold"
                  >
                    {site.contact.partnershipsEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
