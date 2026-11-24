import { setRequestLocale } from "next-intl/server";

import MainBanner from "@/components/home/MainBanner";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HomePage({
  params,
}: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <main id="main">
      <MainBanner />

      {/* Temporary section for scroll testing */}
      <section
        id="highlights"
        className="min-h-screen bg-brand-paper"
      />
    </main>
  );
}