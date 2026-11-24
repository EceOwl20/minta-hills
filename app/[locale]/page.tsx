import { setRequestLocale } from "next-intl/server";

import MainBanner from "@/components/home/MainBanner";
import HighlightsSection from "@/components/home/HighlightsSection";

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
    </main>
  );
}