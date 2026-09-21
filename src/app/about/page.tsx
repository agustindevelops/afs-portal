import Image from "next/image";
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
  const { meaning, message, ceo, promo, values } = cms.about;

  return (
    <main className="flex-1">
      <PageHero
        headline="About Aegis Financial Services"
        subheadline="What the name means, and the standard of care the agency is built around."
      />
      <PageSection>
        <PageWithPromo promo={promo}>
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

          <section className="space-y-8">
            <SectionHeading
              title="Leadership"
              description="Meet the CEO behind Aegis Financial Services."
            />
            <div className="grid gap-8 lg:grid-cols-[minmax(14rem,18rem)_minmax(0,1fr)] lg:items-start">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border-subtle bg-surface-subtle shadow-[0_12px_32px_rgba(3,37,61,0.12)]">
                <Image
                  src={ceo.imageSrc}
                  alt={ceo.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 288px, 80vw"
                  className="object-cover object-[center_20%]"
                  priority
                />
              </div>
              <div className="space-y-5">
                <div>
                  <h3 className="text-2xl font-semibold text-brand-navy-950">
                    {ceo.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold tracking-[0.14em] text-brand-blue-700 uppercase">
                    {ceo.title}
                  </p>
                  <p className="mt-3 font-accent text-xl text-brand-navy-950 italic">
                    {ceo.tagline}
                  </p>
                </div>
                {ceo.bio.map((paragraph) => (
                  <p key={paragraph} className="text-text-secondary">
                    {paragraph}
                  </p>
                ))}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border-subtle bg-surface-card p-5">
                    <p className="text-sm font-semibold tracking-[0.14em] text-brand-blue-700 uppercase">
                      Vision
                    </p>
                    <p className="mt-2 text-text-secondary">{ceo.vision}</p>
                  </div>
                  <div className="rounded-2xl border border-border-subtle bg-surface-card p-5">
                    <p className="text-sm font-semibold tracking-[0.14em] text-brand-blue-700 uppercase">
                      Mission
                    </p>
                    <p className="mt-2 text-text-secondary">{ceo.mission}</p>
                  </div>
                </div>
              </div>
            </div>
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
