import {
  ContentTile,
  ContentTileGrid,
} from "@/components/layout/content-tile";
import { PageHero } from "@/components/layout/page-hero";
import {
  PageSection,
  SectionHeading,
} from "@/components/layout/page-section";
import { PageWithPromo } from "@/components/layout/slogan-panel";
import { HomeQuote } from "@/components/home/home-quote";
import { QuoteTrigger } from "@/components/intake/quote-trigger";
import { fetchIntakeFlow } from "@/lib/admin-api";
import { getCmsData } from "@/lib/cms/get-cms-data";

export default async function AncillaryPage() {
  const [cms, flow] = await Promise.all([getCmsData(), fetchIntakeFlow()]);
  const page = cms.ancillary;
  const links = cms.enrollmentLinks.filter((link) =>
    ["humana-dental", "ameritas-dental", "ameritas-vision", "travel"].includes(
      link.id,
    ),
  );

  return (
    <main className="flex-1">
      <PageHero
        headline={page.hero.headline}
        subheadline={page.hero.subheadline}
      />
      <PageSection>
        <PageWithPromo promo={page.promo}>
          <section>
            <SectionHeading
              title="Ancillary benefits we offer"
              description="Dental, vision, and travel coverage — disability is not offered at this time."
            />
            <ContentTileGrid columns={3}>
              {page.tiles.map((tile) => (
                <li key={tile.id} className="h-full">
                  <ContentTile
                    title={tile.title}
                    description={tile.description}
                  />
                </li>
              ))}
            </ContentTileGrid>
          </section>

          <section className="space-y-5">
            <SectionHeading
              title={page.selfEnrollment.title}
              description={page.selfEnrollment.intro}
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {links.map((link) => (
                <li key={link.id}>
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-h-14 items-center rounded-xl border border-border-subtle bg-surface-card px-4 py-3 text-sm font-medium text-brand-link hover:border-brand-blue-600/40"
                    >
                      Self-enroll: {link.label}
                    </a>
                  ) : (
                    <span className="flex min-h-14 items-center rounded-xl border border-border-subtle bg-surface-subtle px-4 py-3 text-sm text-text-muted">
                      {link.label} — enrollment link pending
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
              <span>{page.selfEnrollment.contactFallback}</span>
              <QuoteTrigger variant="link" size="sm" coverageKey="dental_vision">
                Request a personalized quote
              </QuoteTrigger>
            </div>
          </section>
        </PageWithPromo>
      </PageSection>
      <HomeQuote flow={flow} />
    </main>
  );
}
