"use client";

import { useMemo, useState, useTransition } from "react";
import { Headset, X } from "lucide-react";
import { submitAgentAssistLead } from "@/app/actions/submit-agent-assist-lead";
import { Button } from "@/components/ui/button";
import type { CmsData } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-lg border border-border-control bg-white px-3 text-sm text-brand-navy-950 outline-none transition-[border-color,box-shadow] placeholder:text-text-muted focus-visible:border-brand-blue-600 focus-visible:ring-[3px] focus-visible:ring-brand-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

type Step = "coverage" | "choice" | "agent" | "done";

export function HelpWidget({ cms }: { cms: CmsData }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("coverage");
  const [coverage, setCoverage] = useState("");
  const [need, setNeed] = useState("");
  const [callTime, setCallTime] = useState("");
  const [notes, setNotes] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const enrollmentHref = useMemo(() => {
    if (!coverage) return null;
    const match = cms.enrollmentLinks.find(
      (link) => link.coverageKey === coverage && link.href,
    );
    return match?.href || null;
  }, [cms, coverage]);

  function reset() {
    setStep("coverage");
    setCoverage("");
    setNeed("");
    setCallTime("");
    setNotes("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setError(null);
  }

  function close() {
    setOpen(false);
    reset();
  }

  function submitAgent() {
    if (!firstName.trim() || !lastName.trim()) {
      setError("Enter your first and last name");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Enter a valid phone number");
      return;
    }
    if (!need) {
      setError("Select what you need help with");
      return;
    }
    if (!callTime) {
      setError("Choose the best time to call");
      return;
    }

    setError(null);
    startTransition(async () => {
      const needLabel =
        cms.helpWidget.needOptions.find((option) => option.value === need)
          ?.label ?? need;
      const result = await submitAgentAssistLead({
        coverageType: coverage,
        need: needLabel,
        preferredCallTime: callTime,
        notes: notes.trim() || undefined,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setStep("done");
    });
  }

  return (
    <div className="print:hidden fixed inset-y-0 right-0 z-30 flex items-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-28 w-11 flex-col items-center justify-center gap-2 rounded-l-xl border border-r-0 border-brand-gold-500 bg-brand-navy-950 text-white shadow-lg outline-none focus-visible:ring-[3px] focus-visible:ring-brand-gold-200"
        aria-expanded={open}
        aria-controls="help-widget-panel"
      >
        <Headset className="size-4 text-brand-gold-200" aria-hidden />
        <span className="[writing-mode:vertical-rl] text-xs font-medium tracking-wide">
          Need help?
        </span>
      </button>

      {open ? (
        <div
          id="help-widget-panel"
          className="absolute right-11 bottom-4 w-[min(100vw-4.5rem,22rem)] rounded-2xl border border-border-subtle bg-white p-4 shadow-[0_16px_40px_rgba(3,37,61,0.18)] sm:bottom-8"
          role="dialog"
          aria-label={cms.helpWidget.title}
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-brand-blue-700 uppercase">
                Help
              </p>
              <h2 className="mt-1 text-lg font-semibold text-brand-navy-950">
                {cms.helpWidget.title}
              </h2>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Close help widget"
              onClick={close}
            >
              <X />
            </Button>
          </div>

          {step === "coverage" ? (
            <div className="space-y-2">
              <p className="text-sm text-text-secondary">
                Step 1 of 2 — What coverage do you need help with?
              </p>
              <ul className="grid gap-2">
                {cms.helpWidget.coverageTypes.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      className="w-full rounded-xl border border-border-subtle px-3 py-3 text-left text-sm font-medium text-brand-navy-950 hover:border-brand-blue-600/50"
                      onClick={() => {
                        setCoverage(option.value);
                        setStep("choice");
                      }}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {step === "choice" ? (
            <div className="space-y-3">
              <p className="text-sm text-text-secondary">
                Step 2 of 2 — How would you like to continue?
              </p>
              <Button
                type="button"
                className="w-full"
                onClick={() => setStep("agent")}
              >
                Contact an agent
              </Button>
              {enrollmentHref ? (
                <a
                  href={enrollmentHref}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex h-11 w-full items-center justify-center rounded-lg border border-brand-blue-700 text-sm font-medium text-brand-blue-700 hover:bg-surface-subtle",
                  )}
                >
                  Self-enroll
                </a>
              ) : (
                <p className="rounded-xl border border-border-subtle bg-surface-subtle px-3 py-3 text-sm text-text-secondary">
                  Self-enrollment for this coverage is not linked yet. Contact an
                  agent and we will help you next.
                </p>
              )}
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep("coverage")}
              >
                Back
              </Button>
            </div>
          ) : null}

          {step === "agent" ? (
            <div className="space-y-3">
              <p className="text-sm text-text-secondary">
                Tell us a little more. You can mention other coverage interests
                beyond your original selection.
              </p>
              <label className="grid gap-1 text-sm font-medium">
                What do you need?
                <select
                  className={fieldClassName}
                  value={need}
                  onChange={(event) => setNeed(event.target.value)}
                >
                  <option value="">Select an option</option>
                  {cms.helpWidget.needOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-sm font-medium">
                Best time to call
                <select
                  className={fieldClassName}
                  value={callTime}
                  onChange={(event) => setCallTime(event.target.value)}
                >
                  <option value="">Select a time</option>
                  {cms.helpWidget.callTimeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="grid gap-1 text-sm font-medium">
                  First name
                  <input
                    className={fieldClassName}
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </label>
                <label className="grid gap-1 text-sm font-medium">
                  Last name
                  <input
                    className={fieldClassName}
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </label>
              </div>
              <label className="grid gap-1 text-sm font-medium">
                Email
                <input
                  type="email"
                  className={fieldClassName}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <label className="grid gap-1 text-sm font-medium">
                Phone
                <input
                  className={fieldClassName}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </label>
              <label className="grid gap-1 text-sm font-medium">
                Anything you want us to know first
                <textarea
                  className={cn(fieldClassName, "h-20 resize-y py-2")}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </label>
              {error ? (
                <p className="text-sm text-error" role="alert">
                  {error}
                </p>
              ) : null}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1"
                  onClick={() => setStep("choice")}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  className="flex-1"
                  disabled={pending}
                  onClick={submitAgent}
                >
                  {pending ? "Sending…" : "Submit"}
                </Button>
              </div>
            </div>
          ) : null}

          {step === "done" ? (
            <div className="space-y-3">
              <p className="text-sm text-text-secondary">
                Thanks — an advisor will follow up using the details you shared.
              </p>
              <Button type="button" className="w-full" onClick={close}>
                Close
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
