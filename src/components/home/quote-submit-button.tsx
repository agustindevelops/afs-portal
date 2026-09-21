"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function QuoteSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending} className="min-h-12 px-6">
      {pending ? "Sending…" : site.quoteCta}
    </Button>
  );
}
