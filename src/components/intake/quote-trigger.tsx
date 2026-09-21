"use client";

import { buttonVariants } from "@/components/ui/button";
import { useQuoteDialog } from "@/components/intake/quote-dialog";
import { cn } from "@/lib/utils";

export function QuoteTrigger({
  children,
  className,
  coverageKey,
  variant = "default",
  size = "lg",
}: {
  children: React.ReactNode;
  className?: string;
  coverageKey?: string;
  variant?: "default" | "outline" | "ghost" | "secondary" | "link";
  size?: "default" | "lg" | "sm";
}) {
  const { openQuote } = useQuoteDialog();

  return (
    <button
      type="button"
      onClick={() => openQuote(coverageKey)}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  );
}
