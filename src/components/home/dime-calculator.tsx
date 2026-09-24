"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, GraduationCap, Home, Landmark, Wallet } from "lucide-react";
import { QuoteTrigger } from "@/components/intake/quote-trigger";
import { Button } from "@/components/ui/button";
import { calculateDime, formatCurrency } from "@/lib/dime";
import { siteContainer, states } from "@/lib/site";
import { cn } from "@/lib/utils";

type StepKey = "intro" | "debt" | "income" | "mortgage" | "education" | "result";

type FormState = {
  debt: string;
  annualIncome: string;
  incomeYears: string;
  mortgage: string;
  education: string;
};

const FLOW_STEPS: Exclude<StepKey, "intro">[] = [
  "debt",
  "income",
  "mortgage",
  "education",
  "result",
];

const STEP_META: Record<
  Exclude<StepKey, "intro" | "result">,
  { title: string; description: string; letter: string }
> = {
  debt: {
    letter: "D",
    title: "Debt",
    description:
      "Enter debts you would want paid off — credit cards, student loans, auto loans, and similar balances. Leave the mortgage for the next steps.",
  },
  income: {
    letter: "I",
    title: "Income",
    description:
      "Enter your annual income and how many years of income you would want replaced for your household.",
  },
  mortgage: {
    letter: "M",
    title: "Mortgage",
    description:
      "Enter the remaining balance on your home loan. Use 0 if you do not have a mortgage.",
  },
  education: {
    letter: "E",
    title: "Education",
    description:
      "Estimate future education costs you would want covered for children or other dependents.",
  },
};

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-lg border border-border-control bg-white px-3 text-sm text-brand-navy-950 outline-none transition-[border-color,box-shadow] placeholder:text-text-muted focus-visible:border-brand-blue-600 focus-visible:ring-[3px] focus-visible:ring-brand-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

function emptyForm(): FormState {
  return {
    debt: "",
    annualIncome: "",
    incomeYears: "10",
    mortgage: "",
    education: "",
  };
}

function parseAmount(value: string) {
  const cleaned = value.replace(/[$,\s]/g, "");
  if (cleaned === "") return null;
  const amount = Number(cleaned);
  if (!Number.isFinite(amount) || amount < 0) return null;
  return amount;
}

function parseYears(value: string) {
  const years = Number(value);
  if (!Number.isInteger(years) || years < 1 || years > 40) return null;
  return years;
}

