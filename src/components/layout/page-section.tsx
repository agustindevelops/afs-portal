import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { siteContainer } from "@/lib/site";

export function PageSection({
  children,
  className,
  id,
  tone = "page",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "page" | "subtle" | "dark" | "hero";
}) {
  const tones = {
    page: "bg-surface-page",
    subtle: "bg-surface-subtle",
    dark: "dark bg-brand-navy-950 text-white",
    hero: "dark bg-hero text-white",
  } as const;

  return (
    <section id={id} className={cn(tones[tone], "py-16 sm:py-20", className)}>
      <div className={siteContainer}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  description,
  align = "left",
  light = false,
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-3",
        align === "center" && "mx-auto text-center",
      )}
    >
      <h2
        className={cn(
          "text-3xl font-semibold sm:text-4xl",
          light ? "text-white" : "text-brand-navy-950",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn(light ? "text-text-inverse-muted" : "text-text-secondary")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
