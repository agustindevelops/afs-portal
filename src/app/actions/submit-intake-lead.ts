"use server";

import { adminApiUrl } from "@/lib/admin-api";
import type { IntakeAnswerPayload } from "@/lib/intake";

export type SubmitLeadContact = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredCallTime: string;
};

export type SubmitLeadResult =
  | { ok: true; leadId: number }
  | { ok: false; error: string };

export async function submitIntakeLead(input: {
  flowSlug: string;
  answers: IntakeAnswerPayload[];
  contact: SubmitLeadContact;
}): Promise<SubmitLeadResult> {
  try {
    const response = await fetch(adminApiUrl("/api/leads"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      cache: "no-store",
    });

    const data = (await response.json().catch(() => null)) as {
      error?: string;
      lead?: { id: number };
    } | null;

    if (!response.ok) {
      return {
        ok: false,
        error: data?.error ?? "Could not submit your request. Please try again.",
      };
    }

    if (!data?.lead?.id) {
      return { ok: false, error: "Unexpected response from the server." };
    }

    return { ok: true, leadId: data.lead.id };
  } catch {
    return {
      ok: false,
      error: "Could not reach the server. Please try again in a moment.",
    };
  }
}

export async function submitContactLead(
  contact: SubmitLeadContact,
): Promise<SubmitLeadResult> {
  try {
    const response = await fetch(adminApiUrl("/api/leads"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "QUOTE_FORM",
        coverageType: "contact",
        message: "Requested contact from the homepage.",
        contact,
      }),
      cache: "no-store",
    });

    const data = (await response.json().catch(() => null)) as {
      error?: string;
      lead?: { id: number };
    } | null;

    if (!response.ok) {
      return {
        ok: false,
        error: data?.error ?? "Could not submit your request. Please try again.",
      };
    }

    if (!data?.lead?.id) {
      return { ok: false, error: "Unexpected response from the server." };
    }

    return { ok: true, leadId: data.lead.id };
  } catch {
    return {
      ok: false,
      error: "Could not reach the server. Please try again in a moment.",
    };
  }
}
