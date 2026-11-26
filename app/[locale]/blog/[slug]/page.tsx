import type { Metadata } from "next";

import { hasLocale } from "next-intl";

import {
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleCover from "@/components/blog/ArticleCover";
import ArticleContent from "@/components/blog/ArticleContent";
import JsonLd from "@/components/common/JsonLd";

import {
  getBlogPostDetail,
  getBlogPostBySlug,
  getPublishedBlogPosts,
} from "@/lib/blog";

import {
  buildBlogArticleMetadata,
  buildBlogArticleJsonLd,
} from "@/lib/blogSeo";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    return [];
  }

  return getPublishedBlogPosts().map((post) => ({
    slug: post.slugs[locale],
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const config = getBlogPostBySlug(
    locale,
    slug
  );

  if (!config) {
    notFound();
  }

  const post = await getBlogPostDetail(
    locale,
    slug
  );

  if (!post) {
    notFound();
  }

  return buildBlogArticleMetadata({
    locale,
    post,
    config,
  });
}

export default async function BlogDetailPage({
  params,
}: Props) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [post, t] = await Promise.all([
    getBlogPostDetail(locale, slug),

    getTranslations({
      locale,
      namespace: "BlogPage",
    }),
  ]);

  if (!post) {
    notFound();
  }

  const jsonLd = buildBlogArticleJsonLd({
    locale,
    post,
    homeLabel: t("breadcrumbs.home"),
    blogLabel: t("breadcrumbs.blog"),
  });

  return (
    <main
      id="main"
      className="bg-brand-paper text-brand-dark"
    >
      <JsonLd data={jsonLd} />

      <article>
        <ArticleHeader post={post} />

        <ArticleCover post={post} />

        <ArticleContent
          postId={post.id}
          locale={locale}
        />
      </article>
    </main>
  );
}