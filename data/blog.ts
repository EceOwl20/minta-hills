import type { routing } from "@/i18n/routing";

export type BlogLocale =
  (typeof routing.locales)[number];

export type BlogPostId =
  | "ciraliYanartasOlympos"
  | "tahtaliCableCar"
  | "phaselisGuide"
  | "kemerVillaHoliday"
  | "kemerTravelGuide";

export type BlogPostConfig = {
  id: BlogPostId;
  slugs: Record<BlogLocale, string>;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  status: "draft" | "published";
};

export const blogPosts = [
  {
    id: "ciraliYanartasOlympos",
    slugs: {
      tr: "cirali-yanartas-olympos-gezi-rehberi",
      en: "cirali-yanartas-olympos-travel-guide",
      de: "cirali-yanartas-olympos-reisefuehrer",
      ru: "cirali-yanartas-olympos-putevoditel",
    },
    image: "/images/blog/cirali-yanartas.jpg",
    publishedAt: "2026-08-13",
    status: "published",
  },
  {
    id: "tahtaliCableCar",
    slugs: {
      tr: "tahtali-dagi-olympos-teleferik-rehberi",
      en: "tahtali-mountain-olympos-cable-car-guide",
      de: "tahtali-berg-olympos-seilbahn-reisefuehrer",
      ru: "tahtali-olympos-kanatnaya-doroga",
    },
    image: "/images/blog/tahtali-dagi.jpg",
    publishedAt: "2026-08-12",
    status: "published",
  },
  {
    id: "phaselisGuide",
    slugs: {
      tr: "phaselis-antik-kenti-gezi-rehberi",
      en: "phaselis-ancient-city-travel-guide",
      de: "phaselis-antike-stadt-reisefuehrer",
      ru: "phaselis-putevoditel",
    },
    image: "/images/blog/phaselis-antik-kenti.jpg",
    publishedAt: "2026-08-11",
    status: "published",
  },
  {
    id: "kemerVillaHoliday",
    slugs: {
      tr: "kemer-villa-tatili-rehberi",
      en: "kemer-villa-holiday-guide",
      de: "kemer-villenurlaub-reisefuehrer",
      ru: "otdyh-na-ville-v-kemere",
    },
    image: "/images/blog/kemer-villa-tatili.jpg",
    publishedAt: "2026-08-10",
    status: "published",
  },
  {
    id: "kemerTravelGuide",
    slugs: {
      tr: "kemer-gezilecek-yerler-gezi-rehberi",
      en: "things-to-do-in-kemer-travel-guide",
      de: "kemer-sehenswuerdigkeiten-reisefuehrer",
      ru: "kemer-dostoprimechatelnosti-putevoditel",
    },
    image: "/images/blog/kemer-gezi-rehberi.jpg",
    publishedAt: "2026-08-09",
    status: "published",
  },
] as const satisfies readonly BlogPostConfig[];

export type BlogContentSection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  list?: readonly string[];
};

export type BlogArticleContent = {
  intro: string;
  sections: readonly BlogContentSection[];
  outro?: string;
  sources?: string;
};