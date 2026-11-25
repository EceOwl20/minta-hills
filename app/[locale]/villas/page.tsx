import {
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import PageHero from "@/components/common/PageHero";
import ManifestoSection from "@/components/sections/ManifestoSection";
import {
  villaConfig,
  villasHero,
} from "@/data/villas";
import FiguresSection from "@/components/sections/FiguresSection";
import VillaTourSection from "@/components/villas/VillaTourSection";
import VillaCapacitySection from "@/components/villas/VillaCapacitySection";
import VillaEquipmentSection from "@/components/sections/VillaEquipmentSection";
import SeasonsSection from "@/components/sections/SeasonsSection";
import DistancesSection from "@/components/sections/DistancesSection";
import ClosingSection from "@/components/sections/ClosingSection";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function VillasPage({
  params,
}: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: "VillasPage.hero",
  });

  return (
    <main id="main">
      <PageHero
        image={villasHero.image}
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
        meta={[
          t("villas", {
            count: villaConfig.count,
          }),
          t("livingArea", {
            area: villaConfig.specs.livingArea,
          }),
          t("capacity", {
            capacity: villaConfig.specs.capacity,
          }),
        ]}
      />

      <ManifestoSection
  namespace="VillasPage.manifesto"
  values={{
    count: villaConfig.count,
    livingArea: villaConfig.specs.livingArea,
    kitchens: villaConfig.specs.kitchens,
    bedrooms: villaConfig.specs.bedrooms,
    toilets: villaConfig.specs.toilets,
    bathrooms: villaConfig.specs.bathrooms,
    balconies: villaConfig.specs.balconies,
  }}
/>

<FiguresSection variant="villas" />

<VillaTourSection />

<VillaCapacitySection />

<VillaEquipmentSection variant="villas" />

<SeasonsSection variant="villas" />

<DistancesSection variant="villas" />

<ClosingSection variant="villas" />
    </main>
  );
}