import Image from "next/image";
import { QuoteTrigger } from "@/components/intake/quote-trigger";
import { IntakeWizard } from "@/components/intake/intake-wizard";
import { buttonVariants } from "@/components/ui/button";
import type { IntakeFlowPayload } from "@/lib/intake";
import { contactLanding, site, siteContainer } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HomeHero({ flow }: { flow: IntakeFlowPayload | null }) {
  return (
    <section className="dark relative overflow-hidden bg-hero">
      <div
        className={cn(
          siteContainer,
          "grid gap-10 py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)] lg:items-start lg:py-20",
        )}
      >
        <div className="max-w-xl space-y-6">
          <p className="text-sm font-medium tracking-[0.22em] text-brand-gold-200 uppercase">
            People · Plans · Security · Brighter Tomorrows
          </p>
          <h1 className="text-4xl leading-tight font-semibold text-white sm:text-5xl">
            {site.headline}{" "}
            <span className="font-accent font-medium text-brand-gold-200 italic">
              {site.headlineAccent}
            </span>
          </h1>
          <p className="max-w-md text-lg text-text-inverse-soft">{site.tagline}</p>
          <p className="text-sm font-medium text-text-inverse-muted">{site.serving}</p>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            {contactLanding ? (
              <a
                href="#contact"
                className={cn(buttonVariants({ size: "lg" }), "max-sm:w-full")}
              >
                Share your contact info
              </a>
            ) : (
              <>
                <QuoteTrigger className="max-sm:w-full">
                  {site.quoteCta}
                </QuoteTrigger>
                <a
                  href="#services"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "max-sm:w-full",
                  )}
                >
                  View coverage options
                </a>
              </>
            )}
          </div>
        </div>

        <div id="contact" className="relative scroll-mt-24">
          {contactLanding || flow ? (
            <IntakeWizard flow={flow} contactOnly={contactLanding} />
          ) : (
            <div className="relative hidden min-h-[28rem] overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_60px_rgba(3,37,61,0.35)] lg:block">
              <Image
                src="/brand/hero-family.jpg"
                alt="A family looking toward the horizon at sunset"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 0px"
                className="origin-[92%_center] scale-[2.35] object-cover object-[100%_45%]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-navy-950 via-brand-navy-950/25 to-brand-navy-950/10" />
              <p className="font-accent absolute inset-x-6 bottom-6 text-right text-2xl leading-snug text-brand-gold-200 italic">
                {site.slogan}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
