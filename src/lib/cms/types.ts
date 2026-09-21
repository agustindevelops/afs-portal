export type NavItem = {
  label: string;
  href: string;
  enabled: boolean;
};

export type SocialLink = {
  name: "Facebook" | "Instagram" | "TikTok";
  href: string;
};

export type CoverageOption = {
  value: string;
  label: string;
};

export type ContentTile = {
  id: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type EnrollmentLink = {
  id: string;
  label: string;
  href: string;
  coverageKey?: string;
};

export type PageHero = {
  headline: string;
  subheadline: string;
  ctaLabel?: string;
  ctaAction?: "quote" | "consultation";
  promoHeadline?: string;
  promoBody?: string;
};

export type LegalPage = {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
  /** True while copy is still a placeholder awaiting client approval. */
  isClientTemplate?: boolean;
};

export type ResourceLink = {
  id: string;
  label: string;
  href: string;
  description?: string;
  /** When set, reuse the matching enrollmentLinks record for the href. */
  enrollmentLinkId?: string;
};

export type ResourceSection = {
  id: string;
  title: string;
  intro: string;
  links: ResourceLink[];
};

export type CmsData = {
  site: {
    name: string;
    shortName: string;
    tagline: string;
    serving: string;
    spanish: string;
    slogan: string;
    quoteCta: string;
    copyright: string;
    disclaimer: string;
  };
  contact: {
    phone: string;
    email: string;
    googleReviewUrl: string;
    testimonial: string;
  };
  socialMedia: SocialLink[];
  navigation: NavItem[];
  coverageOptions: CoverageOption[];
  enrollmentLinks: EnrollmentLink[];
  about: {
    meaning: {
      title: string;
      pronunciation: string;
      definition: string;
      connection: string;
    };
    message: {
      title: string;
      headline: string;
      paragraphs: string[];
    };
    ceo: {
      name: string;
      title: string;
      imageSrc: string;
      imageAlt: string;
      tagline: string;
      bio: string[];
      vision: string;
      mission: string;
    };
    promo: {
      title: string;
      body: string;
    };
    values: ContentTile[];
  };
  medicare: {
    hero: PageHero;
    tiles: ContentTile[];
    overview: {
      title: string;
      intro: string;
      branches: { title: string; items: string[] }[];
    };
    faqs: FaqItem[];
    promo: {
      title: string;
      body: string;
    };
  };
  health: {
    hero: PageHero;
    tiles: ContentTile[];
    sep: {
      title: string;
      intro: string;
      items: string[];
    };
    marketplaceUrl: string;
    marketplaceLabel: string;
  };
  ancillary: {
    hero: PageHero;
    tiles: ContentTile[];
    selfEnrollment: {
      title: string;
      intro: string;
      contactFallback: string;
    };
    promo: {
      title: string;
      body: string;
    };
  };
  life: {
    hero: PageHero;
    tiles: ContentTile[];
    promo: {
      title: string;
      body: string;
    };
  };
  contactPage: {
    hero: PageHero;
    alternateMethods: { label: string; description: string }[];
    socialIntro: string;
    saveContactIntro: string;
    promo: {
      title: string;
      body: string;
    };
  };
  helpWidget: {
    title: string;
    coverageTypes: CoverageOption[];
    needOptions: CoverageOption[];
    callTimeOptions: CoverageOption[];
  };
  resources: {
    hero: PageHero;
    sections: ResourceSection[];
  };
  funeral: {
    hero: PageHero;
    body: string[];
  };
  legalPages: LegalPage[];
  legalLinks: { label: string; href: string }[];
};
