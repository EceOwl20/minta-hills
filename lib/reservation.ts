import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";
import { siteConfig } from "@/data/site";

export function getReservationUrl(locale: string): string {
  const validLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  return siteConfig.reservation.urls[validLocale];
}