export function DimeCalculator() {
  const [step, setStep] = useState<StepKey>("intro");
  const [stateCode, setStateCode] = useState<(typeof states)[number]["value"]>("TX");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const stateLabel =
    states.find((item) => item.value === stateCode)?.label ?? "Texas";

  const isIntro = step === "intro";
  const isResult = step === "result";
  const flowStep =
    step === "intro" || step === "result" ? null : step;
  const stepIndex = flowStep ? FLOW_STEPS.indexOf(flowStep) : -1;

  const breakdown = useMemo(() => {
    const debt = parseAmount(form.debt) ?? 0;
    const annualIncome = parseAmount(form.annualIncome) ?? 0;
    const incomeYears = parseYears(form.incomeYears) ?? 0;
    const mortgage = parseAmount(form.mortgage) ?? 0;
    const education = parseAmount(form.education) ?? 0;
    return calculateDime({
      debt,
      annualIncome,
      incomeYears,
      mortgage,
      education,
    });
  }, [form]);

  function goTo(next: StepKey) {
    setFieldError(null);
    setAnimKey((key) => key + 1);
    setStep(next);
  }

  function validateCurrentStep() {
    if (step === "debt") {
      if (parseAmount(form.debt) === null) return "Enter a debt amount (0 is fine)";
      return null;
    }
    if (step === "income") {
      if (parseAmount(form.annualIncome) === null) {
        return "Enter your annual income (0 is fine)";
      }
      if (parseYears(form.incomeYears) === null) {
        return "Enter years to replace between 1 and 40";
      }
      return null;
    }
    if (step === "mortgage") {
      if (parseAmount(form.mortgage) === null) {
        return "Enter a mortgage balance (0 is fine)";
      }
      return null;
    }
    if (step === "education") {
      if (parseAmount(form.education) === null) {
        return "Enter an education amount (0 is fine)";
      }
      return null;
    }
    return null;
  }

  function handleContinue() {
    const error = validateCurrentStep();
    if (error) {
      setFieldError(error);
      return;
    }
    const next = FLOW_STEPS[stepIndex + 1];
    if (next) goTo(next);
  }

  function handleBack() {
    if (step === "debt") {
      goTo("intro");
      return;
    }
    const prev = FLOW_STEPS[stepIndex - 1];
    if (prev) goTo(prev);
  }

  function handleStartOver() {
    setForm(emptyForm());
    goTo("intro");
  }

  function handleStart() {
    goTo("debt");
  }

  return (
    <section id="dime" className="scroll-mt-24 bg-surface-subtle py-16 sm:py-20">
      <div
        className={cn(
          siteContainer,
          "grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start",
        )}
      >
        <div className="space-y-4">
          <p className="text-sm font-medium tracking-[0.18em] text-brand-gold-700 uppercase">
            Life insurance needs
          </p>
          <h2 className="text-3xl font-semibold text-brand-navy-950 sm:text-4xl">
            Estimate coverage with the{" "}
            <span className="font-accent font-medium text-brand-gold-700 italic">
              DIME
            </span>{" "}
            method
          </h2>
          <p className="max-w-md text-text-secondary">
            Debt, Income, Mortgage, and Education add up to a starting estimate
            of how much life insurance your household may need. This is a guide
            only — an advisor can refine the numbers with you.
          </p>
          <ul className="grid gap-2 text-sm text-brand-navy-950 sm:grid-cols-2">
            {(
              [
                { letter: "D", label: "Debt", Icon: Landmark },
                { letter: "I", label: "Income", Icon: Wallet },
                { letter: "M", label: "Mortgage", Icon: Home },
                { letter: "E", label: "Education", Icon: GraduationCap },
              ] as const
            ).map((item) => (
              <li
                key={item.letter}
                className="flex items-center gap-2.5 rounded-xl border border-border-subtle bg-surface-card px-3 py-2.5"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-brand-navy-950 text-sm font-semibold text-brand-gold-200">
                  {item.letter}
                </span>
                <item.Icon className="size-4 text-brand-blue-700" aria-hidden />
                <span className="font-medium">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-[0_16px_40px_rgba(3,37,61,0.08)] sm:p-7">
          <div className="absolute top-5 right-5 sm:top-6 sm:right-6">
            <div
              role="radiogroup"
              aria-label="State"
              className="relative inline-grid grid-cols-2 rounded-full border border-border-control bg-surface-subtle p-1"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-brand-navy-950 shadow-sm transition-transform duration-200",
                  stateCode === "FL" && "translate-x-full",
                )}
              />
              {states.map((item) => {
                const selected = stateCode === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setStateCode(item.value)}
                    className={cn(
                      "relative z-10 min-w-[4.5rem] rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                      selected
                        ? "text-brand-gold-200"
                        : "text-text-secondary hover:text-brand-navy-950",
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pr-28 sm:pr-36">
            {isIntro ? (
              <p className="text-sm font-medium tracking-[0.14em] text-brand-gold-700 uppercase">
                Get an estimate
              </p>
            ) : !isResult ? (
              <p className="text-sm font-medium tracking-[0.14em] text-brand-gold-700 uppercase">
                Step {stepIndex + 1} of 4
              </p>
            ) : (
              <p className="text-sm font-medium tracking-[0.14em] text-brand-gold-700 uppercase">
                Your estimate
              </p>
            )}
          </div>

          <div
            key={animKey}
            className="mt-4 animate-in fade-in slide-in-from-right-2 duration-300"
          >
            {isIntro ? (
              <>
                <h3 className="text-2xl font-semibold text-brand-navy-950">
                  Want a quick life insurance estimate?
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  The DIME method adds four everyday numbers so you can see a
                  starting coverage need — no personal info required, and nothing
                  is saved.
                </p>

                <ul className="mt-5 space-y-3 text-sm text-brand-navy-950">
                  <li className="rounded-xl border border-border-subtle bg-surface-subtle/70 px-3 py-3">
                    <span className="font-semibold">Debt</span>
                    <span className="text-text-secondary">
                      {" "}
                      — balances you would want paid off (not including the
                      mortgage).
                    </span>
                  </li>
                  <li className="rounded-xl border border-border-subtle bg-surface-subtle/70 px-3 py-3">
                    <span className="font-semibold">Income</span>
                    <span className="text-text-secondary">
                      {" "}
                      — annual income multiplied by the years you would want
                      replaced.
                    </span>
                  </li>
                  <li className="rounded-xl border border-border-subtle bg-surface-subtle/70 px-3 py-3">
                    <span className="font-semibold">Mortgage</span>
                    <span className="text-text-secondary">
                      {" "}
                      — remaining home loan balance, or 0 if you have none.
                    </span>
                  </li>
                  <li className="rounded-xl border border-border-subtle bg-surface-subtle/70 px-3 py-3">
                    <span className="font-semibold">Education</span>
                    <span className="text-text-secondary">
                      {" "}
                      — estimated future education costs for dependents.
                    </span>
                  </li>
                </ul>

                <p className="mt-4 text-sm text-text-secondary">
                  We add those four pieces together for your estimate. Ready to
                  try it?
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Button type="button" onClick={handleStart}>
                    Yes, get my estimate
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </div>
              </>
            ) : flowStep ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-brand-navy-950 text-lg font-semibold text-brand-gold-200">
                    {STEP_META[flowStep].letter}
                  </span>
                  <h3 className="text-2xl font-semibold text-brand-navy-950">
                    {STEP_META[flowStep].title}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-text-secondary">
                  {STEP_META[flowStep].description}
                </p>

                <div className="mt-5 space-y-4">
                  {step === "debt" ? (
                    <label className="block text-sm font-medium text-brand-navy-950">
                      Total other debts
                      <input
                        autoFocus
                        inputMode="decimal"
                        name="debt"
                        placeholder="0"
                        value={form.debt}
                        onChange={(event) => {
                          setForm((prev) => ({ ...prev, debt: event.target.value }));
                          setFieldError(null);
                        }}
                        className={fieldClassName}
                      />
                    </label>
                  ) : null}

                  {step === "income" ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-sm font-medium text-brand-navy-950">
                        Annual income
                        <input
                          autoFocus
                          inputMode="decimal"
                          name="annualIncome"
                          placeholder="0"
                          value={form.annualIncome}
                          onChange={(event) => {
                            setForm((prev) => ({
                              ...prev,
                              annualIncome: event.target.value,
                            }));
                            setFieldError(null);
                          }}
                          className={fieldClassName}
                        />
                      </label>
                      <label className="block text-sm font-medium text-brand-navy-950">
                        Years to replace
                        <input
                          inputMode="numeric"
                          name="incomeYears"
                          min={1}
                          max={40}
                          value={form.incomeYears}
                          onChange={(event) => {
                            setForm((prev) => ({
                              ...prev,
                              incomeYears: event.target.value,
                            }));
                            setFieldError(null);
                          }}
                          className={fieldClassName}
                        />
                      </label>
                    </div>
                  ) : null}

                  {step === "mortgage" ? (
                    <label className="block text-sm font-medium text-brand-navy-950">
                      Remaining mortgage balance
                      <input
                        autoFocus
                        inputMode="decimal"
                        name="mortgage"
                        placeholder="0"
                        value={form.mortgage}
                        onChange={(event) => {
                          setForm((prev) => ({
                            ...prev,
                            mortgage: event.target.value,
                          }));
                          setFieldError(null);
                        }}
                        className={fieldClassName}
                      />
                    </label>
                  ) : null}

                  {step === "education" ? (
                    <label className="block text-sm font-medium text-brand-navy-950">
                      Future education costs
                      <input
                        autoFocus
                        inputMode="decimal"
                        name="education"
                        placeholder="0"
                        value={form.education}
                        onChange={(event) => {
                          setForm((prev) => ({
                            ...prev,
                            education: event.target.value,
                          }));
                          setFieldError(null);
                        }}
                        className={fieldClassName}
                      />
                    </label>
                  ) : null}
                </div>

                {fieldError ? (
                  <p className="mt-3 text-sm font-medium text-error" role="alert">
                    {fieldError}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-2">
                  <Button type="button" variant="outline" onClick={handleBack}>
                    <ArrowLeft className="size-4" aria-hidden />
                    Back
                  </Button>
                  <Button type="button" onClick={handleContinue}>
                    Continue
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-semibold text-brand-navy-950">
                  Estimated need in {stateLabel}
                </h3>
                <p className="mt-3 text-4xl font-semibold tracking-tight text-brand-navy-950">
                  {formatCurrency(breakdown.total)}
                </p>
                {breakdown.total === 0 ? (
                  <p className="mt-2 text-sm text-text-secondary">
                    Enter at least one amount above zero for a more useful
                    estimate.
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-text-secondary">
                    Based on the Debt, Income, Mortgage, and Education figures
                    you entered.
                  </p>
                )}

                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      { letter: "D", label: "Debt", amount: breakdown.debt },
                      { letter: "I", label: "Income", amount: breakdown.income },
                      {
                        letter: "M",
                        label: "Mortgage",
                        amount: breakdown.mortgage,
                      },
                      {
                        letter: "E",
                        label: "Education",
                        amount: breakdown.education,
                      },
                    ] as const
                  ).map((item) => (
                    <li
                      key={item.letter}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface-subtle/70 px-3 py-2.5"
                    >
                      <span className="flex items-center gap-2 text-sm font-medium text-brand-navy-950">
                        <span className="flex size-6 items-center justify-center rounded-full bg-brand-navy-950 text-xs font-semibold text-brand-gold-200">
                          {item.letter}
                        </span>
                        {item.label}
                      </span>
                      <span className="text-sm font-semibold text-brand-navy-950">
                        {formatCurrency(item.amount)}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-xs leading-relaxed text-text-muted">
                  This is an estimate only and is not a quote, offer, or
                  recommendation. Coverage needs vary by household, goals, and
                  underwriting.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Button type="button" variant="outline" onClick={handleStartOver}>
                    Start over
                  </Button>
                  <QuoteTrigger coverageKey="life" size="default">
                    Request a free quote
                  </QuoteTrigger>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
