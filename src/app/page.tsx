import { HomeHero } from "@/components/home/home-hero";
import { HomeQuote } from "@/components/home/home-quote";
import { HomeServices } from "@/components/home/home-services";
import { HomeSocial } from "@/components/home/home-social";
import { HomeWhyChoose } from "@/components/home/home-why-choose";
import { fetchIntakeFlow } from "@/lib/admin-api";
import { getCmsData } from "@/lib/cms/get-cms-data";

export default async function Home() {
  const [flow, cms] = await Promise.all([
    fetchIntakeFlow("home-intake"),
    getCmsData(),
  ]);

  return (
    <main className="flex-1">
      <HomeHero flow={flow} />
      <HomeServices />
      <HomeWhyChoose />
      <HomeSocial socialMedia={cms.socialMedia} />
      <HomeQuote flow={flow} />
    </main>
  );
}
