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

export default async function AboutPage() {
  const [cms, flow] = await Promise.all([getCmsData(), fetchIntakeFlow()]);
  const { meaning, message, values } = cms.about;

  return (
    <main className="flex-1">
      <PageHero
        headline="About Aegis Financial Services"
        subheadline="What the name means, and the standard of care the agency is built around."
      />
      <PageSection>
        <PageWithPromo>
          <section className="space-y-5">
            <SectionHeading title={meaning.title} />
            <p className="text-sm font-semibold tracking-[0.16em] text-brand-blue-700 uppercase">
              Pronunciation: {meaning.pronunciation}
            </p>
            <p className="text-lg text-text-secondary">{meaning.definition}</p>
            <p className="text-text-secondary">{meaning.connection}</p>
          </section>

          <section className="space-y-5">
            <SectionHeading
              title={message.title}
              description={message.headline}
            />
            {message.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-text-secondary">
                {paragraph}
              </p>
            ))}
          </section>
        </PageWithPromo>
      </PageSection>

      <PageSection tone="subtle">
        <SectionHeading
          align="center"
          title="Core values"
          description="The principles that shape how Aegis guides families through Medicare, health, life, and supplemental coverage."
        />
        <ContentTileGrid columns={2}>
          {values.map((value) => (
            <li key={value.id} className="h-full">
              <ContentTile title={value.title} description={value.description} />
            </li>
          ))}
        </ContentTileGrid>
      </PageSection>

      <HomeQuote flow={flow} />
    </main>
  );
}
