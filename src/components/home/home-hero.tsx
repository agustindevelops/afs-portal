import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HomeHero() {
  return (
    <section className="dark relative overflow-hidden bg-hero">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-center lg:py-20">
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
          <p className="max-w-md text-lg text-[#F5F9F9]">{site.tagline}</p>
          <p className="text-sm font-medium text-[#D6E4EA]">{site.serving}</p>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href="#quote"
              className={cn(buttonVariants({ size: "lg" }), "max-sm:w-full")}
            >
              {site.quoteCta}
            </a>
            <a
              href="#services"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "max-sm:w-full",
              )}
            >
              View coverage options
            </a>
          </div>
        </div>

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
      </div>
    </section>
  );
}
