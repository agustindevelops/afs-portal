import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { HelpWidget } from "@/components/help/help-widget";
import { QuoteDialogProvider } from "@/components/intake/quote-dialog";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Analytics } from "@/components/analytics/analytics";
import { fetchIntakeFlow } from "@/lib/admin-api";
import { getCmsData } from "@/lib/cms/get-cms-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsData();
  return {
    title: `${cms.site.name} | Guidance and Protection`,
    description:
      "Helping you shield what matters most. Personalized insurance guidance serving Texas & Florida.",
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [flow, cms] = await Promise.all([
    fetchIntakeFlow("home-intake"),
    getCmsData(),
  ]);

  return (
    <html
      lang="en"
      id="top"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Analytics />
        <QuoteDialogProvider flow={flow}>
          <SiteHeader
            navigation={cms.navigation}
            spanish={cms.site.spanish}
            quoteCta={cms.site.quoteCta}
          />
          {children}
          <SiteFooter cms={cms} />
          <HelpWidget cms={cms} />
        </QuoteDialogProvider>
      </body>
    </html>
  );
}
