import { HomeHero } from "@/components/home/home-hero";
import { HomeQuote } from "@/components/home/home-quote";
import { HomeServices } from "@/components/home/home-services";
import { HomeSocial } from "@/components/home/home-social";
import { HomeWhyChoose } from "@/components/home/home-why-choose";
import { fetchIntakeFlow } from "@/lib/admin-api";

export default async function Home() {
  const flow = await fetchIntakeFlow("home-intake");

  return (
    <main className="flex-1">
      <HomeHero flow={flow} />
      <HomeServices />
      <HomeWhyChoose />
      <HomeSocial />
      <HomeQuote flow={flow} />
    </main>
  );
}
