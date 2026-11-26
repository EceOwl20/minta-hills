import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";

import { getLocalizedAbsoluteUrl } from "@/lib/blogSeo";
import { getBlogSitemapEntries } from "@/lib/blogSitemap";

const staticPaths = [
  "/",
  "/hakkimizda",
  "/hospitality",
  "/experiences",
  "/villas",
  "/gallery",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap =
    staticPaths.flatMap((pathname) => {
      const languages: Record<string, string> =
        Object.fromEntries(
          routing.locales.map((locale) => [
            locale,
            getLocalizedAbsoluteUrl(
              pathname,
              locale
            ),
          ])
        );

      languages["x-default"] =
        getLocalizedAbsoluteUrl(
          pathname,
          routing.defaultLocale
        );

      return routing.locales.map((locale) => ({
        url: getLocalizedAbsoluteUrl(
          pathname,
          locale
        ),

        alternates: {
          languages,
        },
      }));
    });

  return [
    ...staticEntries,
    ...getBlogSitemapEntries(),
  ];
}