import { SocialLinks } from "@/components/social/social-links";
import type { SocialLink } from "@/lib/cms/types";
import { siteContainer } from "@/lib/site";

export function HomeSocial({ socialMedia }: { socialMedia: SocialLink[] }) {
  return (
    <section className="bg-surface-page py-16 sm:py-20">
      <div className={siteContainer}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-brand-navy-950">
            Resources, tips, and information
          </h2>
          <p className="mt-3 text-text-secondary">
            Follow Aegis on social media for coverage reminders, planning tips,
            and helpful information for families in Texas and Florida.
          </p>
          <div className="mt-8 flex justify-center">
            <SocialLinks items={socialMedia} />
          </div>
        </div>
      </div>
    </section>
  );
}
