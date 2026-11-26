import {
  blogPosts,
  type BlogLocale,
} from "@/data/blog";

export function getLocalizedBlogSlug(
  currentSlug: string,
  currentLocale: BlogLocale,
  targetLocale: BlogLocale
): string | undefined {
  const post = blogPosts.find(
    (post) =>
      post.status === "published" &&
      post.slugs[currentLocale] === currentSlug
  );

  return post?.slugs[targetLocale];
}
