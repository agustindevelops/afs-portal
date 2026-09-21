import { Contact } from "lucide-react";
import { contactCardHref } from "@/lib/contact-card";

export function SaveContactTab() {
  return (
    <a
      href={contactCardHref}
      className="print:hidden fixed inset-y-0 left-0 z-30 flex w-11 flex-col items-center justify-center gap-2 border-r border-brand-gold-500 bg-brand-navy-950 text-sm font-medium text-white outline-none focus-visible:ring-[3px] focus-visible:ring-brand-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-page"
    >
      <Contact className="size-4 text-brand-gold-200" aria-hidden="true" />
      <span className="[writing-mode:vertical-rl]">Save contact</span>
    </a>
  );
}
