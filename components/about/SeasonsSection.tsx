import Image from "next/image";
import { getTranslations } from "next-intl/server";

import RevealOnScroll from "@/components/common/RevealOnScroll";
import { aboutSeasons } from "@/data/about";

export default async function SeasonsSection() {
  const t = await getTranslations("AboutPage.seasons");

  return (
    <section
      id="seasons"
      aria-labelledby="seasons-heading"
      className="bg-brand-paper text-brand-dark"
    >
      {/* Section heading */}
      <RevealOnScroll
        className="
          px-5
          pt-[clamp(80px,9vw,130px)]
          pb-[clamp(36px,4vw,60px)]

          min-[761px]:px-[7.5%]
        "
      >
        <div className="max-w-[650px]">
          {/* Section label */}
          <p
            className="
              flex items-center gap-[14px]

              text-[11px] font-semibold
              uppercase leading-relaxed
              tracking-[0.16em]
              text-text-label
            "
          >
            <span
              aria-hidden="true"
              className="h-px w-[34px] shrink-0 bg-current"
            />

            {t("eyebrow")}
          </p>

          {/* Section title */}
          <h2
            id="seasons-heading"
            className="
              mt-6 mb-[18px]
              font-serif font-normal
              text-[clamp(26px,2.6vw,40px)]
              leading-[1.14]
              tracking-[-0.035em]
            "
          >
            {t("title")}

            <br />

            <em className="font-normal italic">
              {t("subtitle")}
            </em>
          </h2>

          {/* Section description */}
          <p
            className="
              max-w-[600px]
              text-[15px] font-normal
              leading-[1.8]
              text-text-body
            "
          >
            {t("description")}
          </p>
        </div>
      </RevealOnScroll>

      {/* Seasonal cards */}
      <div
        className="
          grid grid-cols-1
          min-[761px]:grid-cols-2
        "
      >
        {aboutSeasons.map((item, index) => (
          <RevealOnScroll
            key={item.id}
            delay={index * 120}
            className="min-w-0"
          >
            <article
              className="
                group relative isolate
                flex h-full items-end
                overflow-hidden bg-brand-charcoal

                min-h-[340px]
                px-6 py-[30px]

                text-white

                min-[761px]:min-h-[clamp(300px,32vw,400px)]
                min-[761px]:px-[clamp(28px,3.4vw,56px)]
                min-[761px]:py-[42px]
              "
            >
              {/* Background image */}
              <Image
                src={item.image}
                alt={t(`${item.id}.imageAlt`)}
                fill
                sizes="(min-width: 761px) 50vw, 100vw"
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

                  bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.12)_32%,rgba(0,0,0,0.50)_56%,rgba(0,0,0,0.80)_80%,rgba(0,0,0,0.92)_100%)]
                "
              />

              {/* Card content */}
              <div
                className="
                  relative z-20 w-full

                  [text-shadow:0_1px_14px_rgba(0,0,0,0.45)]
                "
              >
                {/* Season tag */}
                <span
                  className="
                    mb-4 inline-block
                    rounded-full
                    border border-white/55

                    px-[15px] py-[7px]

                    text-[11px] font-semibold
                    uppercase leading-relaxed
                    tracking-[0.12em]
                  "
                >
                  {t(`${item.id}.tag`)}
                </span>

                {/* Card heading */}
                <h3
                  className="
                    mb-[10px]
                    font-serif font-normal
                    text-[clamp(20px,1.8vw,26px)]
                    leading-[1.2]
                    tracking-[-0.03em]
                  "
                >
                  {t(`${item.id}.title`)}
                </h3>

                {/* Card description */}
                <p
                  className="
                    max-w-[34ch]
                    text-[14px] font-normal
                    leading-[1.75]
                    text-white/90
                  "
                >
                  {t(`${item.id}.description`)}
                </p>
              </div>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}