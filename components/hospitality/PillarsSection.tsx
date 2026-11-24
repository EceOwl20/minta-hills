import { getTranslations } from "next-intl/server";

import RevealOnScroll from "@/components/common/RevealOnScroll";
import { hospitalityPillars } from "@/data/hospitality";

export default async function PillarsSection() {
  const t = await getTranslations(
    "HospitalityPage.pillars"
  );

  return (
    <section
      id="pillars"
      aria-label={t("label")}
      className="
        grid grid-cols-1

        border-t border-black/25
        bg-brand-paper text-brand-dark

        min-[621px]:grid-cols-2
        min-[1101px]:grid-cols-4
      "
    >
      {hospitalityPillars.map((item, index) => (
        <div
          key={item.id}
          className={`
            group min-w-0
            border-b border-black/25

            transition-colors duration-300
            hover:bg-white/50
            motion-reduce:transition-none

            ${
              index % 2 === 0
                ? "min-[621px]:border-r"
                : ""
            }

            ${
              index === 1
                ? "min-[1101px]:border-r"
                : ""
            }
          `}
        >
          <RevealOnScroll
            delay={index * 100}
            className="h-full"
          >
            <article
              className="
                flex h-full flex-col items-start

                px-[clamp(22px,2.2vw,36px)]
                py-[clamp(32px,3.4vw,52px)]
              "
            >
              {/* Category and number */}
              <span
                className="
                  mb-[clamp(28px,3vw,46px)]

                  text-[11px] font-semibold
                  uppercase leading-relaxed
                  tracking-[0.16em]
                  text-text-label
                "
              >
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                  {" — "}
                </span>

                {t(`${item.id}.category`)}
              </span>

              {/* Pillar title */}
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

              {/* Pillar description */}
              <p
                className="
                  mb-[18px]

                  text-[15px] font-normal
                  leading-[1.8]
                  text-text-body
                "
              >
                {t(`${item.id}.description`)}
              </p>

              {/* Supporting fact */}
              <span
                className="
                  mt-auto inline-block
                  border-t border-black/25
                  pt-[13px]

                  text-[11px] font-semibold
                  uppercase leading-relaxed
                  tracking-[0.12em]
                  text-brand-dark
                "
              >
                {t(`${item.id}.fact`)}
              </span>
            </article>
          </RevealOnScroll>
        </div>
      ))}
    </section>
  );
}