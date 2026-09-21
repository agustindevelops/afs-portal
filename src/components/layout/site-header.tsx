import { AegisLogo } from "@/components/brand/aegis-logo";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="dark sticky top-0 z-40 border-b border-white/10 bg-brand-navy-950">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <AegisLogo compact className="min-w-0 sm:hidden" />
        <AegisLogo className="hidden min-w-0 sm:flex" />
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <p className="hidden font-accent text-base text-brand-gold-200 italic md:block">
            {site.spanish}
          </p>
          <a
            href="#quote"
            className={cn(
              buttonVariants({ size: "lg" }),
              "max-sm:h-11 max-sm:px-3 max-sm:text-sm",
            )}
          >
            <span className="sm:hidden">Free Quote</span>
            <span className="hidden sm:inline">{site.quoteCta}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
