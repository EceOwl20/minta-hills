import "server-only";

import type { Metadata } from "next";

import { routing } from "@/i18n/routing";
import { siteConfig } from "@/data/site";

import type {
  BlogLocale,
  BlogPostConfig,
} from "@/data/blog";

import type { BlogPostSummary } from "@/lib/blog";

const openGraphLocales: Record<BlogLocale, string> = {
  tr: "tr_TR",
  en: "en_GB",
  de: "de_DE",
  ru: "ru_RU",
};

// Yeni eklenen type
type BlogAlternates = {
  canonical: string;
  languages: Record<string, string>;
};


export function getLocalizedAbsoluteUrl(
  pathname: string,
  locale: BlogLocale
): string {
  const prefix =
    locale === routing.defaultLocale
      ? ""
      : `/${locale}`;

  return new URL(
    `${prefix}${pathname}`,
    siteConfig.url
  ).toString();
}

export function getBlogAlternates(
  locale: BlogLocale,
  post?: BlogPostConfig
): BlogAlternates {
  const getPath = (language: BlogLocale) =>
    post
      ? `/blog/${post.slugs[language]}`
      : "/blog";

  const languages: Record<string, string> =
    Object.fromEntries(
      routing.locales.map((language) => [
        language,
        getLocalizedAbsoluteUrl(
          getPath(language),
          language
        ),
      ])
    );

  return {
    canonical: getLocalizedAbsoluteUrl(
      getPath(locale),
      locale
    ),

    languages: {
      ...languages,

      "x-default": getLocalizedAbsoluteUrl(
        getPath(routing.defaultLocale),
        routing.defaultLocale
      ),
    },
  };
}

type BlogListingMetadataProps = {
  locale: BlogLocale;
  title: string;
  description: string;
};

export function buildBlogListingMetadata({
  locale,
  title,
  description,
}: BlogListingMetadataProps): Metadata {
  const alternates = getBlogAlternates(locale);

  const image = new URL(
    "/images/exteriors/banner-about.jpg",
    siteConfig.url
  ).toString();

  return {
    title: {
      absolute: title,
    },
    description,
    alternates,

    openGraph: {
      type: "website",
      title,
      description,
      url: alternates.canonical,
      siteName: siteConfig.name,
      locale: openGraphLocales[locale],
      alternateLocale: routing.locales
        .filter((language) => language !== locale)
        .map((language) => openGraphLocales[language]),
      images: [{ url: image }],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

type BlogArticleMetadataProps = {
  locale: BlogLocale;
  post: BlogPostSummary;
  config: BlogPostConfig;
};

export function buildBlogArticleMetadata({
  locale,
  post,
  config,
}: BlogArticleMetadataProps): Metadata {
  const alternates = getBlogAlternates(
    locale,
    config
  );

  const title = `${post.title} | ${siteConfig.name}`;

  const image = new URL(
    post.image,
    siteConfig.url
  ).toString();

  return {
    title: {
      absolute: title,
    },
    description: post.excerpt,
    alternates,

    openGraph: {
      type: "article",
      title,
      description: post.excerpt,
      url: alternates.canonical,
      siteName: siteConfig.name,
      locale: openGraphLocales[locale],
      alternateLocale: routing.locales
        .filter((language) => language !== locale)
        .map((language) => openGraphLocales[language]),
      publishedTime: post.publishedAt,
      ...(post.updatedAt
        ? { modifiedTime: post.updatedAt }
        : {}),
      images: [
        {
          url: image,
          alt: post.imageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [
        {
          url: image,
          alt: post.imageAlt,
        },
      ],
    },
  };
}

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function buildBreadcrumbJsonLd(
  items: readonly BreadcrumbItem[]
) {
  return {
    "@type": "BreadcrumbList",

    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

type BlogListingJsonLdProps = {
  locale: BlogLocale;
  title: string;
  description: string;
  homeLabel: string;
  blogLabel: string;
  posts: readonly BlogPostSummary[];
};

export function buildBlogListingJsonLd({
  locale,
  title,
  description,
  homeLabel,
  blogLabel,
  posts,
}: BlogListingJsonLdProps) {
  const url = getLocalizedAbsoluteUrl(
    "/blog",
    locale
  );

  return {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        url,
        name: title,
        description,
        inLanguage: locale,

        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },

        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",

          "@id": `${getLocalizedAbsoluteUrl(
            `/blog/${post.slug}`,
            locale
          )}#article`,

          url: getLocalizedAbsoluteUrl(
            `/blog/${post.slug}`,
            locale
          ),

          headline: post.title,
        })),
      },

      buildBreadcrumbJsonLd([
        {
          name: homeLabel,
          url: getLocalizedAbsoluteUrl(
            "/",
            locale
          ),
        },
        {
          name: blogLabel,
          url,
        },
      ]),
    ],
  };
}

type BlogArticleJsonLdProps = {
  locale: BlogLocale;
  post: BlogPostSummary;
  homeLabel: string;
  blogLabel: string;
};

export function buildBlogArticleJsonLd({
  locale,
  post,
  homeLabel,
  blogLabel,
}: BlogArticleJsonLdProps) {
  const url = getLocalizedAbsoluteUrl(
    `/blog/${post.slug}`,
    locale
  );

  const blogUrl = getLocalizedAbsoluteUrl(
    "/blog",
    locale
  );

  const image = new URL(
    post.image,
    siteConfig.url
  ).toString();

  return {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,

        url,
        headline: post.title,
        description: post.excerpt,

        image: [image],

        datePublished: post.publishedAt,

        ...(post.updatedAt
          ? {
              dateModified: post.updatedAt,
            }
          : {}),

        inLanguage: locale,

        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },

        isPartOf: {
          "@type": "Blog",
          "@id": `${blogUrl}#blog`,
        },

        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,

          logo: {
            "@type": "ImageObject",
            url: new URL(
              "/images/branding/logo-crest.png",
              siteConfig.url
            ).toString(),
          },
        },
      },

      buildBreadcrumbJsonLd([
        {
          name: homeLabel,
          url: getLocalizedAbsoluteUrl(
            "/",
            locale
          ),
        },
        {
          name: blogLabel,
          url: blogUrl,
        },
        {
          name: post.title,
          url,
        },
      ]),
    ],
  };
}