import { IntakeWizard } from "@/components/intake/intake-wizard";
import type { IntakeFlowPayload } from "@/lib/intake";
import { site, siteContainer } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HomeQuote({ flow }: { flow: IntakeFlowPayload | null }) {
  return (
    <section id="quote" className="dark scroll-mt-24 bg-hero py-16 sm:py-20">
      <div
        className={cn(
          siteContainer,
          "grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start",
        )}
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Request a{" "}
            <span className="font-accent font-medium text-brand-gold-200 italic">
              Free Quote
            </span>
          </h2>
          <p className="max-w-md text-text-inverse-soft">
            Answer a few questions about the coverage you need. There is no cost
            and no obligation — we reply within 1-2 business days.
          </p>
          <p className="text-sm text-text-inverse-muted">
            {site.serving}. {site.spanish}.
          </p>
        </div>

        {flow ? (
          <IntakeWizard flow={flow} />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white p-7 text-brand-navy-950">
            <h3 className="text-xl font-semibold">Quote form unavailable</h3>
            <p className="mt-2 text-text-secondary">
              We could not load the intake questions right now. Please try again
              shortly, or use the button in the header.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
