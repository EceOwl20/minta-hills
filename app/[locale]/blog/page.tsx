import type { Metadata } from "next";

import { hasLocale } from "next-intl";

import {
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import JsonLd from "@/components/common/JsonLd";

import { getBlogPostSummaries } from "@/lib/blog";

import {
  buildBlogListingMetadata,
  buildBlogListingJsonLd,
} from "@/lib/blogSeo";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: "BlogPage.seo",
  });

  return buildBlogListingMetadata({
    locale,
    title: t("title"),
    description: t("description"),
  });
}

export default async function BlogPage({
  params,
}: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [posts, t] = await Promise.all([
    getBlogPostSummaries(locale),

    getTranslations({
      locale,
      namespace: "BlogPage",
    }),
  ]);

  const jsonLd = buildBlogListingJsonLd({
    locale,
    title: t("seo.title"),
    description: t("seo.description"),
    homeLabel: t("breadcrumbs.home"),
    blogLabel: t("breadcrumbs.blog"),
    posts,
  });

  return (
    <main
      id="main"
      className="bg-brand-paper text-brand-dark"
    >
      <JsonLd data={jsonLd} />

      <BlogHero />

      <BlogGrid posts={posts} />
    </main>
  );
}