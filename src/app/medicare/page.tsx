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
import { fetchIntakeFlow } from "@/lib/admin-api";
import { getCmsData } from "@/lib/cms/get-cms-data";

export default async function MedicarePage() {
  const [cms, flow] = await Promise.all([getCmsData(), fetchIntakeFlow()]);
  const page = cms.medicare;

  return (
    <main className="flex-1">
      <PageHero
        headline={page.hero.headline}
        subheadline={page.hero.subheadline}
        ctaLabel={page.hero.ctaLabel}
        coverageKey="on_medicare"
      />
      <PageSection>
        <PageWithPromo promo={page.promo}>
          <section>
            <SectionHeading
              title="Medicare coverage options"
              description="Explore the main Medicare paths we help families compare."
            />
            <ContentTileGrid columns={2}>
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

          <section className="space-y-6">
            <SectionHeading
              title={page.overview.title}
              description={page.overview.intro}
            />
            <div className="grid gap-4 lg:grid-cols-3">
              {page.overview.branches.map((branch) => (
                <div
                  key={branch.title}
                  className="rounded-2xl border border-border-subtle bg-surface-card p-5"
                >
                  <h3 className="text-lg font-semibold text-brand-navy-950">
                    {branch.title}
                  </h3>
                  <ul className="mt-4 space-y-2 border-l-2 border-brand-gold-500 pl-4 text-sm text-text-secondary">
                    {branch.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeading title="Medicare FAQs" />
            <ul className="space-y-3">
              {page.faqs.map((faq) => (
                <li
                  key={faq.question}
                  className="rounded-2xl border border-border-subtle bg-surface-card p-5"
                >
                  <h3 className="font-semibold text-brand-navy-950">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">{faq.answer}</p>
                </li>
              ))}
            </ul>
          </section>
        </PageWithPromo>
      </PageSection>
      <HomeQuote flow={flow} />
    </main>
  );
}
