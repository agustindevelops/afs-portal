"use server";

import { adminApiUrl } from "@/lib/admin-api";

export type SubmitAgentAssistResult =
  | { ok: true; leadId: number }
  | { ok: false; error: string };

export async function submitAgentAssistLead(input: {
  coverageType: string;
  need: string;
  preferredCallTime: string;
  notes?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}): Promise<SubmitAgentAssistResult> {
  try {
    const response = await fetch(adminApiUrl("/api/leads"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "QUOTE_FORM",
        contact: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          preferredCallTime: input.preferredCallTime,
        },
        coverageType: input.coverageType,
        message: [
          `Need: ${input.need}`,
          input.notes ? `Notes: ${input.notes}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
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
