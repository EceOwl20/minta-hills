import Image from "next/image";
import { getTranslations } from "next-intl/server";

import RevealOnScroll from "@/components/common/RevealOnScroll";
import { featuredExperience } from "@/data/experiences";

export default async function FeaturedExperienceSection() {
  const t = await getTranslations(
    "ExperiencesPage.featured"
  );

  return (
    <section
      id="featured-experience"
      aria-labelledby="featured-experience-heading"
      className="
        relative isolate flex
        min-h-[380px]
        items-center overflow-hidden

        bg-brand-charcoal text-white

        px-5 py-[clamp(64px,6vw,104px)]

        min-[761px]:min-h-[clamp(420px,32vw,520px)]
        min-[761px]:px-[7.5%]
      "
    >
      {/* Background image */}
      <Image
        src={featuredExperience.image}
        alt={t("imageAlt")}
        fill
        sizes="100vw"
        className="
          object-cover object-center
        "
      />

      {/* Horizontal gradient */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-10

          bg-[linear-gradient(90deg,rgba(0,0,0,0.80)_0%,rgba(0,0,0,0.55)_38%,rgba(0,0,0,0.18)_75%,rgba(0,0,0,0.08)_100%)]
        "
      />

      {/* Vertical gradient */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-10

          bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.10)_35%,rgba(0,0,0,0.68)_100%)]
        "
      />

      {/* Featured experience content */}
      <RevealOnScroll
        className="
          relative z-20
          w-full max-w-[540px]
        "
      >
        {/* Section label */}
        <p
          className="
            flex items-center gap-[14px]

            text-[11px] font-semibold
            uppercase leading-relaxed
            tracking-[0.16em]
            text-white
          "
        >
          <span
            aria-hidden="true"
            className="
              h-px w-[34px] shrink-0
              bg-white/65
            "
          />

          {t("eyebrow")}
        </p>

        {/* Section heading */}
        <h2
          id="featured-experience-heading"
          className="
            mt-6 mb-5

            font-serif font-normal
            text-[clamp(28px,3vw,44px)]
            leading-[1.14]
            tracking-[-0.035em]

            [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]
          "
        >
          {t("title")}

          <br />

          <em className="font-normal italic">
            {t("subtitle")}
          </em>
        </h2>

        {/* Experience description */}
        <p
          className="
            max-w-[520px]

            text-[15px] font-normal
            leading-[1.75]
            text-white/95

            [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]
          "
        >
          {t("description")}
        </p>

        {/* Experience facts */}
        <ul
          className="
            mt-7 flex flex-wrap
            items-center gap-[10px]
          "
        >
          {featuredExperience.facts.map((fact) => (
            <li
              key={fact}
              className="
                inline-flex max-w-full
                items-center justify-center

                rounded-full
                border border-white/70

                px-4 py-[9px]

                text-[11px] font-semibold
                uppercase leading-relaxed
                tracking-[0.08em]
                text-white
              "
            >
              {t(`facts.${fact}`)}
            </li>
          ))}
        </ul>
      </RevealOnScroll>
    </section>
  );
}