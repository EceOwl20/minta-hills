import {
  blogPosts,
  type BlogLocale,
} from "@/data/blog";

export function getLocalizedBlogPathname(
  pathname: string,
  currentLocale: BlogLocale,
  targetLocale: BlogLocale
): string {
  const match = /^\/blog\/([^/]+)\/?$/.exec(pathname);

  // Preserve the pathname for non-blog pages.
  if (!match) {
    return pathname;
  }

  const currentSlug = match[1];

  const post = blogPosts.find(
    (post) =>
      post.status === "published" &&
      post.slugs[currentLocale] === currentSlug
  );

  // Fall back to the blog listing if the post is unavailable.
  if (!post) {
    return "/blog";
  }

  return `/blog/${post.slugs[targetLocale]}`;
}