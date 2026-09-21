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
    phone: "(956) 405-2891",
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
    { label: "Resources", href: "/resources", enabled: true },
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
    ceo: {
      name: "Cassandra Chavez",
      title: "CEO",
      imageSrc: "/brand/cassandra-chavez.jpg",
      imageAlt: "Cassandra Chavez, CEO of Aegis Financial Services",
      tagline: "Guiding families and business owners with clarity and care.",
      bio: [
        "Helping individuals and families protect what matters most. Cassandra’s goal is to be the person she would want sitting across the table — someone who listens, explains things honestly, and helps people make decisions based on what is best for their family.",
        "Cassandra began her career as an engineer, but becoming a mother changed what she wanted from her work. She wanted to be present for her children while continuing to learn, grow, and make a meaningful difference in the lives of others.",
        "Her journey into insurance began while she was still an engineer, when she was introduced to life insurance and discovered that it could offer far more possibilities than she had realized. That curiosity grew into a passion for understanding how coverage can protect families and prepare them for the future — and eventually into leading Aegis Financial Services.",
        "Today she helps individuals and families navigate decisions about health, Medicare, life insurance, and financial protection across Texas and Florida. She believes insurance should never be about simply selling a policy — it should be about understanding the person, explaining the options, and helping them make an informed choice that fits their needs.",
      ],
      vision:
        "Families who feel protected, informed, and confident about the coverage that shields what matters most.",
      mission:
        "Listen first, explain options honestly, and guide each household to the protection that fits — without pressure.",
    },
    promo: {
      title: "A shield for what matters",
      body: "Clarity, care, and honest guidance — the standard Aegis brings to every conversation about protecting your family’s future.",
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
    promo: {
      title: "Clear guidance. Personalized support.",
      body: "Medicare does not have to be confusing. We help you understand your options and find the plan that fits your healthcare needs and budget.",
    },
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
    marketplaceUrl: "https://www.healthcare.gov",
    marketplaceLabel: "Healthcare.gov",
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
    promo: {
      title: "Fill the gaps with confidence",
      body: "Dental, vision, and travel coverage that supports everyday care — so you can focus on a brighter, healthier you.",
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
    saveContactIntro:
      "Download and save Cassandra’s contact info to your phone so you can call, text, or email whenever you need help.",
    promo: {
      title: "We’re here when you need us",
      body: "Questions about coverage? Reach out — we listen first and help you take the next step with confidence.",
    },
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
  resources: {
    hero: {
      headline: "Resources",
      subheadline:
        "Official references and self-enrollment paths to help you learn more before you decide. This section is still growing.",
    },
    sections: [
      {
        id: "medicare",
        title: "Medicare",
        intro:
          "Start with official Medicare materials, then enroll on your own when you are ready — or use Need help? to talk with an advisor.",
        links: [
          {
            id: "medicare-and-you",
            label: "Medicare & You Handbook",
            href: "https://www.medicare.gov/publications/10050-medicare-and-you.pdf",
            description: "The official annual handbook from Medicare.gov.",
          },
          {
            id: "medicare-gov",
            label: "medicare.gov",
            href: "https://www.medicare.gov",
            description: "Compare plans, check enrollment periods, and learn the basics.",
          },
          {
            id: "medicare-self-enroll",
            label: "Medicare self-enrollment",
            href: "",
            enrollmentLinkId: "medicare",
            description:
              "Same self-enroll destination used by the help tool for Medicare.",
          },
        ],
      },
      {
        id: "health",
        title: "Individual & Family Health",
        intro:
          "Use the marketplace reference site and the Health (Under 65) self-enroll path when you prefer to apply on your own.",
        links: [
          {
            id: "healthcare-gov",
            label: "Healthcare.gov",
            href: "https://www.healthcare.gov",
            description: "Official ACA marketplace for comparing and applying for coverage.",
          },
          {
            id: "health-self-enroll",
            label: "Health (Under 65) self-enrollment",
            href: "",
            enrollmentLinkId: "health-under-65",
            description:
              "Same self-enroll destination used by the help tool for Health (Under 65).",
          },
        ],
      },
      {
        id: "funeral",
        title: "Funeral Plans",
        intro:
          "Aegis is building out funeral plan guidance. Visit the Funeral Plans page for the current overview, or ask for help through the side tool.",
        links: [
          {
            id: "funeral-plans-page",
            label: "Funeral Plans overview",
            href: "/funeral",
            description:
              "Thin overview while fuller product details are still being written.",
          },
        ],
      },
    ],
  },
  funeral: {
    hero: {
      headline: "Funeral Plans",
      subheadline:
        "Guidance for families who want help planning for final expenses and funeral arrangements.",
    },
    body: [
      "Funeral plan details for Aegis Financial Services are still being written. This page will grow once the agency finishes the product write-up.",
      "If you are interested in a funeral plan now, use Need help? on the side of any page and choose “I am interested in a funeral plan,” or contact an advisor directly.",
    ],
  },
  legalPages: [
    {
      slug: "privacy",
      title: "Privacy Policy",
      summary: "How we handle what you tell us.",
      sections: [
        {
          heading: "What we collect",
          body: "When you request help through the side help tool, we collect your name, phone number, email address, the coverage you asked about, the best time to call, and anything you type into the notes box.",
        },
        {
          heading: "Why",
          body: "So that a licensed advisor can contact you about insurance, which is the thing you asked us to do.",
        },
        {
          heading: "Who else sees it",
          body: "When you follow a self-enroll link you leave this site. What you enter on the carrier’s or the marketplace’s website is held by them, under their privacy policy, not ours.",
        },
        {
          heading: "Your choices",
          body: "You can ask us to stop contacting you at any time, and you can ask us what we hold about you. Email cc.aegisfs@gmail.com to make either request.",
        },
      ],
    },
    {
      slug: "terms",
      title: "Terms of Service",
      summary: "The terms you agree to by using this site.",
      sections: [
        {
          heading: "What this site is",
          body: "This website is published by Aegis Financial Services, an independent insurance agency. It provides information and a route to enrollment tools run by carriers and by the marketplace. Nothing here is an offer of insurance, and nothing here binds coverage.",
        },
        {
          heading: "Links away from here",
          body: "Applying happens on somebody else’s website under their terms. We do not control those sites.",
        },
        {
          heading: "Accuracy",
          body: "We keep this site current, but plans, prices, and rules change. What the carrier or the marketplace shows you at the moment you apply is what governs.",
        },
      ],
    },
    {
      slug: "accessibility",
      title: "Accessibility",
      summary: "Our commitment and how to tell us when something gets in the way.",
      sections: [
        {
          heading: "Our commitment",
          body: "Aegis Financial Services wants this site to work for people who need coverage — including people using a screen reader, a keyboard without a mouse, larger text, stronger contrast, or reduced motion. Buying coverage should not depend on how you browse.",
        },
        {
          heading: "Known limitations",
          body: "When you choose to self-enroll, you leave this site for a carrier’s or the marketplace’s own website. Those sites are outside our control. If one of them blocks you, contact us and a licensed advisor can help you over the phone.",
        },
        {
          heading: "Tell us when something does not work",
          body: "If any part of this site gets in your way, email cc.aegisfs@gmail.com and tell us which page you were on and what happened. We will review the issue and, in the meantime, a licensed advisor can walk you through coverage over the phone at no cost and with no obligation.",
        },
      ],
    },
    {
      slug: "disclaimer",
      title: "Disclaimer & Disclosures",
      summary: "The things we are required to say.",
      sections: [
        {
          heading: "Independent agency",
          body: "Aegis Financial Services is an independent insurance agency. We are not connected with or endorsed by the United States government or the federal Medicare program.",
        },
        {
          heading: "Not every plan",
          body: "We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.",
        },
        {
          heading: "Medicare review",
          body: "Medicare has neither reviewed nor endorsed this information.",
        },
        {
          heading: "Outbound applications",
          body: "Applying through a link on this site takes you to a carrier’s or the marketplace’s own website. Your application, your payment, and your policy are handled there.",
        },
        {
          heading: "No offer of coverage",
          body: "Nothing on this site is an offer of insurance, and nothing on this site binds coverage.",
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
