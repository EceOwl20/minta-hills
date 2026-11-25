import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

import ContactHero from "@/components/contact/ContactHero";
import ContactChannels from "@/components/contact/ContactChannels";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactMap from "@/components/contact/ContactMap";
import ContactDistances from "@/components/contact/ContactDistances";
import ContactClosing from "@/components/contact/ContactClosing";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function ContactPage({
  params,
}: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <main
      id="main"
      className="bg-brand-paper text-brand-dark"
    >
      <ContactHero />

      <ContactChannels />

      <ContactFormSection />

      <ContactMap />

      <ContactDistances />

      <ContactClosing />
    </main>
  );
}