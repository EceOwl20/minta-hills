import { setRequestLocale } from "next-intl/server";

import MainBanner from "@/components/home/MainBanner";
import HighlightsSection from "@/components/home/HighlightsSection";
import VillasSection from "@/components/home/VillasSection";

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

      <HighlightsSection />

      <VillasSection />
    </main>
  );
}