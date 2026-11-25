import Image from "next/image";
import { getTranslations } from "next-intl/server";

import RevealOnScroll from "@/components/common/RevealOnScroll";
import { destinationExperiences } from "@/data/experiences";

export default async function ExperienceGridSection() {
  const t = await getTranslations(
    "ExperiencesPage.grid"
  );

  return (
    <section
      id="experience-grid"
      aria-labelledby="experience-grid-heading"
      className="
        bg-brand-paper text-brand-dark

        px-5 py-[clamp(64px,7vw,104px)]

        min-[761px]:px-[7.5%]
      "
    >
      {/* Section heading */}
      <RevealOnScroll
        className="
          mb-[clamp(40px,4.5vw,72px)]
          max-w-[800px]
        "
      >
        {/* Section label */}
        <p
          className="
            flex items-center gap-[14px]
            text-[11px] font-semibold
            uppercase leading-relaxed
            tracking-[0.16em]
            text-text-label text-[#4a4a44]
          "
        >
          <span
            aria-hidden="true"
            className="
              h-px w-[34px] shrink-0
              bg-current
            "
          />

          {t("eyebrow")}
        </p>

        {/* Section title */}
        <h2
          id="experience-grid-heading"
          className="
            mt-6 mb-5

            font-serif font-normal
            text-[clamp(26px,2.6vw,40px)]
            leading-[1.14]
            tracking-[-0.035em]"
        >
          {t.rich("title", {
            italic: (chunks) => (
              <em className="font-normal italic">
                {chunks}
              </em>
            ),
          })}

          <br />
          {t("subtitle")}
        </h2>

        {/* Section description */}
        <p
          className="
            max-w-[750px]
            text-[15px] font-normal
            leading-[1.8]
            text-text-body"
        >
          {t("description")}
        </p>
      </RevealOnScroll>

      {/* Destination grid */}
      <div
        className="
          grid grid-cols-1 gap-5

          min-[761px]:grid-cols-2

          min-[1101px]:grid-cols-3
          min-[1101px]:gap-6
        "
      >
        {destinationExperiences.map((item, index) => (
          <RevealOnScroll
            key={item.id}
            delay={(index % 3) * 100}
            className={`
              min-w-0
              ${
                item.wide
                  ? "min-[761px]:col-span-2"
                  : ""
              }
            `}
          >
            <article
              className="
                group relative isolate
                flex h-full flex-col
                justify-between
                overflow-hidden
                min-h-[340px]
                bg-brand-charcoal text-white
                p-[clamp(24px,2.2vw,36px)]
                min-[1101px]:min-h-[380px]
              "
            >
              {/* Background image */}
              <Image
                src={item.image}
                alt={t(`items.${item.id}.imageAlt`)}
                fill
                sizes={
                  item.wide
                    ? "(min-width: 1101px) 57vw, (min-width: 761px) 85vw, 100vw"
                    : "(min-width: 1101px) 28vw, (min-width: 761px) 43vw, 100vw"
                }
                className="
                  object-cover object-center

                  transition-transform
                  duration-[900ms]
                  ease-[cubic-bezier(0.16,1,0.3,1)]

                  group-hover:scale-105

                  motion-reduce:transition-none
                  motion-reduce:group-hover:scale-100
                "
              />

              {/* Gradient overlay */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute inset-0 z-10

                  bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.07)_25%,rgba(0,0,0,0.10)_55%,rgba(0,0,0,0.12)_80%,rgba(0,0,0,0.20)_100%)]
                "
              />

              {/* Top badge */}
              <span
                className="
                  relative z-20
                  mb-10 self-start

                  bg-white px-[14px] py-[8px]

                  text-[11px] font-semibold
                  uppercase leading-relaxed
                  tracking-[0.12em]
                  text-brand-dark
                "
              >
                {t(`items.${item.id}.badge`)}
              </span>

              {/* Card content */}
              <div
                className="
                  relative z-20
                  w-full

                  [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]
                "
              >
                {/* Experience category */}
                <p
                  className="
                    mb-3

                    text-[11px] font-semibold
                    uppercase leading-relaxed
                    tracking-[0.14em]
                    text-white
                  "
                >
                  {t(`items.${item.id}.category`)}
                </p>

                {/* Experience title */}
                <h3
                  className="
                    mb-3

                    font-serif font-normal
                    text-[clamp(20px,1.8vw,26px)]
                    leading-[1.2]
                    tracking-[-0.025em]
                  "
                >
                  {t(`items.${item.id}.title`)}
                </h3>

                {/* Experience description */}
                <p
                  className="
                    text-[15px] font-normal
                    leading-[1.7]
                    text-white/95
                  "
                >
                  {t(`items.${item.id}.description`)}
                </p>
              </div>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}