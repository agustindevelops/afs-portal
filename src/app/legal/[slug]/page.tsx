import { notFound } from "next/navigation";
import {
  PageSection,
  SectionHeading,
} from "@/components/layout/page-section";
import { getCmsData } from "@/lib/cms/get-cms-data";

export async function generateStaticParams() {
  const cms = await getCmsData();
  return cms.legalPages.map((page) => ({ slug: page.slug }));
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cms = await getCmsData();
  const page = cms.legalPages.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <main className="flex-1">
      <PageSection>
        <SectionHeading title={page.title} description={page.summary} />
        {page.isClientTemplate ? (
          <p className="mt-4 rounded-xl border border-brand-gold-500/40 bg-brand-gold-200/20 px-4 py-3 text-sm text-brand-navy-950">
            Client-replaceable template. Replace this copy with approved legal
            content before launch.
          </p>
        ) : null}
        <div className="mt-10 space-y-8">
          {page.sections.map((section) => (
            <section key={section.heading} className="space-y-2">
              <h2 className="text-xl font-semibold text-brand-navy-950">
                {section.heading}
              </h2>
              <p className="text-text-secondary">{section.body}</p>
            </section>
          ))}
        </div>
      </PageSection>
    </main>
  );
}
