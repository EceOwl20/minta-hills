import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en", "de", "ru"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
  localeDetection: false,

  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];