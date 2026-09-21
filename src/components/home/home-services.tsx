import Link from "next/link";
import {
  Armchair,
  Building2,
  ShieldPlus,
  Eye,
  Flower2,
  HeartPulse,
  IdCard,
  Landmark,
  Plane,
  Users,
  type LucideIcon,
} from "lucide-react";
import { quoteHref, services } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons: Record<(typeof services)[number]["slug"], LucideIcon> = {
  health: Users,
  medicare: IdCard,
  "texas-medicare": Landmark,
  "dental-vision": Eye,
  life: HeartPulse,
  "final-expense": ShieldPlus,
  "funeral-plans": Flower2,
  travel: Plane,
  retirement: Armchair,
  mortgage: Building2,
};

export function HomeServices() {
  return (
    <section id="services" className="scroll-mt-24 bg-surface-page py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-brand-navy-950">
            Coverage that protects what matters
          </h2>
          <p className="mt-3 text-text-secondary">
            Choose a coverage area to start a free quote. An advisor will help
            you compare options for your household.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => {
            const Icon = icons[service.slug];
            return (
              <li key={service.slug}>
                <Link
                  href={quoteHref(service.slug)}
                  className="flex h-full flex-col items-center gap-3 rounded-2xl border border-border-subtle bg-surface-card px-4 py-6 text-center shadow-[0_8px_24px_rgba(3,37,61,0.04)] transition-transform hover:-translate-y-0.5 hover:border-brand-blue-600/40"
                >
                  <span
                    className={cn(
                      "flex size-14 items-center justify-center rounded-full text-white",
                      service.color,
                      "iconClass" in service ? service.iconClass : "",
                    )}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-brand-navy-950">
                    {service.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
