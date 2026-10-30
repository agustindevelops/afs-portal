"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AegisLogo } from "@/components/brand/aegis-logo";
import { QuoteTrigger } from "@/components/intake/quote-trigger";
import { Button, buttonVariants } from "@/components/ui/button";
import { contactCardHref } from "@/lib/contact-card";
import type { NavItem } from "@/lib/cms/types";
import { contactLanding, landingContainer, siteContainer } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader({
  navigation,
  spanish,
  quoteCta,
}: {
  navigation: NavItem[];
  spanish: string;
  quoteCta: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = navigation.filter((item) => item.enabled);

  if (contactLanding) {
    return (
      <header className="dark sticky top-0 z-40 border-b border-white/10 bg-brand-navy-950">
        <div
          className={cn(
            landingContainer,
            "flex min-h-16 items-center justify-between gap-3 py-3",
          )}
        >
          <AegisLogo compact className="min-w-0" />
          <a
            href={contactCardHref}
            className={buttonVariants({ variant: "outline" })}
          >
            Save contact
          </a>
        </div>
      </header>
    );
  }

  return (
    <header className="dark sticky top-0 z-40 border-b border-white/10 bg-brand-navy-950">
      <div
        className={cn(
          siteContainer,
          "flex min-h-16 items-center justify-between gap-3 py-3",
        )}
      >
        <AegisLogo compact className="min-w-0 lg:hidden" />
        <AegisLogo className="hidden min-w-0 lg:flex" />

        <nav
          className="hidden items-center gap-1 xl:flex"
          aria-label="Primary"
        >
          {links.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-2.5 py-2 text-sm text-[#D6E4EA] transition-colors hover:text-white",
                  active &&
                    "text-brand-gold-200 underline decoration-brand-gold-500 decoration-2 underline-offset-8",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <p className="hidden text-base font-medium text-brand-gold-200 lg:block">
            {spanish}
          </p>
          <QuoteTrigger className="max-sm:h-11 max-sm:px-3 max-sm:text-sm">
            <span className="sm:hidden">Free Quote</span>
            <span className="hidden sm:inline">{quoteCta}</span>
          </QuoteTrigger>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className={cn(siteContainer, "border-t border-white/10 py-4 xl:hidden")}
          aria-label="Mobile"
        >
          <ul className="grid gap-1">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-3 text-sm text-[#D6E4EA] hover:text-white",
                    (item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href)) &&
                      "text-brand-gold-200 underline decoration-brand-gold-500 decoration-2 underline-offset-8",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
