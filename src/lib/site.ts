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

/** Temporary single-page mode: one quote form, no site navigation. */
export const contactLanding: boolean = true;

export const infoPacketHref = "/downloads/aegis-info-packet.pdf";

/** Narrow shell for the single-page landing. */
export const landingContainer = "mx-auto w-full max-w-6xl px-5 sm:px-8";

/** Shared page shell. Left padding clears the fixed Save contact rail. */
export const siteContainer =
  "mx-auto w-full max-w-[90rem] pl-16 pr-5 sm:pr-8 lg:pr-12";

export const services = [
  {
    slug: "health",
    label: "Individual & Family Health Insurance",
    color: "bg-linear-to-b from-[#18949c] to-brand-teal-600",
  },
  {
    slug: "medicare",
    label: "Medicare",
    color: "bg-linear-to-b from-brand-blue-600 to-brand-blue-700",
  },
  {
    slug: "texas-medicare",
    label: "Texas Medicare / Medicaid Integrated Plans",
    color: "bg-linear-to-b from-brand-gold-500 to-brand-gold-active",
  },
  {
    slug: "dental-vision",
    label: "Dental & Vision",
    color: "bg-linear-to-b from-[#2aa8cf] to-brand-cyan-500",
  },
  {
    slug: "life",
    label: "Life Insurance",
    color: "bg-linear-to-b from-[#18949c] to-brand-teal-600",
  },
  {
    slug: "final-expense",
    label: "Final Expense",
    color: "bg-linear-to-b from-[#7a5aa8] to-brand-purple-600",
  },
  {
    slug: "funeral-plans",
    label: "Funeral Plans",
    color: "bg-linear-to-b from-[#1f8f66] to-success",
  },
  {
    slug: "travel",
    label: "Travel Insurance",
    color: "bg-linear-to-b from-[#1a8aa8] to-brand-blue-600",
  },
  {
    slug: "retirement",
    label: "Retirement",
    color: "bg-linear-to-b from-brand-navy-900 to-brand-navy-950",
  },
  {
    slug: "mortgage",
    label: "Mortgage Protection",
    color: "bg-linear-to-b from-brand-blue-600 to-brand-blue-700",
  },
] as const;

export const benefits = [
  "No cost, no obligation",
  "Independent & unbiased",
  "A reply within 1-2 business days",
  "Bilingual (English & Spanish)",
  "Ongoing support year-round",
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
