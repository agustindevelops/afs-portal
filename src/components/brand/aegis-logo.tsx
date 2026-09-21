import Link from "next/link";
import { AegisMark } from "@/components/brand/aegis-mark";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function AegisLogo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <AegisMark className="h-9 w-8 shrink-0 sm:h-11 sm:w-10" />
      <span className="flex flex-col leading-none">
        <span className="font-brand text-base font-semibold tracking-[0.14em] text-white uppercase sm:text-lg sm:tracking-[0.18em]">
          {site.shortName}
        </span>
        {!compact ? (
          <span className="mt-1 hidden text-[0.65rem] font-medium tracking-[0.22em] text-brand-gold-200 uppercase sm:block">
            Financial Services
          </span>
        ) : null}
      </span>
    </Link>
  );
}
