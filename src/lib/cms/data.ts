import type { CmsData } from "@/lib/cms/types";

/**
 * Static CMS dataset for the public website.
 * Replace getCmsData() internals with Contentful later; keep this shape.
 * Empty href/url strings mean the client has not provided the asset yet.
 */
export const DATA: CmsData = {
  site: {
    name: "Aegis Financial Services",
    shortName: "Aegis",
    tagline: "Helping you shield what matters most.",
    serving: "serving Texas & Florida",
    spanish: "Se Habla Español",
    slogan: "More Secure Families. Brighter Tomorrows.",
    quoteCta: "Request a Free Quote",
    copyright: "All rights reserved.",
    disclaimer:
      "Insurance products are offered by licensed advisors. This website is not connected with or endorsed by the U.S. government or the federal Medicare program.",
  },
  contact: {
    phone: "",
    email: "cc.aegisfs@gmail.com",
    googleReviewUrl: "",
    testimonial: "",
  },
  socialMedia: [
    { name: "Facebook", href: "" },
    { name: "Instagram", href: "" },
    { name: "TikTok", href: "" },
  ],
  navigation: [
    { label: "Home", href: "/", enabled: true },
    { label: "About", href: "/about", enabled: true },
    { label: "Medicare", href: "/medicare", enabled: true },
    {
      label: "Individual & Family Health",
      href: "/health",
      enabled: true,
    },
    { label: "Ancillary", href: "/ancillary", enabled: true },
    { label: "Life", href: "/life", enabled: true },
    { label: "Resources", href: "/resources", enabled: false },
    { label: "Contact", href: "/contact", enabled: true },
  ],
  coverageOptions: [
    { value: "under_65", label: "Individual & Family Health (Under 65)" },
    { value: "on_medicare", label: "Medicare" },
    { value: "life", label: "Life Insurance" },
    { value: "dental_vision", label: "Dental & Vision" },
    { value: "travel", label: "Travel Insurance" },
    { value: "mortgage", label: "Mortgage Protection" },
    { value: "funeral", label: "Funeral Plans" },
    { value: "other", label: "Something else" },
  ],
  enrollmentLinks: [
    {
      id: "medicare",
      label: "Medicare self-enrollment",
      href: "",
      coverageKey: "on_medicare",
    },
    {
      id: "health-under-65",
      label: "Individual & Family Health self-enrollment",
      href: "",
      coverageKey: "under_65",
    },
    {
      id: "humana-dental",
      label: "Humana Dental",
      href: "",
      coverageKey: "dental_vision",
    },
    {
      id: "ameritas-dental",
      label: "Ameritas Dental",
      href: "",
      coverageKey: "dental_vision",
    },
    {
      id: "ameritas-vision",
      label: "Ameritas Vision",
      href: "",
      coverageKey: "dental_vision",
    },
    {
      id: "travel",
      label: "Travel Insurance",
      href: "",
      coverageKey: "travel",
    },
  ],
  about: {
    meaning: {
      title: "What does Aegis mean?",
      pronunciation: "EE-jis",
      definition:
        "Aegis means protection, guidance, and a shield of support — historically associated with care that stands between people and harm.",
      connection:
        "That meaning is the foundation of Aegis Financial Services. The agency helps families in Texas and Florida understand their options and put the right protection in place for the people and futures they care about most.",
    },
    message: {
      title: "Our message",
      headline: "Guiding families and business owners with clarity and care.",
      paragraphs: [
        "Aegis Financial Services helps individuals, families, and business owners protect what matters most. The standard is the kind of guidance people want when an important decision is on the table: listen first, explain the options honestly, and support a choice based on what is best for the household.",
        "Insurance is not treated as a policy to place. It is a process of understanding the people involved, explaining the options, and helping them make an informed decision that fits their needs.",
        "That work is a responsibility. Guidance stays honest and specific to each household, without pressure, and the agency keeps learning so the families who place their trust in Aegis can move forward with confidence.",
      ],
    },
    values: [
      {
        id: "clarity",
        title: "Clarity",
        description:
          "Families and business owners deserve to understand their options. Coverage is explained in plain language so each choice is clear before a decision is made.",
      },
      {
        id: "care",
        title: "Care",
        description:
          "Every conversation starts with the household and what it needs to protect, not with a product to sell.",
      },
      {
        id: "honesty",
        title: "Honesty",
        description:
          "Recommendations are straightforward and free of pressure, so decisions rest on what is best for the people involved.",
      },
      {
        id: "responsibility",
        title: "Responsibility",
        description:
          "Protecting what matters most is treated as a duty. Aegis stays committed to informed guidance for the families who place their trust in the agency.",
      },
    ],
  },
  medicare: {
    hero: {
      headline: "Medicare Made Simple: Clear Guidance. Personalized Support.",
      subheadline:
        "Medicare doesn’t have to be confusing. We are here to help you understand your options and find the plan that fits your healthcare needs and budget.",
      ctaLabel: "Schedule a Medicare Consultation",
      ctaAction: "consultation",
    },
    tiles: [
      {
        id: "part-c",
        title: "Medicare Advantage (Part C)",
        description:
          "All-in-one plans that may include medical, hospital, and often prescription and extra benefits through a private insurer.",
      },
      {
        id: "medigap",
        title: "Medicare Supplement (Medigap)",
        description:
          "Plans that help pay costs Original Medicare does not cover, such as deductibles, coinsurance, and copayments.",
      },
      {
        id: "part-d",
        title: "Prescription Drug Plans (Part D)",
        description:
          "Standalone coverage that helps with prescription medications when you have Original Medicare.",
      },
      {
        id: "extra-help",
        title: "Extra Help & Medicaid Coordination",
        description:
          "Support for people who may qualify for prescription cost assistance or coordinated Medicare and Medicaid benefits.",
      },
    ],
    overview: {
      title: "How Medicare fits together",
      intro:
        "Use this overview to see how the main Medicare paths relate before you compare plans with an advisor.",
      branches: [
        {
          title: "Original Medicare",
          items: [
            "Part A — Hospital insurance",
            "Part B — Medical insurance",
            "Optional Part D — Prescription drugs",
            "Optional Medigap — Help with out-of-pocket costs",
          ],
        },
        {
          title: "Medicare Advantage",
          items: [
            "Combines Part A and Part B through a private plan",
            "Often includes Part D",
            "May offer dental, vision, hearing, or wellness extras",
            "Uses plan networks and rules that vary by carrier",
          ],
        },
        {
          title: "Extra support",
          items: [
            "Extra Help for prescription costs",
            "Medicaid coordination where available",
            "Texas Medicare / Medicaid integrated options for eligible members",
          ],
        },
      ],
    },
    faqs: [
      {
        question: "When can I enroll in Medicare?",
        answer:
          "Most people have an Initial Enrollment Period around age 65, plus Annual Enrollment and Special Enrollment Periods when life changes qualify. An advisor can help you confirm your window.",
      },
      {
        question: "What is the difference between Medicare Advantage and Medigap?",
        answer:
          "Medicare Advantage replaces Original Medicare with a private plan that often includes extras. Medigap works with Original Medicare to help cover remaining costs and does not usually include Part D.",
      },
      {
        question: "Do I need a prescription drug plan?",
        answer:
          "If you have Original Medicare and need medications, Part D can help. Many Medicare Advantage plans already include drug coverage. Reviewing your prescriptions is the best way to decide.",
      },
      {
        question: "Can Aegis help if I already have Medicare?",
        answer:
          "Yes. We can review your current plan, compare alternatives, and help you decide whether a change makes sense during an open enrollment window.",
      },
    ],
  },
  health: {
    hero: {
      headline: "Coverage for Every Stage of Life",
      subheadline:
        "Whether you’re in need of health insurance for yourself and/or for your family, we can help you find different health insurance options.",
      ctaLabel: "Request a Health Insurance Quote",
      ctaAction: "quote",
      promoHeadline: "Healthier Tomorrows Start Today",
      promoBody:
        "Let’s find the right coverage so you can focus on what matters most.",
    },
    tiles: [
      {
        id: "aca",
        title: "ACA Marketplace Plans",
        description:
          "Marketplace coverage with potential premium tax credits and cost-sharing reductions based on household income and size.",
      },
      {
        id: "off-marketplace",
        title: "Off-Marketplace Plans",
        description:
          "Private major medical options outside Healthcare.gov when a non-marketplace plan better fits your needs.",
      },
      {
        id: "short-term",
        title: "Short-Term Medical",
        description:
          "Temporary coverage that can bridge gaps between jobs, school terms, or other short transitions.",
      },
    ],
    sep: {
      title: "Special Enrollment Periods (SEPs)",
      intro:
        "Outside Open Enrollment, a qualifying life event may open a Special Enrollment Period so you can enroll or change coverage.",
      items: [
        "Loss of other health coverage",
        "Marriage or divorce",
        "Birth or adoption of a child",
        "Moving to a new coverage area",
        "Changes in income that affect marketplace eligibility",
        "Other qualifying events recognized by Healthcare.gov or your carrier",
      ],
    },
  },
  ancillary: {
    hero: {
      headline: "More coverage for a brighter, healthier you",
      subheadline:
        "Ancillary benefits help fill the gaps in your coverage and give you extra protection for everyday healthcare needs.",
    },
    tiles: [
      {
        id: "dental",
        title: "Dental",
        description:
          "Help with cleanings, restorative work, and routine oral care for individuals and families.",
      },
      {
        id: "vision",
        title: "Vision",
        description:
          "Coverage for exams, lenses, frames, and other everyday vision needs.",
      },
      {
        id: "travel",
        title: "Travel Insurance",
        description:
          "Protection for trips abroad, study abroad, and unexpected travel interruptions.",
      },
    ],
    selfEnrollment: {
      title: "Prefer to enroll on your own?",
      intro:
        "No problem! Follow the links to self-enroll for each of the following benefits. If the benefits you want are not listed below, then contact us to get you a personalized quote to meet your needs.",
      contactFallback: "Need a benefit that is not listed? Contact Aegis for a personalized quote.",
    },
  },
  life: {
    hero: {
      headline: "Protection for Today. Security for Tomorrow.",
      subheadline:
        "Life insurance isn’t just about what happens someday – it’s about creating financial security, providing for your loved ones, and giving you peace of mind today.",
      ctaLabel: "Request a Life Insurance Quote",
      ctaAction: "quote",
    },
    tiles: [
      {
        id: "term",
        title: "Term Life Insurance",
        description:
          "Affordable coverage for a set period — often used for income replacement, mortgages, or growing families.",
      },
      {
        id: "whole",
        title: "Whole Life Insurance",
        description:
          "Permanent coverage with level premiums and cash value that can grow over time.",
      },
      {
        id: "uil",
        title: "Universal Indexed Life (UIL)",
        description:
          "Flexible permanent coverage that can tie cash-value growth to a market index with downside protections.",
      },
      {
        id: "final-expense",
        title: "Final Expense",
        description:
          "Smaller permanent policies designed to help with funeral costs and end-of-life expenses.",
      },
      {
        id: "mortgage",
        title: "Mortgage Protection",
        description:
          "Coverage intended to help keep housing payments covered if the unexpected happens.",
      },
      {
        id: "retirement",
        title: "Retirement",
        description:
          "Strategies that can support long-term financial security alongside life insurance planning.",
      },
    ],
    promo: {
      title: "Protect what costs the most",
      body: "If you get insurance for your phone and your car, why can’t you get insurance for something that costs way more than that – your life?",
    },
  },
  contactPage: {
    hero: {
      headline: "Let’s Connect, We’re Here to Help",
      subheadline:
        "Have questions or ready to explore coverage options? Reach out by phone, text, or email — Se Habla Español.",
    },
    alternateMethods: [
      {
        label: "Call",
        description: "Speak with an advisor during business hours.",
      },
      {
        label: "Text",
        description: "Send a message and we will follow up promptly.",
      },
      {
        label: "Email",
        description: "Share details whenever it is convenient for you.",
      },
    ],
    socialIntro:
      "Follow social media for resources, tips, and information to help you.",
  },
  helpWidget: {
    title: "Need help choosing coverage?",
    coverageTypes: [
      { value: "under_65", label: "Health (Under 65)" },
      { value: "on_medicare", label: "Medicare" },
      { value: "life", label: "Life Insurance" },
      { value: "dental_vision", label: "Dental & Vision" },
      { value: "travel", label: "Travel Insurance" },
      { value: "other", label: "Something else" },
    ],
    needOptions: [
      { value: "under_65", label: "I’m under 65" },
      {
        value: "turning_65",
        label: "I will be turning 65 within 6 months",
      },
      {
        value: "need_medicare",
        label: "I’m 65 or older but I don’t have Medicare yet",
      },
      {
        value: "medicare_change",
        label: "I’m already on Medicare but want a plan change",
      },
      { value: "dental_vision", label: "I want dental or vision" },
      { value: "life", label: "I want life insurance" },
      { value: "mortgage", label: "I want mortgage protection" },
      { value: "funeral", label: "I am interested in a funeral plan" },
      { value: "travel", label: "I plan to travel abroad" },
      { value: "other", label: "Something else" },
    ],
    callTimeOptions: [
      { value: "morning", label: "Morning" },
      { value: "afternoon", label: "Afternoon" },
      {
        value: "evening_weekend",
        label: "Evening / weekend by appointment",
      },
    ],
  },
  legalPages: [
    {
      slug: "privacy",
      title: "Privacy Policy",
      summary:
        "Placeholder privacy policy structure. Replace with client-approved legal copy before launch.",
      isClientTemplate: true,
      sections: [
        {
          heading: "Information we collect",
          body: "Describe what personal information visitors submit through quote forms, the help widget, and other contact methods.",
        },
        {
          heading: "How we use information",
          body: "Describe how Aegis uses submitted information to respond to requests, provide insurance guidance, and improve the website.",
        },
        {
          heading: "Sharing and retention",
          body: "Describe when information may be shared with carriers or service providers and how long records are retained.",
        },
        {
          heading: "Contact",
          body: "Provide the privacy contact email and mailing address once approved by the client.",
        },
      ],
    },
    {
      slug: "terms",
      title: "Terms of Service",
      summary:
        "Placeholder terms of service structure. Replace with client-approved legal copy before launch.",
      isClientTemplate: true,
      sections: [
        {
          heading: "Use of this website",
          body: "Describe acceptable use of the public website and restrictions on misuse of content or automated access.",
        },
        {
          heading: "No guarantee of coverage",
          body: "Clarify that website content is educational and does not create a guarantee of eligibility, rates, or coverage.",
        },
        {
          heading: "Limitation of liability",
          body: "Insert client-approved limitation of liability language.",
        },
      ],
    },
    {
      slug: "accessibility",
      title: "Accessibility",
      summary:
        "Placeholder accessibility statement. Replace with client-approved legal copy before launch.",
      isClientTemplate: true,
      sections: [
        {
          heading: "Our commitment",
          body: "Aegis Financial Services aims to make this website usable for visitors with diverse abilities.",
        },
        {
          heading: "Feedback",
          body: "If you encounter an accessibility barrier, contact Aegis so we can review and improve the experience.",
        },
      ],
    },
    {
      slug: "disclaimer",
      title: "Disclaimer & Disclosures",
      summary:
        "Placeholder disclaimer and disclosures structure. Replace with client-approved legal copy before launch.",
      isClientTemplate: true,
      sections: [
        {
          heading: "Insurance disclosures",
          body: "Insurance products are offered by licensed advisors. Availability, benefits, and costs vary by carrier, plan, and eligibility.",
        },
        {
          heading: "Medicare disclaimer",
          body: "This website is not connected with or endorsed by the U.S. government or the federal Medicare program.",
        },
        {
          heading: "General information",
          body: "Content on this site is for general information and is not legal, tax, or medical advice.",
        },
      ],
    },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Accessibility", href: "/legal/accessibility" },
    { label: "Disclaimer & Disclosures", href: "/legal/disclaimer" },
  ],
};

/** Alias matching the DATA.ts naming used in planning. */
export const SOCIAL_MEDIA = DATA.socialMedia;
