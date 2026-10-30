"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type ServiceCard = {
  title: string;
  tagline: string;
  intro: string;
  items: string[];
  image: string;
  alt: string;
};

const faceClassName =
  "flex flex-col overflow-hidden rounded-2xl [grid-area:1/1] [backface-visibility:hidden]";

export function ServiceFlipCard({ service }: { service: ServiceCard }) {
  const [flipped, setFlipped] = useState(false);
  const frontButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);

  function flip(next: boolean) {
    setFlipped(next);
    requestAnimationFrame(() =>
      (next ? backButton : frontButton).current?.focus({ preventScroll: true }),
    );
  }

  return (
    <li className="[perspective:1400px]">
      <div
        className={cn(
          "grid h-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] [transform-style:preserve-3d] motion-reduce:transition-none",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        <div
          className={cn(
            faceClassName,
            "border border-border-subtle bg-white shadow-[0_12px_32px_rgba(3,37,61,0.08)]",
          )}
          aria-hidden={flipped}
          inert={flipped}
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={service.image}
              alt={service.alt}
              fill
              sizes="(min-width: 768px) 360px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-5">
            <h3 className="text-xl font-semibold text-brand-navy-950">
              {service.title}
            </h3>
            <p className="text-text-secondary">{service.tagline}</p>
            <button
              ref={frontButton}
              type="button"
              onClick={() => flip(true)}
              className="group/flip mt-auto inline-flex items-center gap-2 self-start pt-3 text-sm font-semibold text-brand-link hover:text-brand-navy-900 focus-visible:rounded-md focus-visible:ring-[3px] focus-visible:ring-brand-gold-200 focus-visible:outline-none"
            >
              See what’s included
              <ArrowRight
                className="size-4 transition-transform group-hover/flip:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div
          className={cn(
            faceClassName,
            "dark bg-hero p-6 text-white shadow-[0_16px_40px_rgba(3,37,61,0.3)] [transform:rotateY(180deg)]",
          )}
          aria-hidden={!flipped}
          inert={!flipped}
        >
          <p className="text-xs font-semibold tracking-[0.18em] text-brand-gold-200 uppercase">
            {service.title}
          </p>
          <p className="mt-2 text-sm text-text-inverse-muted">{service.intro}</p>
          <ul className="mt-4 space-y-2">
            {service.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-brand-gold-200"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
          <button
            ref={backButton}
            type="button"
            onClick={() => flip(false)}
            className="mt-auto inline-flex items-center gap-1.5 self-start rounded-md pt-6 text-sm font-semibold text-brand-gold-200 hover:text-white focus-visible:ring-[3px] focus-visible:ring-brand-gold-200 focus-visible:outline-none"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </button>
        </div>
      </div>
    </li>
  );
}
