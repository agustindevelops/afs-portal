import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ContentTile({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-3 rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-[0_8px_24px_rgba(3,37,61,0.04)]",
        className,
      )}
    >
      <h3 className="text-xl font-semibold text-brand-navy-950">{title}</h3>
      <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
    </article>
  );
}

export function ContentTileGrid({
  children,
  columns = 3,
}: {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}) {
  return (
    <ul
      className={cn(
        "mt-10 grid items-stretch gap-4",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
      )}
    >
      {children}
    </ul>
  );
}
