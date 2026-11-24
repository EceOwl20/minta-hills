import {
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import PageHero from "@/components/common/PageHero";

import ManifestoSection from "@/components/about/ManifestoSection";
import FiguresSection from "@/components/about/FiguresSection";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AboutPage({
  params,
}: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: "AboutPage.hero",
  });

  return (
    <main id="main">
      <PageHero
        image="/images/exteriors/hero-3.jpg"
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
          t("foothills"),
          t("mountains"),
          t("garden"),
        ]}
      />

      <ManifestoSection />

      <FiguresSection />
    </main>
  );
}