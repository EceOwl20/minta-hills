import {
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import PageHero from "@/components/common/PageHero";
import ManifestoSection from "@/components/sections/ManifestoSection";
import { hospitalityHero } from "@/data/hospitality";
import PillarsSection from "@/components/hospitality/PillarsSection";

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
    </main>
  );
}