import Link from "next/link";
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
        <PageWithPromo promo={page.promo}>
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

          <section className="rounded-2xl border border-border-subtle bg-surface-card p-6">
            <SectionHeading
              title="Funeral Plans"
              description="Looking ahead to final-expense and funeral planning guidance."
            />
            <p className="mt-4 text-text-secondary">
              Aegis is still writing fuller Funeral Plans details. For the current
              overview, visit the{" "}
              <Link
                href="/funeral"
                className="font-medium text-brand-link hover:underline"
              >
                Funeral Plans
              </Link>{" "}
              page, or use Need help? and choose “I am interested in a funeral
              plan.”
            </p>
          </section>
        </PageWithPromo>
      </PageSection>
      <HomeQuote flow={flow} />
    </main>
  );
}
