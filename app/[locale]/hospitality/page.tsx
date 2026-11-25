import {
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import PageHero from "@/components/common/PageHero";
import ManifestoSection from "@/components/sections/ManifestoSection";
import { hospitalityHero } from "@/data/hospitality";
import PillarsSection from "@/components/hospitality/PillarsSection";
import FacilitiesSection from "@/components/sections/FacilitiesSection";
import SeasonsSection from "@/components/sections/SeasonsSection";
import VillaEquipmentSection from "@/components/sections/VillaEquipmentSection";
import DistancesSection from "@/components/sections/DistancesSection";
import ContactSection from "@/components/hospitality/ContactSection";
import ClosingSection from "@/components/sections/ClosingSection";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HospitalityPage({
  params,
}: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: "HospitalityPage.hero",
  });

  return (
    <main id="main">
      <PageHero
        image={hospitalityHero.image}
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
          t("villas"),
          t("garden"),
          t("facilities"),
        ]}
      />

      <ManifestoSection namespace="HospitalityPage.manifesto" />
       <PillarsSection />
       <FacilitiesSection showExtendedPoolNote />
       <SeasonsSection variant="hospitality" />
       <VillaEquipmentSection />
       <DistancesSection />
       <ContactSection />
       <ClosingSection variant="hospitality" />
    </main>
  );
}