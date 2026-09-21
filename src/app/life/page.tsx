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

export default async function LifePage() {
  const [cms, flow] = await Promise.all([getCmsData(), fetchIntakeFlow()]);
  const page = cms.life;

  return (
    <main className="flex-1">
      <PageHero
        headline={page.hero.headline}
        subheadline={page.hero.subheadline}
        ctaLabel={page.hero.ctaLabel}
        coverageKey="life"
      />
      <PageSection>
        <PageWithPromo>
          <section>
            <SectionHeading
              title="Life insurance and protection options"
              description="Explore term, permanent, final expense, and related planning paths."
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

          <section className="rounded-2xl border border-brand-gold-500/30 bg-brand-navy-950 p-8 text-white">
            <h2 className="text-2xl font-semibold">{page.promo.title}</h2>
            <p className="mt-4 font-accent text-2xl leading-snug text-brand-gold-200 italic">
              {page.promo.body}
            </p>
          </section>
        </PageWithPromo>
      </PageSection>
      <HomeQuote flow={flow} />
    </main>
  );
}
