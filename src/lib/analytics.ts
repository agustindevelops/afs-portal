"use client";

import { sendGTMEvent } from "@next/third-parties/google";

export type QuoteStep = "step_1" | "step_2";

type AnalyticsPayload = {
  event: string;
  quote_step?: QuoteStep;
};

function track(payload: AnalyticsPayload) {
  if (!process.env.NEXT_PUBLIC_GTM_ID?.trim()) return;
  sendGTMEvent(payload);
}

export const analytics = {
  quoteStart() {
    track({ event: "quote_start" });
  },

  quoteStepComplete(step: QuoteStep) {
    track({
      event: "quote_step_complete",
      quote_step: step,
    });
  },

  contactStepView() {
    track({ event: "contact_step_view" });
  },

  generateLead() {
    track({ event: "generate_lead" });
  },

  scheduleView() {
    track({ event: "schedule_view" });
  },

  scheduleStart() {
    track({ event: "schedule_start" });
  },

  appointmentScheduled() {
    track({ event: "appointment_scheduled" });
  },
};
