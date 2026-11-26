import { hasLocale } from "next-intl";

import {
  getLocale,
  getTranslations,
} from "next-intl/server";

import { routing } from "@/i18n/routing";

import NotFoundContent from "@/components/common/NotFoundContent";

export default async function NotFound() {
  const requestedLocale = await getLocale();

  const locale = hasLocale(
    routing.locales,
    requestedLocale
  )
    ? requestedLocale
    : routing.defaultLocale;

  const t = await getTranslations({
    locale,
    namespace: "NotFoundPage",
  });

  const homeHref =
    locale === routing.defaultLocale
      ? "/"
      : `/${locale}`;

  return (
    <NotFoundContent
      title={t("title")}
      description={t("description")}
      backToHome={t("backToHome")}
      homeHref={homeHref}
    />
  );
}