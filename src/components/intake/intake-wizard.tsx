"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ExternalLink } from "lucide-react";
import {
  submitContactLead,
  submitIntakeLead,
} from "@/app/actions/submit-intake-lead";
import { Button, buttonVariants } from "@/components/ui/button";
import { analytics } from "@/lib/analytics";
import { choiceIcon, IMG_TRAVEL_URL } from "@/lib/intake-icons";
import {
  type IntakeAnswerPayload,
  type IntakeEdge,
  type IntakeFlowPayload,
} from "@/lib/intake";
import { cn } from "@/lib/utils";

type HistoryEntry = {
  questionKey: string;
  answer: IntakeAnswerPayload;
};

type Phase = "questions" | "contact" | "submitted" | "redirected" | "error";

function initialCoverageSkip(flow: IntakeFlowPayload, initialCoverageKey?: string) {
  if (!initialCoverageKey) return null;
  const start = flow.questions.find(
    (question) => question.key === flow.startQuestionKey,
  );
  const edge = start?.edges.find((item) => item.choiceKey === initialCoverageKey);
  if (!start || !edge) return null;

  const goesToContact = edge.outcome === "COMPLETE" || !edge.toQuestionKey;
  return {
    history: [
      {
        questionKey: start.key,
        answer: { questionKey: start.key, choiceKey: edge.choiceKey },
      },
    ] satisfies HistoryEntry[],
    currentKey: goesToContact ? start.key : (edge.toQuestionKey ?? start.key),
    phase: (goesToContact ? "contact" : "questions") as Phase,
    questionKey: start.key,
    redirected: edge.outcome === "REDIRECT",
  };
}

type ContactFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  callTime: string;
};

const CALL_TIME_OPTIONS = [
  { key: "morning", label: "Morning" },
  { key: "afternoon", label: "Afternoon" },
  { key: "evening_weekend", label: "Evening / weekend by appointment" },
] as const;

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-lg border border-border-control bg-white px-3 text-sm text-brand-navy-950 outline-none transition-[border-color,box-shadow] placeholder:text-text-muted focus-visible:border-brand-blue-600 focus-visible:ring-[3px] focus-visible:ring-brand-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

function emptyContactForm(): ContactFormState {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    callTime: "",
  };
}

function validateContactForm(form: ContactFormState) {
  if (!form.firstName.trim()) return "Enter your first name";
  if (!form.lastName.trim()) return "Enter your last name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    return "Enter a valid email";
  }
  if (form.phone.replace(/\D/g, "").length < 10) {
    return "Enter a valid phone number";
  }
  if (!form.callTime) return "Choose the best time to contact you";
  return null;
}

function selectionStepLabel(phase: Phase, questionKey: string) {
  if (phase === "contact") return "Step 3 of 3";
  if (questionKey === "coverage") return "Step 1 of 3";
  if (questionKey.startsWith("concern_")) return "Step 2 of 3";
  return "Step 1 of 3";
}

