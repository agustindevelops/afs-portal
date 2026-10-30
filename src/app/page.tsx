import { DimeCalculator } from "@/components/home/dime-calculator";
import { HomeHero } from "@/components/home/home-hero";
import { HomeQuote } from "@/components/home/home-quote";
import { HomeServices } from "@/components/home/home-services";
import { HomeSocial } from "@/components/home/home-social";
import { HomeWhyChoose } from "@/components/home/home-why-choose";
import { SimpleHome } from "@/components/home/simple-home";
import { fetchIntakeFlow } from "@/lib/admin-api";
import { getCmsData } from "@/lib/cms/get-cms-data";
import { contactLanding } from "@/lib/site";

export default async function Home() {
  const [flow, cms] = await Promise.all([
    fetchIntakeFlow("home-intake"),
    getCmsData(),
  ]);

  if (contactLanding) {
    return (
      <main className="flex-1">
        <SimpleHome flow={flow} cms={cms} />
      </main>
    );
  }

  return (
    <main className="flex-1">
      <HomeHero flow={flow} />
      <HomeServices />
      <DimeCalculator />
      <HomeWhyChoose />
      <HomeSocial socialMedia={cms.socialMedia} />
      <HomeQuote flow={flow} />
    </main>
  );
}
