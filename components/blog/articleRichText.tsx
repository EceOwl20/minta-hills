import "server-only";

import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { getLocalizedBlogSlug } from "@/lib/blog";
import { getReservationUrl } from "@/lib/reservation";

import type {
  BlogLocale,
  BlogPostId,
} from "@/data/blog";

type ArticlePageHref =
  | "/contact"
  | "/villas"
  | "/gallery";

const linkClassName = `
  text-brand-dark
  font-medium

  transition-colors duration-300

  hover:underline
  underline-offset-4

  focus-visible:outline-2
  focus-visible:outline-offset-4
  focus-visible:outline-brand-dark

  motion-reduce:transition-none
`;

export function createArticleRichText(
  locale: BlogLocale
) {
  function blogLink(
    postId: BlogPostId,
    chunks: ReactNode
  ) {
    const slug = getLocalizedBlogSlug(
      postId,
      locale
    );

    if (!slug) {
      return <>{chunks}</>;
    }

    return (
      <Link
        href={{
          pathname: "/blog/[slug]",
          params: { slug },
        }}
        locale={locale}
        className={linkClassName}
      >
        {chunks}
      </Link>
    );
  }

  function pageLink(
    href: ArticlePageHref,
    chunks: ReactNode
  ) {
    return (
      <Link
        href={href}
        locale={locale}
        className={linkClassName}
      >
        {chunks}
      </Link>
    );
  }

  return {
    villaGuide: (chunks: ReactNode) =>
      blogLink("kemerVillaHoliday", chunks),

    travelGuide: (chunks: ReactNode) =>
      blogLink("kemerTravelGuide", chunks),

    phaselisGuide: (chunks: ReactNode) =>
      blogLink("phaselisGuide", chunks),

    tahtaliGuide: (chunks: ReactNode) =>
      blogLink("tahtaliCableCar", chunks),

    ciraliGuide: (chunks: ReactNode) =>
      blogLink("ciraliYanartasOlympos", chunks),

    contact: (chunks: ReactNode) =>
      pageLink("/contact", chunks),

    villas: (chunks: ReactNode) =>
      pageLink("/villas", chunks),

    gallery: (chunks: ReactNode) =>
      pageLink("/gallery", chunks),

    reservation: (chunks: ReactNode) => (
      <a
        href={getReservationUrl(locale)}
        className={linkClassName}
      >
        {chunks}
      </a>
    ),

    strong: (chunks: ReactNode) => (
      <strong className="font-bold">
        {chunks}
      </strong>
    ),
  };
}
