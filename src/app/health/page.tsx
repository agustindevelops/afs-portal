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

export default async function HealthPage() {
  const [cms, flow] = await Promise.all([getCmsData(), fetchIntakeFlow()]);
  const page = cms.health;
  const promo =
    page.hero.promoHeadline && page.hero.promoBody
      ? { title: page.hero.promoHeadline, body: page.hero.promoBody }
      : null;

  return (
    <main className="flex-1">
      <PageHero
        headline={page.hero.headline}
        subheadline={page.hero.subheadline}
        ctaLabel={page.hero.ctaLabel}
        coverageKey="under_65"
      />
      <PageSection>
        <PageWithPromo promo={promo}>
          <section>
            <SectionHeading
              title="Health coverage options"
              description="Explore marketplace, private, and temporary health coverage options."
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

          <section className="space-y-4">
            <SectionHeading
              title={page.sep.title}
              description={page.sep.intro}
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {page.sep.items.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-border-subtle bg-surface-card px-4 py-3 text-sm text-text-secondary"
                >
                  {item}
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
