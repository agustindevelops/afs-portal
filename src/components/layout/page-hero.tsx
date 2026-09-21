import { QuoteTrigger } from "@/components/intake/quote-trigger";
import { siteContainer } from "@/lib/site";

export function PageHero({
  headline,
  subheadline,
  ctaLabel,
  coverageKey,
}: {
  headline: string;
  subheadline: string;
  ctaLabel?: string;
  coverageKey?: string;
  /** @deprecated Promo belongs in the coverage side rail, not under the hero CTA. */
  promoHeadline?: string;
  promoBody?: string;
}) {
  return (
    <section className="dark bg-hero py-12 sm:py-14">
      <div className={siteContainer}>
        <h1 className="max-w-3xl text-4xl font-semibold text-white sm:text-5xl">
          {headline}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-[#F5F9F9]">{subheadline}</p>
        {ctaLabel ? (
          <div className="mt-8">
            <QuoteTrigger coverageKey={coverageKey}>{ctaLabel}</QuoteTrigger>
          </div>
        ) : null}
      </div>
    </section>
  );
}
