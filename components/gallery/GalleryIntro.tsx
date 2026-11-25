import { getTranslations } from "next-intl/server";

export default async function GalleryIntro() {
  const t = await getTranslations("GalleryPage.intro");

  return (
    <section
      aria-labelledby="gallery-intro-heading"
      className="
        mx-auto grid
        w-[calc(100%-32px)]
        max-w-[1180px]

        grid-cols-1 items-end
        gap-3

        pt-[34px] pb-[18px]

        min-[821px]:w-[calc(100%-48px)]
        min-[821px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
        min-[821px]:gap-10
        min-[821px]:pt-11
        min-[821px]:pb-[22px]
      "
    >
      {/* Introduction heading */}
      <h2
        id="gallery-intro-heading"
        className="
          font-sans font-light
          text-[clamp(28px,3vw,42px)]
          leading-[1.08]
          tracking-[-0.025em]
          text-brand-dark
        "
      >
        {t("title")}
      </h2>

      {/* Introduction description */}
      <p
        className="
          max-w-[580px]

          font-sans text-[14px]
          font-normal leading-[1.7]
          text-text-body
        "
      >
        {t("description")}
      </p>
    </section>
  );
}