"use server";

import { redirect } from "next/navigation";

export async function requestQuote(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim();

  if (!name || !email || !phone || !state) {
    redirect("/?error=1#quote");
  }

  // Persistence is owned by AFS-11 (Lead Capture).
  redirect("/?sent=1#quote");
}
