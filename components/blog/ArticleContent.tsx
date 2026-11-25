import { getTranslations } from "next-intl/server";

import { createArticleRichText } from "./articleRichText";

import type {
  BlogLocale,
  BlogPostId,
  BlogArticleContent,
} from "@/data/blog";

type Props = {
  postId: BlogPostId;
  locale: BlogLocale;
};

export default async function ArticleContent({
  postId,
  locale,
}: Props) {
  const t = await getTranslations({
    locale,
    namespace: "BlogPosts",
  });

  const contentKey = `${postId}.content`;

  const content = t.raw(
    contentKey
  ) as BlogArticleContent;

  const richText = createArticleRichText(locale);

  return (
    <div
      className="
        mx-auto
        w-[calc(100%_-_40px)]
        max-w-[720px]

        pt-14 pb-20

        font-sans font-normal
        text-[17px]
        leading-[1.85]
        text-text-body

        wrap-break-word

        md:pt-20 md:pb-28
        md:text-[18px]

        xl:pt-[100px] xl:pb-40
      "
    >
      {/* Article introduction */}
      <p>
        {t.rich(
          `${contentKey}.intro`,
          richText
        )}
      </p>

      {/* Article sections */}
      {content.sections.map(
        (section, sectionIndex) => {
          const sectionKey =
            `${contentKey}.sections.${sectionIndex}`;

          return (
            <section
              key={section.id}
              aria-labelledby={`article-${section.id}`}
              className="
                mt-12
                md:mt-16
              "
            >
              {/* Section title */}
              <h2
                id={`article-${section.id}`}
                className="
                  mb-6
                  font-sans font-normal
                  text-[clamp(26px,1.8vw,34px)]
                  leading-[1.25]
                  tracking-[0.06em]
                  text-brand-dark
                  scroll-mt-36
                "
              >
                {t.rich(
                  `${sectionKey}.title`,
                  richText
                )}
              </h2>

              {/* Section paragraphs */}
              {!!section.paragraphs?.length && (
                <div className="space-y-5">
                  {section.paragraphs.map(
                    (_, paragraphIndex) => (
                      <p key={paragraphIndex}>
                        {t.rich(
                          `${sectionKey}.paragraphs.${paragraphIndex}`,
                          richText
                        )}
                      </p>
                    )
                  )}
                </div>
              )}

              {/* Section list */}
              {!!section.list?.length && (
                <ul
                  role="list"
                  className={`
                    list-none
                    ${
                      section.paragraphs?.length
                        ? "mt-5"
                        : ""
                    }
                  `}
                >
                  {section.list.map(
                    (_, listIndex) => (
                      <li key={listIndex}>
                        {t.rich(
                          `${sectionKey}.list.${listIndex}`,
                          richText
                        )}
                      </li>
                    )
                  )}
                </ul>
              )}
            </section>
          );
        }
      )}

      {/* Optional closing paragraph */}
      {content.outro && (
        <p className="mt-5">
          {t.rich(
            `${contentKey}.outro`,
            richText
          )}
        </p>
      )}

      {/* Article sources and image credits */}
      {content.sources && (
        <footer
          className="
            mt-5
            border-t border-black/35
            pt-3
          "
        >
          <p className="italic">
            {t.rich(
              `${contentKey}.sources`,
              richText
            )}
          </p>
        </footer>
      )}
    </div>
  );
}