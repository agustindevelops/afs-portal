import { HomeQuote } from "@/components/home/home-quote";
import { PageHero } from "@/components/layout/page-hero";
import {
  PageSection,
  SectionHeading,
} from "@/components/layout/page-section";
import { PageWithPromo } from "@/components/layout/slogan-panel";
import { SocialLinks } from "@/components/social/social-links";
import { fetchIntakeFlow } from "@/lib/admin-api";
import { contactCardHref } from "@/lib/contact-card";
import { getCmsData } from "@/lib/cms/get-cms-data";

export default async function ContactPage() {
  const [cms, flow] = await Promise.all([getCmsData(), fetchIntakeFlow()]);
  const page = cms.contactPage;
  const { contact, site, socialMedia } = cms;

  return (
    <main className="flex-1">
      <PageHero
        headline={page.hero.headline}
        subheadline={page.hero.subheadline}
      />
      <PageSection>
        <PageWithPromo promo={page.promo}>
          <section className="space-y-6">
            <SectionHeading title="Contact information" />
            <div className="grid gap-4 sm:grid-cols-2">
              {contact.phone ? (
                <a
                  href={`tel:${contact.phone}`}
                  className="rounded-2xl border border-border-subtle bg-surface-card p-5 hover:border-brand-blue-600/40"
                >
                  <p className="text-sm font-semibold text-brand-blue-700">
                    Phone
                  </p>
                  <p className="mt-2 text-lg text-brand-navy-950">
                    {contact.phone}
                  </p>
                </a>
              ) : (
                <div className="rounded-2xl border border-border-subtle bg-surface-subtle p-5">
                  <p className="text-sm font-semibold text-brand-blue-700">
                    Phone
                  </p>
                  <p className="mt-2 text-text-muted">Phone number pending</p>
                </div>
              )}
              <a
                href={`mailto:${contact.email}`}
                className="rounded-2xl border border-border-subtle bg-surface-card p-5 hover:border-brand-blue-600/40"
              >
                <p className="text-sm font-semibold text-brand-blue-700">
                  Email
                </p>
                <p className="mt-2 text-lg text-brand-navy-950">
                  {contact.email}
                </p>
              </a>
            </div>
            <p className="font-accent text-2xl text-brand-navy-950 italic">
              {site.spanish}
            </p>
          </section>

          <section className="space-y-4">
            <SectionHeading
              title="Save my contact"
              description={page.saveContactIntro}
            />
            <a
              href={contactCardHref}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-gold-500/50 bg-brand-navy-950 px-5 text-sm font-semibold text-white hover:bg-brand-navy-900"
            >
              Save my contact
            </a>
          </section>

          <section className="space-y-4">
            <SectionHeading
              title="Prefer to contact another way?"
              description="Call, text, or email — whichever is easiest for you."
            />
            <ul className="grid gap-3 sm:grid-cols-3">
              {page.alternateMethods.map((method) => (
                <li
                  key={method.label}
                  className="rounded-xl border border-border-subtle bg-surface-card p-4"
                >
                  <p className="font-semibold text-brand-navy-950">
                    {method.label}
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    {method.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <SectionHeading
              title="Follow Aegis"
              description={page.socialIntro}
            />
            <SocialLinks items={socialMedia} />
          </section>

          <section className="space-y-4">
            <SectionHeading title="Reviews & testimonials" />
            {contact.googleReviewUrl ? (
              <a
                href={contact.googleReviewUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl border border-border-subtle bg-surface-card px-4 py-3 text-sm font-medium text-brand-link hover:border-brand-blue-600/40"
              >
                Leave a Google review
              </a>
            ) : contact.testimonial ? (
              <blockquote className="rounded-2xl border border-border-subtle bg-surface-card p-6 text-text-secondary italic">
                {contact.testimonial}
              </blockquote>
            ) : (
              <p className="rounded-xl border border-border-subtle bg-surface-subtle px-4 py-3 text-sm text-text-muted">
                Google review link or approved testimonials will appear here once
                provided.
              </p>
            )}
          </section>
        </PageWithPromo>
      </PageSection>
      <HomeQuote flow={flow} />
    </main>
  );
}
