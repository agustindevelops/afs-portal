import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PromoContent = {
  title: string;
  body: string;
};

export function PromoPanel({
  title,
  body,
  className,
}: PromoContent & {
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-2xl border border-brand-gold-500/40 bg-brand-navy-950 p-6 text-white shadow-[0_12px_32px_rgba(3,37,61,0.18)] lg:sticky lg:top-28",
        className,
      )}
    >
      <p className="font-accent text-2xl leading-snug text-brand-gold-200 italic">
        {title}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-text-inverse-muted">{body}</p>
    </aside>
  );
}

/** When promo is omitted, children render full-width with no invented side rail. */
export function PageWithPromo({
  children,
  promo,
}: {
  children: ReactNode;
  promo?: PromoContent | null;
}) {
  if (!promo?.title) {
    return <div className="min-w-0 space-y-16">{children}</div>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,18rem)] lg:items-start">
      <div className="min-w-0 space-y-16">{children}</div>
      <PromoPanel
        title={promo.title}
        body={promo.body}
        className="max-lg:order-first"
      />
    </div>
  );
}
