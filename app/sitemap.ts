import "server-only";

import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";

import { getPublishedBlogPosts } from "@/lib/blog";

import { getBlogAlternates } from "@/lib/blogSeo";

export function getBlogSitemapEntries(): MetadataRoute.Sitemap {
  const posts = getPublishedBlogPosts();

  return routing.locales.flatMap((locale) => {
    const listingAlternates =
      getBlogAlternates(locale);

    const listing: MetadataRoute.Sitemap[number] = {
      url: listingAlternates.canonical,

      alternates: {
        languages: listingAlternates.languages,
      },
    };

    const articles = posts.map((post) => {
      const alternates = getBlogAlternates(
        locale,
        post
      );

      return {
        url: alternates.canonical,

        lastModified:
          post.updatedAt ?? post.publishedAt,

        alternates: {
          languages: alternates.languages,
        },
      };
    });

    return [listing, ...articles];
  });
}