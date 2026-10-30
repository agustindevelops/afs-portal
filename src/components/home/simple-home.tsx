import Image from "next/image";
import { Download } from "lucide-react";
import { IntakeWizard } from "@/components/intake/intake-wizard";
import { buttonVariants } from "@/components/ui/button";
import type { IntakeFlowPayload } from "@/lib/intake";
import { infoPacketHref, landingContainer } from "@/lib/site";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Health Insurance",
    image: "/photos/health-father-daughter.jpg",
    alt: "A father hugging his laughing daughter",
  },
  {
    title: "Medicare",
    image: "/photos/medicare-couple.jpg",
    alt: "An older couple laughing together on a bench",
  },
  {
    title: "Life Insurance",
    image: "/photos/life-beach-family.jpg",
    alt: "A family holding hands at the edge of the ocean",
  },
] as const;

const reasons = ["Free guidance", "English & Spanish", "Ongoing support"] as const;

export function SimpleHome({ flow }: { flow: IntakeFlowPayload | null }) {
  return (
    <>
      <section className="dark relative isolate overflow-hidden bg-brand-navy-950">
        <Image
          src="/photos/hero-family-field.jpg"
          alt="A family walking hand in hand through a grassy field"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-navy-950/95 via-brand-navy-950/80 to-brand-navy-950/30" />
        <div className={cn(landingContainer, "space-y-6 py-20 sm:py-28")}>
          <p className="text-sm font-medium tracking-[0.18em] text-brand-gold-200 uppercase">
            Insurance guidance in Texas & Florida
          </p>
          <h1 className="text-4xl leading-tight font-semibold text-white sm:text-5xl">
            Protect{" "}
            <span className="font-accent font-medium text-brand-gold-200 italic">
              What Matters Most.
            </span>
          </h1>
          <p className="max-w-xl text-lg text-[#F5F9F9]">
            Get straightforward guidance finding the right insurance coverage
            for you and your family.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#quote" className={buttonVariants({ size: "lg" })}>
              Get a Free Quote
            </a>
            <a
              href={infoPacketHref}
              download
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <Download aria-hidden="true" />
              Download Info Packet
            </a>
          </div>
        </div>
      </section>

      <section className="bg-surface-page py-16 sm:py-20">
        <div className={landingContainer}>
          <h2 className="text-3xl font-semibold text-brand-navy-950">
            Our Services
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {services.map((service) => (
              <li
                key={service.title}
                className="overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-[0_12px_32px_rgba(3,37,61,0.08)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 640px) 240px, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="px-4 py-4 text-lg font-semibold text-brand-navy-950">
                  {service.title}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-text-secondary">
            Plus other coverage options, subject to confirmation.
          </p>
        </div>
      </section>

      <section className="bg-surface-subtle py-16 sm:py-20">
        <div
          className={cn(
            landingContainer,
            "grid items-center gap-10 sm:grid-cols-[1fr_0.8fr]",
          )}
        >
          <div>
            <h2 className="text-3xl font-semibold text-brand-navy-950">
              Why Aegis?
            </h2>
            <ul className="mt-6 space-y-3">
              {reasons.map((reason) => (
                <li
                  key={reason}
                  className="flex items-center gap-3 text-lg text-brand-navy-950"
                >
                  <span
                    className="size-2.5 rounded-full bg-brand-gold-500"
                    aria-hidden="true"
                  />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(3,37,61,0.18)]">
            <Image
              src="/photos/why-family-garden.jpg"
              alt="A smiling family running together through a sunny garden"
              fill
              sizes="(min-width: 640px) 320px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="quote" className="scroll-mt-24 bg-surface-page py-16 sm:py-20">
        <div className={cn(landingContainer, "space-y-8")}>
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-brand-navy-950">
              Request a Free Quote
            </h2>
            <p className="text-text-secondary">
              A short contact form followed by a personal response.
            </p>
          </div>
          <IntakeWizard flow={flow} contactOnly />
        </div>
      </section>
    </>
  );
}
