import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { formatBlogDate } from "@/lib/formatDate";

import type { BlogPostSummary } from "@/lib/blog";

type Props = {
  post: BlogPostSummary;
};

export default async function ArticleHeader({
  post,
}: Props) {
  const t = await getTranslations("BlogDetailPage");

  return (
    <header
      className="
        mx-auto
        w-[calc(100%_-_40px)]
        max-w-[800px]
        pt-36 pb-10
        text-center
        md:pt-52 md:pb-12
        xl:pt-64 xl:pb-16
      "
    >
      {/* Back to blog */}
      <Link
        href="/blog"
        className="
          group
          inline-flex items-center gap-1.5
          font-sans text-[13px]
          font-normal
          text-text-body
          transition-colors duration-300
          hover:text-brand-dark
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-brand-dark
          motion-reduce:transition-none text-[#65635d]
        "
      >
        <span
          aria-hidden="true"
          className="
            transition-transform duration-300
            group-hover:-translate-x-1
            motion-reduce:transition-none
            motion-reduce:group-hover:translate-x-0
          "
        >
          ←
        </span>

        {t("backToBlog")}
      </Link>

      {/* Publication date */}
      <time
        dateTime={post.publishedAt}
        className="
          mt-9 block
          font-sans text-[10px]
          font-medium
          tracking-[0.14em]
          text-text-label
          md:mt-11 text-[#65635d]
        "
      >
        {formatBlogDate(post.publishedAt)}
      </time>

      {/* Article title */}
      <h1
        className="
          mt-4
          font-sans font-light
          text-[clamp(34px,4vw,76px)]
          leading-[1.02]
          tracking-[-0.045em]
          text-brand-dark
          wrap-break-word
        "
      >
        {post.title}
      </h1>

      {/* Article excerpt */}
      <p
        className="
          mx-auto mt-4
          max-w-[720px]
          font-sans font-light
          text-[clamp(17px,1.2vw,23px)]
          leading-[1.6]
          text-text-body
          md:mt-7 text-[#65635d]
        "
      >
        {post.excerpt}
      </p>
    </header>
  );
}