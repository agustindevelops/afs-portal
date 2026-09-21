import { DATA } from "@/lib/cms/data";
import type { CmsData } from "@/lib/cms/types";

/**
 * Public CMS accessor. Today returns the static DATA dataset.
 * Swap the body for Contentful fetches later without changing call sites.
 */
export async function getCmsData(): Promise<CmsData> {
  return DATA;
}

export function getEnrollmentHref(
  data: CmsData,
  coverageKey: string,
): string | null {
  const match = data.enrollmentLinks.find(
    (link) => link.coverageKey === coverageKey && link.href,
  );
  return match?.href || null;
}

export function getEnrollmentLinksForCoverage(
  data: CmsData,
  coverageKey: string,
) {
  return data.enrollmentLinks.filter(
    (link) => link.coverageKey === coverageKey,
  );
}
