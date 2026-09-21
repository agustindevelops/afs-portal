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

export function quoteHref(interest?: string) {
  if (!interest) return "/#quote";
  return `/?interest=${interest}#quote`;
}