export function IntakeWizard({
  flow,
  className,
  onComplete,
  initialCoverageKey,
  quoteAlreadyStarted = false,
  reserveCloseSpace = false,
  contactOnly = false,
}: {
  flow: IntakeFlowPayload | null;
  className?: string;
  onComplete?: () => void;
  initialCoverageKey?: string;
  quoteAlreadyStarted?: boolean;
  reserveCloseSpace?: boolean;
  contactOnly?: boolean;
}) {
  const questionsByKey = useMemo(() => {
    return new Map(
      (flow?.questions ?? []).map((question) => [question.key, question]),
    );
  }, [flow]);

  const [history, setHistory] = useState<HistoryEntry[]>(() =>
    !contactOnly && flow
      ? (initialCoverageSkip(flow, initialCoverageKey)?.history ?? [])
      : [],
  );
  const [currentKey, setCurrentKey] = useState(() => {
    if (contactOnly || !flow) return flow?.startQuestionKey ?? "";
    return (
      initialCoverageSkip(flow, initialCoverageKey)?.currentKey ??
      flow.startQuestionKey
    );
  });
  const [contactForm, setContactForm] = useState<ContactFormState>(emptyContactForm);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>(() => {
    if (contactOnly) return "contact";
    if (!flow) return "questions";
    return initialCoverageSkip(flow, initialCoverageKey)?.phase ?? "questions";
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [pending, startTransition] = useTransition();
  const quoteStarted = useRef(quoteAlreadyStarted);
  const completedStep1 = useRef(false);
  const completedStep2 = useRef(false);
  const contactViewed = useRef(false);
  const recordedInitialSkip = useRef(false);

  const current = questionsByKey.get(currentKey);

  const coverageKey = useMemo(() => {
    const coverageAnswer = history.find(
      (entry) => entry.questionKey === "coverage",
    );
    return coverageAnswer?.answer.choiceKey;
  }, [history]);

  function clearStepTracking() {
    completedStep1.current = false;
    completedStep2.current = false;
    contactViewed.current = false;
  }

  const trackQuestionAdvance = useCallback((questionKey: string, redirected: boolean) => {
    if (!quoteStarted.current) {
      analytics.quoteStart();
      quoteStarted.current = true;
    }
    if (redirected) return;

    if (questionKey === "coverage" && !completedStep1.current) {
      analytics.quoteStepComplete("step_1");
      completedStep1.current = true;
      return;
    }

    if (questionKey.startsWith("concern_") && !completedStep2.current) {
      analytics.quoteStepComplete("step_2");
      completedStep2.current = true;
    }
  }, []);

  useEffect(() => {
    if (contactOnly || !flow || recordedInitialSkip.current) return;
    const skip = initialCoverageSkip(flow, initialCoverageKey);
    if (!skip) return;
    recordedInitialSkip.current = true;
    trackQuestionAdvance(skip.questionKey, skip.redirected);
  }, [contactOnly, flow, initialCoverageKey, trackQuestionAdvance]);

  useEffect(() => {
    if (phase !== "contact" || contactViewed.current) return;
    contactViewed.current = true;
    analytics.contactStepView();
  }, [phase]);

  function reset() {
    setHistory([]);
    setCurrentKey(flow?.startQuestionKey ?? "");
    setContactForm(emptyContactForm());
    setFieldError(null);
    setPhase(contactOnly ? "contact" : "questions");
    setSubmitError(null);
    setRedirectUrl(null);
    setPressedKey(null);
    setAnimKey((value) => value + 1);
    clearStepTracking();
  }

  function restart() {
    reset();
    if (contactOnly) return;
    analytics.quoteStart();
    quoteStarted.current = true;
  }

  function goBack() {
    if (history.length === 0 || pending) return;

    if (phase === "contact") {
      const previous = history[history.length - 1];
      setPhase("questions");
      setCurrentKey(previous.questionKey);
      setHistory((items) => items.slice(0, -1));
      setContactForm(emptyContactForm());
      setFieldError(null);
      setAnimKey((value) => value + 1);
      return;
    }

    const previous = history[history.length - 1];
    setHistory((items) => items.slice(0, -1));
    setCurrentKey(previous.questionKey);
    setFieldError(null);
    setPhase("questions");
    setSubmitError(null);
    setAnimKey((value) => value + 1);
  }

  function advance(edge: IntakeEdge) {
    if (!current) return;

    const answer: IntakeAnswerPayload = {
      questionKey: current.key,
      choiceKey: edge.choiceKey,
    };
    const nextHistory = [...history, { questionKey: current.key, answer }];
    trackQuestionAdvance(current.key, edge.outcome === "REDIRECT");

    if (edge.outcome === "REDIRECT") {
      setHistory(nextHistory);
      setRedirectUrl(edge.redirectUrl);
      setPhase("redirected");
      if (edge.redirectUrl && typeof window !== "undefined") {
        window.open(edge.redirectUrl, "_blank", "noopener,noreferrer");
      }
      return;
    }

    if (edge.outcome === "COMPLETE" || !edge.toQuestionKey) {
      setHistory(nextHistory);
      setContactForm(emptyContactForm());
      setFieldError(null);
      setPhase("contact");
      setAnimKey((value) => value + 1);
      return;
    }

    setHistory(nextHistory);
    setCurrentKey(edge.toQuestionKey);
    setFieldError(null);
    setPhase("questions");
    setAnimKey((value) => value + 1);
  }

  function onChoose(edge: IntakeEdge) {
    if (pending) return;
    setPressedKey(edge.choiceKey);
    window.setTimeout(() => {
      setPressedKey(null);
      advance(edge);
    }, 120);
  }

  function onSubmitContact() {
    if (pending) return;
    const error = validateContactForm(contactForm);
    if (error) {
      setFieldError(error);
      return;
    }

    startTransition(async () => {
      const contact = {
        firstName: contactForm.firstName.trim(),
        lastName: contactForm.lastName.trim(),
        email: contactForm.email.trim().toLowerCase(),
        phone: contactForm.phone.trim(),
        preferredCallTime: contactForm.callTime,
      };
      const result = contactOnly
        ? await submitContactLead(contact)
        : flow
          ? await submitIntakeLead({
              flowSlug: flow.flow.slug,
              answers: history.map((entry) => entry.answer),
              contact,
            })
          : { ok: false as const, error: "This form could not be loaded." };
      if (!result.ok) {
        setSubmitError(result.error);
        setPhase("error");
        return;
      }
      analytics.generateLead();
      setPhase("submitted");
    });
  }

  if (!current && phase === "questions") {
    return (
      <div
        className={cn("rounded-2xl bg-white p-6 text-brand-navy-950", className)}
      >
        <p className="text-sm text-error">
          This intake flow could not be loaded.
        </p>
      </div>
    );
  }

  const progressLabel = selectionStepLabel(phase, currentKey);
  const showSelectionProgress =
    phase === "contact" ||
    currentKey === "coverage" ||
    currentKey.startsWith("concern_");

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white text-brand-navy-950 shadow-[0_24px_60px_rgba(3,37,61,0.28)]",
        !contactOnly && "min-h-[28rem]",
        className,
      )}
    >
      <div
        className={cn(
          "border-b border-border-subtle bg-surface-subtle/70 px-5 py-3 sm:px-6",
          reserveCloseSpace && "pt-5",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-3",
            reserveCloseSpace && "pr-10 sm:pr-12",
          )}
        >
          <p className="text-xs font-semibold tracking-[0.18em] text-brand-gold-700 uppercase">
            {contactOnly
              ? "Contact"
              : phase === "questions" || phase === "contact"
                ? progressLabel
                : "Coverage guide"}
          </p>
          {!contactOnly &&
          (phase === "questions" || phase === "contact") &&
          history.length > 0 ? (
            <button
              type="button"
              onClick={goBack}
              disabled={pending}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-brand-link transition-colors hover:bg-white hover:text-brand-navy-900 focus-visible:ring-[3px] focus-visible:ring-brand-gold-200 focus-visible:outline-none disabled:opacity-50"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Back
            </button>
          ) : null}
        </div>
        {!contactOnly &&
        (phase === "questions" || phase === "contact") &&
        showSelectionProgress ? (
          <div className="mt-3 flex gap-1.5" aria-hidden="true">
            {[1, 2, 3].map((step) => {
              const currentStep =
                phase === "contact"
                  ? 3
                  : currentKey === "coverage"
                    ? 1
                    : currentKey.startsWith("concern_")
                      ? 2
                      : 1;
              return (
                <span
                  key={step}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors duration-300",
                    step <= currentStep ? "bg-brand-gold-500" : "bg-border-subtle",
                  )}
                />
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {phase === "submitted" ? (
          <div className="flex flex-1 flex-col justify-center space-y-4 py-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <CheckCircle2 className="size-10 text-success" aria-hidden="true" />
            <div className="space-y-2">
              <p className="text-sm font-medium tracking-[0.18em] text-brand-gold-700 uppercase">
                {contactOnly ? "Message received" : "Request received"}
              </p>
              <h3 className="text-2xl font-semibold">Thank you</h3>
              <p className="text-text-secondary">
                We received your details. A licensed advisor will reply within
                1-2 business days.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button type="button" onClick={restart}>
                {contactOnly ? "Send another message" : "Start another request"}
              </Button>
              {onComplete ? (
                <Button type="button" variant="outline" onClick={onComplete}>
                  Close
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}

        {phase === "redirected" ? (
          <div className="flex flex-1 flex-col justify-center space-y-4 py-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <ExternalLink
              className="size-10 text-brand-blue-700"
              aria-hidden="true"
            />
            <div className="space-y-2">
              <p className="text-sm font-medium tracking-[0.18em] text-brand-gold-700 uppercase">
                Self-serve path
              </p>
              <h3 className="text-2xl font-semibold">Nothing was submitted</h3>
              <p className="text-text-secondary">
                You chose to continue on your own, so we did not create a lead.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {redirectUrl ? (
                <a
                  href={redirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants()}
                >
                  Open enrollment
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              ) : null}
              <Button type="button" variant="outline" onClick={reset}>
                Back to questions
              </Button>
            </div>
          </div>
        ) : null}

        {phase === "error" ? (
          <div className="flex flex-1 flex-col justify-center space-y-3 py-4">
            <h3 className="text-2xl font-semibold">Something went wrong</h3>
            <p className="text-error" role="alert">
              {submitError}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button type="button" onClick={() => setPhase("contact")}>
                Try again
              </Button>
              <Button type="button" variant="outline" onClick={restart}>
                Start over
              </Button>
            </div>
          </div>
        ) : null}

        {phase === "contact" ? (
          <div
            key={animKey}
            className="flex flex-1 flex-col animate-in fade-in slide-in-from-right-2 duration-300"
          >
            <h3 className="text-2xl font-semibold leading-snug">
              How can we reach you?
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              Share your details and a licensed advisor will follow up.
            </p>

            <div className="mt-5 grid flex-1 gap-3 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                First name
                <input
                  autoFocus={!contactOnly}
                  name="firstName"
                  autoComplete="given-name"
                  value={contactForm.firstName}
                  onChange={(event) => {
                    setContactForm((prev) => ({
                      ...prev,
                      firstName: event.target.value,
                    }));
                    setFieldError(null);
                  }}
                  className={fieldClassName}
                />
              </label>
              <label className="block text-sm font-medium">
                Last name
                <input
                  name="lastName"
                  autoComplete="family-name"
                  value={contactForm.lastName}
                  onChange={(event) => {
                    setContactForm((prev) => ({
                      ...prev,
                      lastName: event.target.value,
                    }));
                    setFieldError(null);
                  }}
                  className={fieldClassName}
                />
              </label>
              <label className="block text-sm font-medium sm:col-span-2">
                Email
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={contactForm.email}
                  onChange={(event) => {
                    setContactForm((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }));
                    setFieldError(null);
                  }}
                  className={fieldClassName}
                />
              </label>
              <label className="block text-sm font-medium sm:col-span-2">
                Phone
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={contactForm.phone}
                  onChange={(event) => {
                    setContactForm((prev) => ({
                      ...prev,
                      phone: event.target.value,
                    }));
                    setFieldError(null);
                  }}
                  className={fieldClassName}
                />
              </label>
              <fieldset className="sm:col-span-2">
                <legend className="text-sm font-medium">
                  When should we contact you?
                </legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {CALL_TIME_OPTIONS.map((option) => {
                    const selected = contactForm.callTime === option.key;
                    const isPressed = pressedKey === option.key;
                    return (
                      <button
                        key={option.key}
                        type="button"
                        disabled={pending}
                        aria-pressed={selected}
                        onPointerDown={() => {
                          if (pending) return;
                          setPressedKey(option.key);
                          setContactForm((prev) => ({
                            ...prev,
                            callTime: option.key,
                          }));
                          setFieldError(null);
                        }}
                        onPointerUp={() => setPressedKey(null)}
                        onPointerLeave={() => setPressedKey(null)}
                        onPointerCancel={() => setPressedKey(null)}
                        className={cn(
                          "rounded-xl border px-3 py-3 text-left text-sm font-semibold transition-all duration-100",
                          "active:translate-y-0 active:scale-[0.96] active:border-brand-gold-500 active:bg-brand-gold-200/55 active:shadow-inner",
                          "focus-visible:ring-[3px] focus-visible:ring-brand-gold-200 focus-visible:outline-none",
                          selected
                            ? "border-brand-gold-500 bg-brand-gold-200/35 text-brand-navy-950 shadow-[inset_0_0_0_1px_rgba(212,167,44,0.45)] hover:-translate-y-0.5 hover:border-brand-gold-500 hover:bg-brand-gold-200/45 hover:shadow-[0_8px_18px_rgba(212,167,44,0.18)]"
                            : "border-border-subtle bg-surface-subtle/50 text-brand-navy-950 hover:-translate-y-0.5 hover:border-brand-blue-600/45 hover:bg-surface-subtle hover:shadow-[0_8px_18px_rgba(3,37,61,0.08)]",
                          isPressed &&
                            "translate-y-0 scale-[0.96] border-brand-gold-500 bg-brand-gold-200/55 shadow-inner",
                        )}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span>{option.label}</span>
                          <span
                            className={cn(
                              "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all duration-100",
                              selected || isPressed
                                ? "border-brand-gold-500 bg-brand-gold-500 text-brand-navy-950"
                                : "border-border-control/50 bg-white text-transparent",
                            )}
                            aria-hidden="true"
                          >
                            <Check className="size-3 stroke-[3]" />
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>            </div>

            {fieldError ? (
              <p className="mt-3 text-sm font-medium text-error" role="alert">
                {fieldError}
              </p>
            ) : null}

            <div className="mt-4 space-y-2">
              <Button
                type="button"
                size="lg"
                disabled={pending}
                onClick={onSubmitContact}
                className="w-full transition-transform active:scale-[0.99]"
              >
                {pending
                  ? "Sending…"
                  : contactOnly
                    ? "Send my information"
                    : "Submit request"}
                {!pending ? (
                  <ArrowRight className="size-4" aria-hidden="true" />
                ) : null}
              </Button>
              {coverageKey === "travel" ? (
                <a
                  href={IMG_TRAVEL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "w-full",
                  )}
                >
                  Or buy travel cover yourself
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </div>
        ) : null}

        {phase === "questions" && current ? (
          <div
            key={animKey}
            className="flex flex-1 flex-col animate-in fade-in slide-in-from-right-2 duration-300"
          >
            <h3 className="text-2xl font-semibold leading-snug">
              {current.prompt}
            </h3>
            {current.helpText ? (
              <p className="mt-2 text-sm text-text-secondary">
                {current.helpText}
              </p>
            ) : null}

            <ul className="mt-5 flex-1 space-y-2">
              {current.edges.map((edge) => {
                const Icon = choiceIcon(edge.choiceKey);
                const isPressed = pressedKey === edge.choiceKey;
                return (
                  <li key={edge.id}>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => onChoose(edge)}
                      className={cn(
                        "group flex w-full items-start gap-3 rounded-xl border border-border-subtle bg-surface-subtle/50 px-3.5 py-3 text-left transition-all duration-150",
                        "hover:-translate-y-0.5 hover:border-brand-blue-600/45 hover:bg-white hover:shadow-[0_10px_24px_rgba(3,37,61,0.08)]",
                        "active:translate-y-0 active:scale-[0.99]",
                        "focus-visible:ring-[3px] focus-visible:ring-brand-gold-200 focus-visible:outline-none",
                        "disabled:pointer-events-none disabled:opacity-60",
                        isPressed &&
                          "border-brand-gold-500 bg-brand-gold-200/25 shadow-[0_8px_18px_rgba(212,167,44,0.18)]",
                      )}
                    >
                      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy-950 text-brand-gold-200 transition-transform duration-150 group-hover:scale-105">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-brand-navy-950">
                          {edge.choiceLabel}
                        </span>
                        {edge.choiceDescription ? (
                          <span className="mt-0.5 block text-sm text-text-secondary">
                            {edge.choiceDescription}
                          </span>
                        ) : null}
                      </span>
                      <ArrowRight
                        className="mt-2 size-4 shrink-0 text-border-control transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-brand-blue-700"
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
