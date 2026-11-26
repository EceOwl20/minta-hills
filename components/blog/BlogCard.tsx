import Image from "next/image";

import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { formatBlogDate } from "@/lib/formatDate";

import type { BlogPostSummary } from "@/lib/blog";

type Props = {
  post: BlogPostSummary;
};

export default async function BlogCard({
  post,
}: Props) {
  const t = await getTranslations("BlogPage");

  const href = {
    pathname: "/blog/[slug]" as const,
    params: { slug: post.slug },
  };

  return (
    <article
      className="
        flex h-full min-w-0 flex-col
        bg-white
      "
    >
      {/* Featured image */}
      <Link
        href={href}
        aria-label={post.title}
        className="
          group relative block
          aspect-[4/3]
          overflow-hidden

          bg-brand-mist

          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-brand-dark
        "
      >
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="
            (max-width: 767px) calc(100vw - 40px),
            (max-width: 1023px) 43vw,
            (max-width: 1884px) 28vw,
            540px
          "
          className="
            object-cover object-center

            transition-transform
            duration-700
            ease-out

            group-hover:scale-[1.035]

            motion-reduce:transition-none
            motion-reduce:group-hover:scale-100
          "
        />
      </Link>

      {/* Card content */}
      <div
        className="
          flex flex-1 flex-col
          p-6

          xl:p-7
        "
      >
        {/* Publication date */}
        <time
          dateTime={post.publishedAt}
          className="
            mb-5

            font-sans text-[10px]
            font-medium
            tracking-[0.14em]
            text-text-label
          "
        >
          {formatBlogDate(post.publishedAt)}
        </time>

        {/* Article title */}
        <h2
          className="
            font-sans font-normal
            text-[clamp(24px,1.8vw,36px)]
            leading-[1.12]
            tracking-[0.04em]
            text-brand-dark
          "
        >
          <Link
            href={href}
            className="
              transition-colors duration-300
              hover:text-text-body

              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-brand-dark

              motion-reduce:transition-none
            "
          >
            {post.title}
          </Link>
        </h2>

        {/* Article excerpt */}
        <p
          className="
            mt-3

            font-sans text-[16px]
            font-normal leading-[1.7]
            text-text-body
          "
        >
          {post.excerpt}
        </p>

        {/* Read article link */}
        <Link
          href={href}
          aria-label={`${t("readArticle")}: ${post.title}`}
          className="
            group mt-[30px]
            inline-flex w-fit
            items-center gap-3

            font-sans text-[11px]
            font-medium
            tracking-[0.12em]
            text-brand-dark

            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-brand-dark
          "
        >
          {t("readArticle")}

          <span
            aria-hidden="true"
            className="
              transition-transform
              duration-300 ease-out

              group-hover:translate-x-1

              motion-reduce:transition-none
              motion-reduce:group-hover:translate-x-0
            "
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
