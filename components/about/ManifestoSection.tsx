import { getTranslations } from "next-intl/server";

import RevealOnScroll from "@/components/common/RevealOnScroll";

export default async function ManifestoSection() {
  const t = await getTranslations(
    "AboutPage.manifesto"
  );

  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-heading"
      className="
        bg-brand-paper px-6
        py-[clamp(64px,7vw,104px)]
        text-brand-dark

        lg:px-[7.5%]
      "
    >
      <div
        className="
          grid grid-cols-1 items-start gap-10

          lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]
          lg:gap-[clamp(40px,6vw,100px)]
        "
      >
        {/* Section heading */}
        <RevealOnScroll
          className="lg:sticky lg:top-[150px]"
        >
          <p
            className="
              flex items-center gap-[14px]
              text-[11px] font-semibold
              leading-relaxed tracking-[0.16em]
              text-text-label
            "
          >
            <span
              aria-hidden="true"
              className="h-px w-[34px] bg-current"
            />

            {t("eyebrow")}
          </p>

          <h2
            id="manifesto-heading"
            className="
              mt-[26px] font-serif font-normal
              text-[clamp(26px,2.6vw,40px)]
              leading-[1.14] tracking-[-0.035em]
            "
          >
            {t("title")}

            <br />

            <em className="italic">
              {t("subtitle")}
            </em>
          </h2>
        </RevealOnScroll>

        {/* Story content */}
        <RevealOnScroll delay={120}>
          <p
            className="
              font-serif font-normal
              text-[clamp(17px,1.5vw,22px)]
              leading-[1.62] tracking-[-0.01em]
              text-brand-dark
            "
          >
            {t.rich("lead", {
              mark: (chunks) => (
                <span
                  className="
                    shadow-[inset_0_-8px_0_rgba(191,192,189,0.45)]
                  "
                >
                  {chunks}
                </span>
              ),
            })}
          </p>

          <p
            className="
              mt-8 max-w-[62ch]
              font-sans text-[15px]
              font-normal leading-[1.8]
              text-text-body
            "
          >
            {t("description")}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}