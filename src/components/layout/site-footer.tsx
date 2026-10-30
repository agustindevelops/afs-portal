import Link from "next/link";
import { AegisLogo } from "@/components/brand/aegis-logo";
import { SocialLinks } from "@/components/social/social-links";
import { buttonVariants } from "@/components/ui/button";
import { contactCardHref } from "@/lib/contact-card";
import type { CmsData } from "@/lib/cms/types";
import { contactLanding, landingContainer, siteContainer } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteFooter({ cms }: { cms: CmsData }) {
  const { site, contact, socialMedia, legalLinks } = cms;
  const year = new Date().getFullYear();
  const shell = contactLanding ? landingContainer : siteContainer;

  return (
    <footer className="dark mt-auto bg-brand-navy-950 text-white">
      <div
        className={cn(
          shell,
          contactLanding
            ? "grid gap-10 py-12 sm:grid-cols-2"
            : "grid gap-10 py-12 lg:grid-cols-[1.2fr_1fr_1fr]",
        )}
      >
        {contactLanding ? null : (
          <div className="space-y-3">
            <AegisLogo />
            <p className="max-w-sm text-sm text-brand-gold-200/90">{site.tagline}</p>
            <p className="text-sm text-[#D6E4EA]">{site.serving}</p>
            <p className="font-accent text-lg text-brand-gold-200 italic">
              {site.spanish}
            </p>
          </div>
        )}

        <div className="space-y-4 text-sm text-[#D6E4EA]">
          <p className="font-semibold text-white">Contact</p>
          {contact.phone ? (
            <p>
              <a
                className="hover:text-white hover:underline"
                href={`tel:${contact.phone}`}
              >
                {contact.phone}
              </a>
            </p>
          ) : null}
          <p>
            <a
              className="hover:text-white hover:underline"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
          </p>
          {contactLanding ? null : (
            <div>
              <a
                href={contactCardHref}
                className={buttonVariants({ variant: "outline", size: "default" })}
              >
                Save contact
              </a>
            </div>
          )}
          {contactLanding ? null : <SocialLinks items={socialMedia} tone="dark" />}
        </div>

        <div className="space-y-3 text-sm text-[#D6E4EA]">
          <p className="font-semibold text-white">Legal</p>
          <ul className="space-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-white hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={cn(shell, "border-t border-white/10 py-6")}>
        <p className="text-sm text-[#D6E4EA]">
          © {year} {site.name}. {site.copyright}
        </p>
        <p className="mt-2 max-w-3xl text-xs text-[#D6E4EA]/80">
          {site.disclaimer}
        </p>
      </div>
    </footer>
  );
}
