"use client";

import { coverageIcons } from "@/components/home/coverage-icons";
import { useQuoteDialog } from "@/components/intake/quote-dialog";
import { coverageKeyForService, services, siteContainer } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HomeServices() {
  const { openQuote } = useQuoteDialog();

  return (
    <section id="services" className="scroll-mt-24 bg-surface-page py-16 sm:py-20">
      <div className={siteContainer}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-brand-navy-950">
            Coverage that protects what matters
          </h2>
          <p className="mt-3 text-text-secondary">
            Choose a coverage area to start a free quote. An advisor will help
            you compare options for your household.
          </p>
        </div>

        <ul className="mt-10 grid gap-x-3 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => {
            const Icon = coverageIcons[service.slug];
            return (
              <li key={service.slug} className="flex justify-center">
                <button
                  type="button"
                  onClick={() => openQuote(coverageKeyForService(service.slug))}
                  className="group flex w-[8.25rem] flex-col items-center outline-none focus-visible:ring-[3px] focus-visible:ring-brand-gold-200 focus-visible:ring-offset-2"
                >
                  <span
                    className={cn(
                      "relative z-0 flex size-[6rem] items-center justify-center rounded-full text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_16px_rgba(3,37,61,0.14)] transition-transform group-hover:-translate-y-0.5",
                      service.color,
                    )}
                  >
                    {service.slug === "medicare" ? (
                      <Icon className="h-11 w-[4.25rem] overflow-hidden rounded-sm" />
                    ) : (
                      <Icon className="size-14" />
                    )}
                  </span>
                  <span className="relative z-10 -mt-3 w-full rounded-md border border-border-subtle bg-white px-1.5 py-2.5 text-center text-[0.72rem] leading-snug font-semibold text-brand-navy-950 shadow-[0_4px_12px_rgba(3,37,61,0.06)] transition-[border-color,box-shadow] group-hover:border-brand-blue-600/35 group-hover:shadow-[0_6px_16px_rgba(3,37,61,0.1)]">
                    {service.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
