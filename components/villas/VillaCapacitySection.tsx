import {
  getTranslations,
  getFormatter,
} from "next-intl/server";

import RevealOnScroll from "@/components/common/RevealOnScroll";

import { villaConfig } from "@/data/villas";

const bedTypes = ["double", "single"] as const;

type BedType = (typeof bedTypes)[number];

function BedIcon({ type }: { type: BedType }) {
  return (
    <svg
      viewBox="0 0 44 30"
      width="44"
      height="30"
      fill="none"
      stroke="#cfcfc9"
      strokeWidth={1.3}
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        x="1"
        y="11"
        width="42"
        height="14"
        rx="2"
      />

      {type === "double" ? (
        <path d="M6 11V6h14v5M24 11V6h14v5M1 25v4M43 25v4" />
      ) : (
        <path d="M12 11V6h20v5M1 25v4M43 25v4" />
      )}
    </svg>
  );
}

export default async function VillaCapacitySection() {
  const t = await getTranslations("VillasPage.capacity");
  const format = await getFormatter();

  const { specs, beds } = villaConfig;

  const values = {
    doubleBeds: beds.double,
    singleBeds: beds.single,
    capacity: specs.capacity,
  };

  return (
    <section
      id="villa-capacity"
      aria-labelledby="villa-capacity-heading"
      className="
        bg-[#191919] text-white

        px-5 py-[clamp(64px,7vw,104px)]

        min-[761px]:px-[6%]
        min-[1101px]:px-[7.5%]
      "
    >
      <div
        className="
          grid grid-cols-1
          items-center gap-7

          min-[1101px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
          min-[1101px]:gap-[clamp(34px,5vw,80px)]
        "
      >
        {/* Section content */}
        <RevealOnScroll>
          {/* Section label */}
          <p
            className="
              flex items-center gap-[14px]

              text-[11px] font-semibold
              uppercase leading-relaxed
              tracking-[0.16em]
              text-[#b4b4ad]
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px w-[34px]
                shrink-0 bg-current
              "
            />

            {t("eyebrow")}
          </p>

          {/* Section heading */}
          <h2
            id="villa-capacity-heading"
            className="
              mt-6 mb-[18px]

              font-serif font-normal
              text-[clamp(26px,2.6vw,40px)]
              leading-[1.14]
              tracking-[-0.035em]
              text-white
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
              font-sans text-[14px]
              font-normal leading-[1.8]
              text-white/95
            "
          >
            {t("description", values)}
          </p>
        </RevealOnScroll>

        {/* Sleeping arrangements */}
        <div
          className="
            grid min-w-0 grid-cols-1 gap-4

            min-[761px]:grid-cols-2
          "
        >
          {bedTypes.map((type, index) => (
            <RevealOnScroll
              key={type}
              delay={index * 100}
              className="min-w-0"
            >
              <div
                className="
                  flex h-full flex-col gap-4

                  border border-[#45453f]
                  bg-transparent

                  px-7 py-[30px]

                  transition-colors
                  duration-300 ease-in-out

                  hover:border-[#555555]
                  hover:bg-white/[0.03]

                  motion-reduce:transition-none
                "
              >
                {/* Bed icon */}
                <BedIcon type={type} />

                {/* Bed quantity */}
                <strong
                  className="
                    font-serif font-normal
                    text-[28px] leading-none
                    text-white
                    tabular-nums
                  "
                >
                  {format.number(beds[type])}
                </strong>

                {/* Bed type */}
                <span
                  className="
                    text-[11px] font-semibold
                    uppercase leading-relaxed
                    tracking-[0.12em]
                    text-[#d4d4cf]
                  "
                >
                  {t(`beds.${type}`)}
                </span>
              </div>
            </RevealOnScroll>
          ))}

          {/* Total accommodation capacity */}
          <RevealOnScroll
            delay={200}
            className="min-w-0 min-[761px]:col-span-2"
          >
            <div
              className="
                flex flex-col
                items-start justify-between
                gap-3

                bg-brand-paper
                px-7 py-[26px]
                text-brand-dark

                min-[761px]:flex-row
                min-[761px]:flex-wrap
                min-[761px]:items-center
                min-[761px]:gap-5
              "
            >
              {/* Total guest count */}
              <strong
                className="
                  flex items-baseline gap-[10px]
                  font-serif font-normal
                  text-[34px] leading-none
                  tabular-nums
                "
              >
                {format.number(specs.capacity)}

                <span
                  className="
                    font-sans text-[11px]
                    font-normal uppercase
                    tracking-[0.14em]
                  "
                >
                  {t("guestUnit")}
                </span>
              </strong>

              {/* Total capacity label */}
              <span
                className="
                  text-[11px] font-semibold
                  uppercase leading-relaxed
                  tracking-[0.12em]
                  text-text-label text-[#4a4a44]
                "
              >
                {t("total")}
              </span>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}