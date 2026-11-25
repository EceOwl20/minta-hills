import { getTranslations } from "next-intl/server";

import RevealOnScroll from "@/components/common/RevealOnScroll";
import { distances } from "@/data/distances";

type Props = {
  variant?: "hospitality" | "experiences";
};

export default async function DistancesSection({
  variant = "hospitality",
}: Props) {
  const t = await getTranslations("DistancesSection");

  return (
    <section
      id="distances"
      aria-labelledby="distances-heading"
      className="
        bg-brand-paper text-brand-dark

        px-5 py-[clamp(64px,7vw,104px)]

        min-[761px]:px-[7.5%]
      "
    >
      {/* Section heading */}
      <RevealOnScroll
        className="mb-[clamp(40px,4vw,64px)]"
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
            className="
              h-px w-[34px] shrink-0
              bg-current
            "
          />

          {t(`headings.${variant}.eyebrow`)}
        </p>

        {/* Section title */}
        <h2
          id="distances-heading"
          className="
            mt-6

            font-serif font-normal
            text-[clamp(26px,2.6vw,40px)]
            leading-[1.14]
            tracking-[-0.035em]
          "
        >
          {t.rich(`headings.${variant}.title`, {
            italic: (chunks) => (
              <em className="font-normal italic">
                {chunks}
              </em>
            ),
          })}

          {variant === "hospitality" && (
            <>
              <br />

              {t("headings.hospitality.subtitle")}
            </>
          )}
        </h2>
      </RevealOnScroll>

      {/* Distance list */}
      <ul className="border-t border-black/25">
        {distances.map((item, index) => (
          <li
            key={item.id}
            className="
              group
              border-b border-black/25
            "
          >
            <RevealOnScroll
              delay={index * 60}
              className="
                flex min-h-[72px]
                items-center gap-3

                px-0.5 py-5

                min-[761px]:min-h-[82px]
                min-[761px]:gap-[18px]
                min-[761px]:py-6
              "
            >
              {/* Location name */}
              <span
                className="
                  min-w-0

                  font-serif font-normal
                  text-[clamp(18px,1.5vw,24px)]
                  leading-[1.4]
                  text-brand-dark

                  transition-transform
                  duration-500
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  group-hover:translate-x-[5px]

                  motion-reduce:transition-none
                  motion-reduce:group-hover:translate-x-0
                "
              >
                {t(`places.${item.id}`)}
              </span>

              {/* Dotted separator */}
              <span
                aria-hidden="true"
                className="
                  min-w-3 flex-1
                  border-t border-dotted
                  border-black/25
                "
              />

              {/* Distance */}
              <span
                className="
                  shrink-0 whitespace-nowrap

                  text-[11px] font-semibold
                  uppercase leading-relaxed
                  tracking-[0.1em]
                  text-text-label
                  tabular-nums
                "
              >
                {t("distance", {
                  distance: item.distance,
                })}
              </span>
            </RevealOnScroll>
          </li>
        ))}
      </ul>
    </section>
  );
}