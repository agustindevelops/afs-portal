import { requestQuote } from "@/app/actions/request-quote";
import { QuoteSubmitButton } from "@/components/home/quote-submit-button";
import { services, site, states } from "@/lib/site";

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-lg border border-border-control bg-white px-3 text-sm text-brand-navy-950 outline-none placeholder:text-text-muted focus-visible:ring-[3px] focus-visible:ring-brand-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-950";

export function HomeQuote({
  interest,
  sent,
  error,
}: {
  interest?: string;
  sent?: boolean;
  error?: boolean;
}) {
  return (
    <section id="quote" className="dark scroll-mt-24 bg-hero py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Request a{" "}
            <span className="font-accent font-medium text-brand-gold-200 italic">
              Free Quote
            </span>
          </h2>
          <p className="max-w-md text-[#F5F9F9]">
            Tell us a little about what you need. There is no cost and no
            obligation — we reply within 1-2 business days.
          </p>
          <p className="text-sm text-[#D6E4EA]">
            {site.serving}. {site.spanish}.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white p-5 text-brand-navy-950 shadow-[0_24px_60px_rgba(3,37,61,0.28)] sm:p-7">
          {sent ? (
            <div className="space-y-2 py-6">
              <h3 className="text-2xl font-semibold">Thank you</h3>
              <p className="text-text-secondary">
                We received your request. An advisor will reply within 1-2
                business days.
              </p>
            </div>
          ) : (
            <form action={requestQuote} className="grid gap-4 sm:grid-cols-2">
              {error ? (
                <p className="sm:col-span-2 text-sm font-medium text-error">
                  Please complete the required fields so we can follow up.
                </p>
              ) : null}
              <label className="block text-sm font-medium">
                Full name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className={fieldClassName}
                />
              </label>
              <label className="block text-sm font-medium">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className={fieldClassName}
                />
              </label>
              <label className="block text-sm font-medium">
                Phone
                <input
                  required
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  className={fieldClassName}
                />
              </label>
              <label className="block text-sm font-medium">
                State
                <select
                  required
                  name="state"
                  defaultValue=""
                  className={fieldClassName}
                >
                  <option value="" disabled>
                    Select a state
                  </option>
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="sm:col-span-2 block text-sm font-medium">
                Coverage interest
                <select
                  name="interest"
                  defaultValue={
                    services.some((service) => service.slug === interest)
                      ? interest
                      : ""
                  }
                  className={fieldClassName}
                >
                  <option value="">I am not sure yet</option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="sm:col-span-2 block text-sm font-medium">
                How can we help?
                <textarea
                  name="message"
                  rows={4}
                  className={`${fieldClassName} h-auto py-2.5`}
                />
              </label>
              <div className="sm:col-span-2">
                <QuoteSubmitButton />
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
