import { siteContainer, socials } from "@/lib/site";

function SocialIcon({
  name,
  className,
}: {
  name: "Facebook" | "Instagram" | "TikTok";
  className?: string;
}) {
  if (name === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          fill="currentColor"
          d="M14 9h3V6h-3c-1.9 0-3.5 1.6-3.5 3.5V12H8v3h2.5v7h3v-7H16l1-3h-2.5V9.5c0-.3.2-.5.5-.5Z"
        />
      </svg>
    );
  }

  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Zm8 1.5H8A2.5 2.5 0 0 0 5.5 8v8A2.5 2.5 0 0 0 8 18.5h8a2.5 2.5 0 0 0 2.5-2.5V8A2.5 2.5 0 0 0 16 5.5ZM12 8.8A3.2 3.2 0 1 1 8.8 12 3.2 3.2 0 0 1 12 8.8Zm0 1.5A1.7 1.7 0 1 0 13.7 12 1.7 1.7 0 0 0 12 10.3ZM16.7 7.2a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.5 3.2c.8 2.6 2.6 4.4 5.2 5.1v3.1c-1.8-.1-3.4-.7-4.8-1.8v6.7c0 3.6-2.9 6.5-6.5 6.5S2 19.9 2 16.3s2.9-6.5 6.5-6.5c.4 0 .7 0 1.1.1v3.3c-.3-.1-.7-.2-1.1-.2-1.8 0-3.2 1.5-3.2 3.3s1.4 3.3 3.2 3.3 3.2-1.5 3.2-3.3V3.2h2.8Z"
      />
    </svg>
  );
}

export function HomeSocial() {
  return (
    <section className="bg-surface-page py-16 sm:py-20">
      <div className={siteContainer}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-brand-navy-950">
            Resources, tips, and information
          </h2>
          <p className="mt-3 text-text-secondary">
            Follow Aegis on social media for coverage reminders, planning tips,
            and helpful information for families in Texas and Florida.
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {socials.map((social) => (
              <li key={social.name}>
                <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-subtle bg-surface-card px-4 py-2 text-sm font-medium text-brand-navy-950">
                  <SocialIcon
                    name={social.name}
                    className="size-4 text-brand-blue-700"
                  />
                  {social.name}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-text-muted">
            Live profile links will appear here shortly.
          </p>
        </div>
      </div>
    </section>
  );
}
