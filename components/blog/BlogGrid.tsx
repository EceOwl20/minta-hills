import { getTranslations } from "next-intl/server";

import BlogCard from "./BlogCard";

import type { BlogPostSummary } from "@/lib/blog";

type Props = {
  posts: readonly BlogPostSummary[];
};

export default async function BlogGrid({
  posts,
}: Props) {
  const t = await getTranslations("BlogPage");

  return (
    <section
      aria-label={t("gridLabel")}
      className="
        mx-auto
        w-[calc(100%-40px)]
        max-w-[1620px]

        py-16

        md:w-[86%]
        md:py-20

        xl:py-[120px]
      "
    >
      {posts.length === 0 ? (
        /* Empty state */
        <p
          className="
            py-10

            text-center
            font-sans text-[16px]
            font-normal leading-relaxed
            text-text-body
          "
        >
          {t("empty")}
        </p>
      ) : (
        /* Blog posts grid */
        <div
          className="
            grid grid-cols-1
            items-stretch gap-6

            md:grid-cols-2
            md:gap-8

            lg:grid-cols-3

            xl:gap-12
          "
        >
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      )}
    </section>
  );
}