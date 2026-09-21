import Link from "next/link";
import { HomeQuote } from "@/components/home/home-quote";
import { PageHero } from "@/components/layout/page-hero";
import {
  PageSection,
  SectionHeading,
} from "@/components/layout/page-section";
import { fetchIntakeFlow } from "@/lib/admin-api";
import { getCmsData } from "@/lib/cms/get-cms-data";

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

export default async function ResourcesPage() {
  const [cms, flow] = await Promise.all([getCmsData(), fetchIntakeFlow()]);
  const page = cms.resources;

  return (
    <main className="flex-1">
      <PageHero
        headline={page.hero.headline}
        subheadline={page.hero.subheadline}
      />
      <PageSection>
        <div className="space-y-16">
          {page.sections.map((section) => (
            <section key={section.id} className="space-y-5">
              <SectionHeading title={section.title} description={section.intro} />
              <ul className="grid gap-3">
                {section.links.map((link) => {
                  const enrollment = link.enrollmentLinkId
                    ? cms.enrollmentLinks.find(
                        (item) => item.id === link.enrollmentLinkId,
                      )
                    : null;
                  const href = enrollment?.href || link.href;
                  const label = enrollment?.label || link.label;
                  const cardClassName =
                    "block rounded-2xl border border-border-subtle bg-surface-card p-5 hover:border-brand-blue-600/40";

                  return (
                    <li key={link.id}>
                      {href ? (
                        isExternalHref(href) ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className={cardClassName}
                          >
                            <p className="font-semibold text-brand-navy-950">
                              {label}
                            </p>
                            {link.description ? (
                              <p className="mt-1 text-sm text-text-secondary">
                                {link.description}
                              </p>
                            ) : null}
                          </a>
                        ) : (
                          <Link href={href} className={cardClassName}>
                            <p className="font-semibold text-brand-navy-950">
                              {label}
                            </p>
                            {link.description ? (
                              <p className="mt-1 text-sm text-text-secondary">
                                {link.description}
                              </p>
                            ) : null}
                          </Link>
                        )
                      ) : (
                        <div className="rounded-2xl border border-border-subtle bg-surface-subtle p-5">
                          <p className="font-semibold text-brand-navy-950">
                            {label}
                          </p>
                          {link.description ? (
                            <p className="mt-1 text-sm text-text-secondary">
                              {link.description}
                            </p>
                          ) : null}
                          <p className="mt-2 text-sm text-text-muted">
                            Self-enrollment link pending
                          </p>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </PageSection>
      <HomeQuote flow={flow} />
    </main>
  );
}
