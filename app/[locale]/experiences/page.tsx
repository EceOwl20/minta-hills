import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/common/PageHero";
import { experiencesHero } from "@/data/experiences";
import ManifestoSection from "@/components/sections/ManifestoSection";
import FeaturedExperienceSection from "@/components/experiences/FeaturedExperienceSection";
import ExperienceGridSection from "@/components/experiences/ExperienceGridSection";
import DistancesSection from "@/components/sections/DistancesSection";
import ClosingSection from "@/components/sections/ClosingSection";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function ExperiencesPage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: "ExperiencesPage.hero",
  });

  return (
    <main id="main">
      <PageHero
        image={experiencesHero.image}
        imageAlt={t("imageAlt")}
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbLabel={t("breadcrumbLabel")}
        breadcrumbs={[
          {
            label: t("home"),
            href: "/",
          },
          {
            label: t("current"),
          },
        ]}
        meta={[t("cableCar"), t("ancientCity"), t("beach")]}
      />

      <ManifestoSection namespace="ExperiencesPage.manifesto" />

      <FeaturedExperienceSection />

      <ExperienceGridSection />

      <DistancesSection variant="experiences" />

      <ClosingSection variant="experiences" />
    </main>
  );
}
