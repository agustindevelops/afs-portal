import { HomeQuote } from "@/components/home/home-quote";
import { PageHero } from "@/components/layout/page-hero";
import {
  PageSection,
  SectionHeading,
} from "@/components/layout/page-section";
import { fetchIntakeFlow } from "@/lib/admin-api";
import { getCmsData } from "@/lib/cms/get-cms-data";

export default async function FuneralPage() {
  const [cms, flow] = await Promise.all([getCmsData(), fetchIntakeFlow()]);
  const page = cms.funeral;

  return (
    <main className="flex-1">
      <PageHero
        headline={page.hero.headline}
        subheadline={page.hero.subheadline}
      />
      <PageSection>
        <section className="mx-auto max-w-3xl space-y-5">
          <SectionHeading title="Coming soon" />
          {page.body.map((paragraph) => (
            <p key={paragraph} className="text-lg text-text-secondary">
              {paragraph}
            </p>
          ))}
        </section>
      </PageSection>
      <HomeQuote flow={flow} />
    </main>
  );
}
