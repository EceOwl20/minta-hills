import "server-only";

import { getTranslations } from "next-intl/server";

import {
  blogPosts,
  type BlogLocale,
  type BlogPostId,
  type BlogPostConfig,
} from "@/data/blog";

export type BlogPostSummary = {
  id: BlogPostId;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  updatedAt?: string;
};

// Return published posts from newest to oldest.
export function getPublishedBlogPosts(): BlogPostConfig[] {
  return blogPosts
    .filter((post) => post.status === "published")
    .sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt)
    );
}

// Find a published post by locale-specific slug.
export function getBlogPostBySlug(
  locale: BlogLocale,
  slug: string
): BlogPostConfig | undefined {
  return getPublishedBlogPosts().find(
    (post) => post.slugs[locale] === slug
  );
}

// Find a published post by its stable ID.
export function getBlogPostById(
  id: BlogPostId
): BlogPostConfig | undefined {
  return getPublishedBlogPosts().find(
    (post) => post.id === id
  );
}

// Return localized blog summaries.
export async function getBlogPostSummaries(
  locale: BlogLocale
): Promise<BlogPostSummary[]> {
  const t = await getTranslations({
    locale,
    namespace: "BlogPosts",
  });

  return getPublishedBlogPosts().map((post) => ({
    id: post.id,
    slug: post.slugs[locale],
    title: t(`${post.id}.title`),
    excerpt: t(`${post.id}.excerpt`),
    image: post.image,
    imageAlt: t(`${post.id}.imageAlt`),
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
  }));
}

// Return the same article's slug in another locale.
export function getLocalizedBlogSlug(
  id: BlogPostId,
  locale: BlogLocale
): string | undefined {
  return getBlogPostById(id)?.slugs[locale];
}

// Return a localized published post by its slug.
export async function getBlogPostDetail(
  locale: BlogLocale,
  slug: string
): Promise<BlogPostSummary | undefined> {
  const post = getBlogPostBySlug(locale, slug);

  if (!post) {
    return undefined;
  }

  const t = await getTranslations({
    locale,
    namespace: "BlogPosts",
  });

  return {
    id: post.id,
    slug: post.slugs[locale],
    title: t(`${post.id}.title`),
    excerpt: t(`${post.id}.excerpt`),
    image: post.image,
    imageAlt: t(`${post.id}.imageAlt`),
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
  };
}