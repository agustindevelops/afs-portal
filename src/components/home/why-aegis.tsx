import Image from "next/image";
import { HandHeart, Languages, ShieldCheck } from "lucide-react";
import type { CmsData } from "@/lib/cms/types";
import { landingContainer } from "@/lib/site";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Request a free quote",
    body: "Share your contact info in a short form. No cost and no obligation.",
  },
  {
    title: "Talk with an advisor",
    body: "We listen first and explain your options in plain language.",
  },
  {
    title: "Choose with confidence",
    body: "Pick the coverage that fits, with support long after you enroll.",
  },
] as const;

export function WhyAegis({ about }: { about: CmsData["about"] }) {
  const value = (id: string) =>
    about.values.find((item) => item.id === id)?.description ?? "";

  const reasons = [
    { icon: ShieldCheck, title: "Free guidance", body: value("honesty") },
    { icon: Languages, title: "English & Spanish", body: value("clarity") },
    { icon: HandHeart, title: "Ongoing support", body: value("responsibility") },
  ];

  return (
    <section className="dark bg-hero py-16 text-white sm:py-24">
      <div className={landingContainer}>
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-medium tracking-[0.18em] text-brand-gold-200 uppercase">
            Why Aegis?
          </p>
          <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">
            {about.message.headline}
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-[1.25fr_1fr] md:items-stretch">
          <ul className="grid gap-4">
            {reasons.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-gold-500/15 text-brand-gold-200 ring-1 ring-brand-gold-500/40">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-text-inverse-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>

          <figure className="flex flex-col overflow-hidden rounded-2xl bg-white text-brand-navy-950 shadow-[0_24px_60px_rgba(3,37,61,0.35)]">
            <div className="relative aspect-[3/2]">
              <Image
                src={about.ceo.imageSrc}
                alt={about.ceo.imageAlt}
                fill
                sizes="(min-width: 768px) 460px, 100vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
            <blockquote className="flex-1 px-6 pt-5">
              <p className="font-accent text-2xl leading-snug text-brand-navy-900 italic">
                “{about.ceo.mission}”
              </p>
            </blockquote>
            <figcaption className="px-6 pt-4 pb-6 text-sm">
              <span className="font-semibold">{about.ceo.name}</span>
              <span className="text-text-secondary">
                {" "}
                · {about.ceo.title}, Aegis Financial Services · Se Habla Español
              </span>
            </figcaption>
          </figure>
        </div>

        <ol className="mt-14 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full font-brand text-lg font-semibold",
                  "bg-brand-gold-500 text-brand-navy-950",
                )}
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-text-inverse-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
