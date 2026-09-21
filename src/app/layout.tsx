import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { SaveContactTab } from "@/components/contact/save-contact-tab";
import { QuoteDialogProvider } from "@/components/intake/quote-dialog";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { fetchIntakeFlow } from "@/lib/admin-api";
import { site } from "@/lib/site";
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

export const metadata: Metadata = {
  title: `${site.name} | Guidance and Protection`,
  description:
    "Helping you shield what matters most. Personalized insurance guidance serving Texas & Florida.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const flow = await fetchIntakeFlow("home-intake");

  return (
    <html
      lang="en"
      id="top"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <QuoteDialogProvider flow={flow}>
          <SiteHeader />
          {children}
          <SiteFooter />
          <SaveContactTab />
        </QuoteDialogProvider>
      </body>
    </html>
  );
}
