import { AegisLogo } from "@/components/brand/aegis-logo";
import { buttonVariants } from "@/components/ui/button";
import { contactCard, contactCardHref } from "@/lib/contact-card";
import { site, siteContainer } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="dark mt-auto bg-brand-navy-950 text-white">
      <div
        className={cn(
          siteContainer,
          "flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between",
        )}
      >
        <div className="space-y-3">
          <AegisLogo />
          <p className="max-w-sm text-sm text-brand-gold-200/90">{site.tagline}</p>
          <p className="text-sm text-[#D6E4EA]">{site.serving}</p>
        </div>
        <div className="space-y-3 text-sm text-[#D6E4EA] sm:text-right">
          <p className="font-accent text-lg text-brand-gold-200 italic">
            {site.spanish}
          </p>
          <p>
            <a className="hover:text-white hover:underline" href={`mailto:${contactCard.email}`}>
              {contactCard.email}
            </a>
          </p>
          <div className="sm:flex sm:justify-end">
            <a
              href={contactCardHref}
              className={buttonVariants({ variant: "outline", size: "default" })}
            >
              Save contact
            </a>
          </div>
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="max-w-md text-xs text-[#D6E4EA]/80">
            Insurance products are offered by licensed advisors. This website is
            not connected with or endorsed by the U.S. government or the federal
            Medicare program.
          </p>
        </div>
      </div>
    </footer>
  );
}
