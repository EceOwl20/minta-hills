import { getTranslations } from "next-intl/server";

export default async function BlogHero() {
  const t = await getTranslations("BlogPage.hero");

  return (
    <header
      className="
        border-b border-black/12
        bg-brand-paper
      "
    >
      <div
        className="
          mx-auto
          w-[calc(100%-40px)]
          max-w-[1620px]

          pt-40 pb-16

          md:w-[86%]
          md:pt-52 md:pb-20

          xl:pt-[280px]
          xl:pb-28
        "
      >
        {/* Eyebrow */}
        <p
          className="
            mb-4

            font-sans
            text-[10px] font-medium
            uppercase tracking-[0.24em]
            text-text-label text-[#5e5d57]
          "
        >
          {t("eyebrow")}
        </p>

        {/* Page title */}
        <h1
          className="
            font-sans font-light
            text-[clamp(56px,6vw,112px)]
            leading-[1.05]
            tracking-[-0.045em]
            text-brand-dark
          "
        >
          {t("title")}
        </h1>

        {/* Page description */}
        <p
          className="
            mt-6
            max-w-[620px]
            font-sans font-normal
            text-[clamp(17px,1.25vw,24px)]
            leading-[1.6]
            text-text-body text-[#5e5d57]
          "
        >
          {t("description")}
        </p>
      </div>
    </header>
  );
}