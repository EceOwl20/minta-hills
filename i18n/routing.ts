import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en", "de", "ru"],
  defaultLocale: "tr",
  localePrefix: "always",
  localeDetection: false,

  pathnames: {
    "/": "/",
    "/hakkimizda": {
      tr: "/hikayemiz",
      en: "/our-story",
      de: "/unsere-geschichte",
      ru: "/o-nas",
    },
    "/hospitality": {
      tr: "/ayricaliklar",
      en: "/privileges",
      de: "/vorteile",
      ru: "/privilegii",
    },
    "/experiences": {
      tr: "/deneyimler",
      en: "/experiences",
      de: "/erlebnisse",
      ru: "/vpechatleniya",
    },
    "/villas": {
      tr: "/villalar",
      en: "/villas",
      de: "/villen",
      ru: "/villy",
    },
    "/gallery": {
      tr: "/galeri",
      en: "/gallery",
      de: "/galerie",
      ru: "/galereya",
    },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/contact": {
      tr: "/iletisim",
      en: "/contact",
      de: "/kontakt",
      ru: "/kontakty",
    },
  },

  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
export type StaticAppPathname = Exclude<
  AppPathname,
  "/blog/[slug]"
>;
