import { HomeHero } from "@/components/home/home-hero";
import { HomeQuote } from "@/components/home/home-quote";
import { HomeServices } from "@/components/home/home-services";
import { HomeSocial } from "@/components/home/home-social";
import { HomeWhyChoose } from "@/components/home/home-why-choose";
import { services } from "@/lib/site";

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const interestValue = firstParam(params.interest);
  const interest = services.some((service) => service.slug === interestValue)
    ? interestValue
    : undefined;

  return (
    <main className="flex-1">
      <HomeHero />
      <HomeServices />
      <HomeWhyChoose />
      <HomeSocial />
      <HomeQuote
        interest={interest}
        sent={firstParam(params.sent) === "1"}
        error={firstParam(params.error) === "1"}
      />
    </main>
  );
}
