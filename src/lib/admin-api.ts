import type { IntakeFlowPayload } from "@/lib/intake";

export function adminApiUrl(path: string) {
  const base = (process.env.ADMIN_API_URL ?? "http://localhost:3001").replace(
    /\/$/,
    "",
  );
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function fetchIntakeFlow(
  slug = "home-intake",
): Promise<IntakeFlowPayload | null> {
  try {
    const response = await fetch(adminApiUrl(`/api/intake/${slug}`), {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      console.error("Failed to load intake flow", response.status);
      return null;
    }
    return (await response.json()) as IntakeFlowPayload;
  } catch (error) {
    console.error("Failed to load intake flow", error);
    return null;
  }
}
