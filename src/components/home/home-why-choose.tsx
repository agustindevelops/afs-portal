import {
  BadgeCheck,
  Clock3,
  Handshake,
  Languages,
  ShieldCheck,
} from "lucide-react";
import { benefits } from "@/lib/site";

const icons = [ShieldCheck, BadgeCheck, Clock3, Languages, Handshake];

export function HomeWhyChoose() {
  return (
    <section className="bg-surface-subtle py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-semibold text-brand-navy-950">
          Why choose Aegis?
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit, index) => {
            const Icon = icons[index];
            return (
              <li
                key={benefit}
                className="rounded-2xl border border-border-subtle bg-surface-card p-5"
              >
                <Icon
                  className="size-6 text-brand-blue-700"
                  aria-hidden="true"
                />
                <p className="mt-3 font-semibold text-brand-navy-950">
                  {benefit}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
