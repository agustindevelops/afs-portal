import { AegisLogo } from "@/components/brand/aegis-logo";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="dark mt-auto bg-brand-navy-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="space-y-3">
          <AegisLogo />
          <p className="max-w-sm text-sm text-brand-gold-200/90">{site.tagline}</p>
          <p className="text-sm text-[#D6E4EA]">{site.serving}</p>
        </div>
        <div className="space-y-2 text-sm text-[#D6E4EA] sm:text-right">
          <p className="font-accent text-lg text-brand-gold-200 italic">
            {site.spanish}
          </p>
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
