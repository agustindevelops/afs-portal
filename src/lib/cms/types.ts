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
  isClientTemplate: true;
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
  };
  health: {
    hero: PageHero;
    tiles: ContentTile[];
    sep: {
      title: string;
      intro: string;
      items: string[];
    };
  };
  ancillary: {
    hero: PageHero;
    tiles: ContentTile[];
    selfEnrollment: {
      title: string;
      intro: string;
      contactFallback: string;
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
  };
  helpWidget: {
    title: string;
    coverageTypes: CoverageOption[];
    needOptions: CoverageOption[];
    callTimeOptions: CoverageOption[];
  };
  legalPages: LegalPage[];
  legalLinks: { label: string; href: string }[];
};
