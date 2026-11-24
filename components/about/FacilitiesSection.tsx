import Image from "next/image";
import { getTranslations } from "next-intl/server";

import RevealOnScroll from "@/components/common/RevealOnScroll";
import { aboutFacilities } from "@/data/about";

export default async function FacilitiesSection() {
  const t = await getTranslations("AboutPage.facilities");

  return (
    <section
      id="facilities"
      aria-labelledby="facilities-heading"
      className="
        bg-brand-mist text-brand-dark
        px-5 py-[clamp(64px,7vw,104px)]

        min-[761px]:px-[7.5%]
      "
    >
      {/* Section heading */}
      <RevealOnScroll
        className="
          mb-[clamp(40px,4.5vw,68px)]
          max-w-[700px]
        "
      >
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
          id="facilities-heading"
          className="
            mt-6 font-serif font-normal
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
      </RevealOnScroll>

      {/* Facility cards */}
      <div
        className="
          grid grid-cols-1 gap-[22px]
          min-[761px]:grid-cols-2
        "
      >
        {aboutFacilities.map((item, index) => (
          <RevealOnScroll
            key={item.id}
            delay={index * 120}
            className="min-w-0"
          >
            <article
              className="
                group flex h-full flex-col
                bg-white
              "
            >
              {/* Facility image */}
              <div
                className="
                  relative aspect-4/3
                  overflow-hidden
                  bg-brand-paper
                "
              >
                <Image
                  src={item.image}
                  alt={t(`${item.id}.imageAlt`)}
                  fill
                  sizes="(min-width: 761px) 43vw, 100vw"
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
              </div>

              {/* Card content */}
              <div
                className="
                  flex flex-1 flex-col items-start

                  px-[clamp(24px,2.6vw,40px)]
                  pt-8 pb-[38px]
                "
              >
                {/* Card title */}
                <h3
                  className="
                    mb-3
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
                    mb-5
                    text-[15px] font-normal
                    leading-[1.8]
                    text-text-body
                  "
                >
                  {t(`${item.id}.description`)}
                </p>

                {/* Card note */}
                <span
                  className="
                    mt-auto inline-block
                    border-t border-black/25
                    pt-[14px]

                    text-[11px] font-semibold
                    uppercase leading-relaxed
                    tracking-[0.12em]
                    text-text-label
                  "
                >
                  {t(`${item.id}.note`)}
                </span>
              </div>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}