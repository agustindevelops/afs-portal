import Image from "next/image";
import { Download } from "lucide-react";
import {
  ServiceFlipCard,
  type ServiceCard,
} from "@/components/home/service-flip-card";
import { WhyAegis } from "@/components/home/why-aegis";
import { IntakeWizard } from "@/components/intake/intake-wizard";
import { buttonVariants } from "@/components/ui/button";
import type { CmsData } from "@/lib/cms/types";
import type { IntakeFlowPayload } from "@/lib/intake";
import { infoPacketHref, landingContainer } from "@/lib/site";
import { cn } from "@/lib/utils";

function serviceCards(cms: CmsData): ServiceCard[] {
  return [
    {
      title: "Health Insurance",
      tagline: cms.health.hero.headline,
      intro: cms.health.hero.subheadline,
      items: [
        ...cms.health.tiles.map((tile) => tile.title),
        cms.health.sep.title,
      ],
      image: "/photos/health-father-daughter.jpg",
      alt: "A father hugging his laughing daughter",
    },
    {
      title: "Medicare",
      tagline: cms.medicare.promo.title,
      intro: cms.medicare.promo.body,
      items: cms.medicare.tiles.map((tile) => tile.title),
      image: "/photos/medicare-couple.jpg",
      alt: "An older couple laughing together on a bench",
    },
    {
      title: "Life Insurance",
      tagline: cms.life.hero.headline,
      intro: cms.life.promo.body,
      items: cms.life.tiles.map((tile) => tile.title),
      image: "/photos/life-beach-family.jpg",
      alt: "A family holding hands at the edge of the ocean",
    },
  ];
}

export function SimpleHome({
  flow,
  cms,
}: {
  flow: IntakeFlowPayload | null;
  cms: CmsData;
}) {
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
        <div className={cn(landingContainer, "py-20 sm:py-28")}>
          <div className="max-w-2xl space-y-6">
            <p className="text-sm font-medium tracking-[0.18em] text-brand-gold-200 uppercase">
              Insurance guidance in Texas & Florida
            </p>
            <h1 className="text-4xl leading-tight font-semibold text-white sm:text-5xl">
              Protect{" "}
              <span className="font-accent font-medium text-brand-gold-200 italic">
                What Matters Most.
              </span>
            </h1>
            <p className="max-w-xl text-lg text-text-inverse-soft">
              Get straightforward guidance finding the right insurance coverage
              for you and your family.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={infoPacketHref}
                download
                className={buttonVariants({ size: "lg" })}
              >
                <Download aria-hidden="true" />
                Download Info Packet
              </a>
              <a
                href="#quote"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-page py-16 sm:py-20">
        <div className={landingContainer}>
          <h2 className="text-3xl font-semibold text-brand-navy-950">
            Our Services
          </h2>
          <p className="mt-2 text-text-secondary">
            Flip a card to see what each service includes.
          </p>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {serviceCards(cms).map((service) => (
              <ServiceFlipCard key={service.title} service={service} />
            ))}
          </ul>
          <p className="mt-6 text-sm text-text-secondary">
            Plus other coverage options, subject to confirmation.
          </p>
        </div>
      </section>

      <WhyAegis about={cms.about} />

      <section id="quote" className="scroll-mt-24 bg-surface-page py-16 sm:py-20">
        <div className={landingContainer}>
          <div className="mx-auto max-w-3xl space-y-8">
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
        </div>
      </section>
    </>
  );
}
