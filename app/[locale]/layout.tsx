import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/common/CookieConsent";
import FloatingActions from "@/components/common/FloatingActions";
import PagePreloader from "@/components/common/PagePreloader";
import ConnexeaseLiveChat from "@/components/common/ConnexeaseLiveChat";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Minta Hills",
  description: "Minta Hills",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${cormorantGaramond.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <PagePreloader />
          <Header />

          {children}

          <Footer />
          <FloatingActions />
          <CookieConsent />
          <ConnexeaseLiveChat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
