export const site = {
  name: "Aegis Financial Services",
  shortName: "Aegis",
  tagline: "Helping you shield what matters most.",
  headline: "Guidance and Protection for",
  headlineAccent: "What Matters Most.",
  serving: "serving Texas & Florida",
  spanish: "Se Habla Español",
  slogan: "More Secure Families. Brighter Tomorrows.",
  quoteCta: "Request a Free Quote",
} as const;

/** Shared page shell. Left padding clears the fixed Save contact rail. */
export const siteContainer =
  "mx-auto w-full max-w-[90rem] pl-16 pr-5 sm:pr-8 lg:pr-12";

export const services = [
  {
    slug: "health",
    label: "Individual & Family Health Insurance",
    color: "bg-brand-teal-600",
  },
  {
    slug: "medicare",
    label: "Medicare",
    color: "bg-brand-blue-700",
  },
  {
    slug: "texas-medicare",
    label: "Texas Medicare / Medicaid Integrated Plans",
    color: "bg-brand-gold-500",
    iconClass: "text-brand-navy-950",
  },
  {
    slug: "dental-vision",
    label: "Dental & Vision",
    color: "bg-brand-blue-600",
  },
  {
    slug: "life",
    label: "Life Insurance",
    color: "bg-brand-teal-600",
  },
  {
    slug: "final-expense",
    label: "Final Expense",
    color: "bg-brand-purple-600",
  },
  {
    slug: "funeral-plans",
    label: "Funeral Plans",
    color: "bg-success",
  },
  {
    slug: "travel",
    label: "Travel Insurance",
    color: "bg-brand-blue-600",
  },
  {
    slug: "retirement",
    label: "Retirement",
    color: "bg-brand-blue-700",
  },
  {
    slug: "mortgage",
    label: "Mortgage Protection",
    color: "bg-brand-blue-700",
  },
] as const;

export const benefits = [
  "No cost, no obligation",
  "Independent & unbiased",
  "A reply within 1-2 business days",
  "Bilingual (English & Spanish)",
  "Ongoing support year-round",
] as const;

export const socials = [
  { name: "Facebook", href: null },
  { name: "Instagram", href: null },
  { name: "TikTok", href: null },
] as const;

export const states = [
  { value: "TX", label: "Texas" },
  { value: "FL", label: "Florida" },
] as const;

const SERVICE_TO_COVERAGE: Partial<
  Record<(typeof services)[number]["slug"], string>
> = {
  health: "under_65",
  medicare: "on_medicare",
  "texas-medicare": "on_medicare",
  "dental-vision": "dental_vision",
  life: "life",
  travel: "travel",
  "funeral-plans": "life",
  "final-expense": "life",
  mortgage: "life",
  retirement: "under_65",
};

export function coverageKeyForService(
  slug: (typeof services)[number]["slug"] | string,
) {
  return SERVICE_TO_COVERAGE[slug as (typeof services)[number]["slug"]];
}

export function quoteHref(interest?: string) {
  if (!interest) return "/#quote";
  return `/?interest=${interest}#quote`;
}
