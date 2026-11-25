import { getTranslations } from "next-intl/server";

import PageHero from "@/components/common/PageHero";

import { contactHero } from "@/data/contact";

export default async function ContactHero() {
  const t = await getTranslations("ContactPage.hero");

  return (
    <PageHero
      image={contactHero.image}
      imageAlt={t("imageAlt")}
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      breadcrumbLabel={t("breadcrumbLabel")}
      breadcrumbs={[
        {
          label: t("breadcrumbHome"),
          href: "/",
        },
        {
          label: t("breadcrumbCurrent"),
        },
      ]}
      meta={[
        t("meta.location"),
        t("meta.response"),
        t("meta.airport"),
      ]}
      imagePosition="center"
    />
  );
}