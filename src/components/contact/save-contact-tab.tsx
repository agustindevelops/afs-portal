import { Contact } from "lucide-react";
import {
  edgeTabClassName,
  edgeTabLabelClassName,
} from "@/components/layout/edge-tab";
import { contactCardHref } from "@/lib/contact-card";

export function SaveContactTab() {
  return (
    <a href={contactCardHref} className={edgeTabClassName}>
      <Contact className="size-4 text-brand-gold-200" aria-hidden="true" />
      <span className={edgeTabLabelClassName}>Save contact</span>
    </a>
  );
}
