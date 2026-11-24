import Image from "next/image";
import { getTranslations } from "next-intl/server";

import RevealOnScroll from "@/components/common/RevealOnScroll";
import { villaConfig } from "@/data/villas";

const roomKeys = [
  "kitchens",
  "bedrooms",
  "toilets",
  "bathrooms",
  "balconies",
] as const;

export default async function VillaAnatomySection() {
  const t = await getTranslations("AboutPage.anatomy");

  return (
    <section
      id="villa-anatomy"
      aria-labelledby="villa-anatomy-heading"
      className="
        bg-[#191919] text-white
        px-5 py-[clamp(64px,7vw,104px)]

        md:px-[6%]
        min-[1101px]:px-[7.5%]
      "
    >
      {/* Section heading */}
      <div
        className="
          mb-[clamp(34px,5vw,78px)]
          grid grid-cols-1 items-end gap-[34px]

          min-[1101px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]
          min-[1101px]:gap-[clamp(30px,5vw,80px)]
        "
      >
        <RevealOnScroll>
          {/* Section label */}
          <p
            className="
              flex items-center gap-[14px]
              text-[11px] font-semibold
              leading-relaxed tracking-[0.16em]
              text-on-dark-label
            "
          >
            <span
              aria-hidden="true"
              className="h-px w-[34px] shrink-0 bg-current"
            />

            {t("eyebrow")}
          </p>

          {/* Heading */}
          <h2
            id="villa-anatomy-heading"
            className="
              mt-6 font-serif font-normal
              text-[clamp(26px,2.6vw,40px)]
              leading-[1.14] tracking-[-0.035em]
            "
          >
            {t("title")}

            <br />

            <em className="font-normal italic">
              {t("subtitle")}
            </em>
          </h2>
        </RevealOnScroll>

        {/* Description */}
        <RevealOnScroll delay={120}>
          <p
            className="
              text-[15px] font-normal
              leading-[1.8] text-white/90
            "
          >
            {t("description", {
              double: villaConfig.beds.double,
              single: villaConfig.beds.single,
              capacity: villaConfig.specs.capacity,
            })}
          </p>
        </RevealOnScroll>
      </div>

      {/* Main content */}
      <div
        className="
          grid grid-cols-1 items-center
          gap-[34px]

          min-[1101px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]
          min-[1101px]:gap-[clamp(36px,5vw,78px)]
        "
      >
        {/* Villa image */}
        <RevealOnScroll className="relative min-w-0">
          <div
            className="
              relative
              h-[clamp(320px,34vw,460px)]
              overflow-hidden bg-brand-charcoal
            "
          >
            <Image
              src="/images/interiors/living.jpg"
              alt={t("imageAlt")}
              fill
              sizes="(min-width: 1101px) 40vw, 90vw"
              className="object-cover object-center"
            />
          </div>

          {/* Villa count badge */}
          <div
            className="
              absolute bottom-[18px] right-[18px]
              z-10 grid size-[112px]
              place-items-center rounded-full
              bg-brand-paper text-brand-dark

              min-[1101px]:-right-[34px]
              min-[1101px]:bottom-[42px]
              min-[1101px]:size-[132px]
            "
          >
            <div
              className="
                flex size-[88%] flex-col
                items-center justify-center
                rounded-full
                
                px-2 text-center
              "
            >
              <strong
                className="
                  font-serif text-[34px]
                  font-normal leading-none
                  tracking-[-0.04em]
                "
              >
                {villaConfig.count}
              </strong>

              <span
                className="
                  mt-2 text-[11px] font-semibold
                  leading-relaxed tracking-[0.1em]
                "
              >
                {t("badge")}
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Villa specifications */}
        <RevealOnScroll delay={150} className="min-w-0">
          <dl className="border-t border-[#45453f]">
            {roomKeys.map((key, index) => (
              <div
                key={key}
                className="
                  grid grid-cols-[34px_minmax(0,1fr)]
                  items-baseline gap-x-[18px] gap-y-1
                  border-b border-[#45453f]
                  px-1 py-[19px]

                  md:grid-cols-[42px_minmax(0,1fr)_auto]
                "
              >
                {/* Room number */}
                <span
                  aria-hidden="true"
                  className="
                    text-[11px] font-semibold
                    tracking-[0.12em]
                    text-on-dark-label text-[#a4a5a0]
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Room name */}
                <dt
                  className="
                    min-w-0 font-serif font-normal
                    text-[14px] leading-tight
                    tracking-[-0.02em]
                    text-white
                    wrap-break-word
                  "
                >
                  {t(`rooms.${key}`)}
                </dt>

                {/* Quantity */}
                <dd
                  className="
                    col-start-2
                    text-[11px] font-semibold
                    leading-relaxed tracking-[0.1em]
                    text-white/75

                    md:col-start-3
                  "
                >
                  {t("quantity", {
                    count: villaConfig.specs[key],
                  })}
                </dd>
              </div>
            ))}
          </dl>

          {/* Sleeping arrangements */}
          <div
            className="
              mt-[34px] flex flex-col
              items-start gap-5
              border border-[#45453f]
              p-[22px]

              md:flex-row md:flex-wrap
              md:items-center md:gap-[26px]
              md:px-7 md:py-[26px]
            "
          >
            {/* Bed types */}
            <div
              className="
                flex flex-col gap-[14px]
                md:flex-row md:flex-wrap md:gap-[26px]
              "
            >
              {/* Double beds */}
              <div className="flex items-center gap-[10px]">
                <svg
                  width={30}
                  height={22}
                  viewBox="0 0 32 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.4}
                  aria-hidden="true"
                  className="shrink-0 text-white/80"
                >
                  <rect
                    x="1"
                    y="8"
                    width="30"
                    height="10"
                    rx="2"
                  />

                  <path d="M4 8V5h10v3M18 8V5h10v3" />
                </svg>

                <p
                  className="
                    text-[14px] font-normal
                    leading-relaxed tracking-[0.1em]
                    text-white/80
                  "
                >
                  {t("beds.double", {
                    count: villaConfig.beds.double,
                  })}
                </p>
              </div>

              {/* Single beds */}
              <div className="flex items-center gap-[10px]">
                <svg
                  width={30}
                  height={22}
                  viewBox="0 0 32 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.4}
                  aria-hidden="true"
                  className="shrink-0 text-white/80"
                >
                  <rect
                    x="1"
                    y="8"
                    width="30"
                    height="10"
                    rx="2"
                  />

                  <path d="M8 8V5h16v3" />
                </svg>

                <p
                  className="
                    text-[11px] font-semibold
                    leading-relaxed tracking-[0.1em]
                    text-white/80
                  "
                >
                  {t("beds.single", {
                    count: villaConfig.beds.single,
                  })}
                </p>
              </div>
            </div>

            {/* Total capacity */}
            <div
              className="
                flex items-center gap-[10px]
                md:ml-auto
              "
            >
              <strong
                className="
                  font-serif text-[34px]
                  font-normal leading-none
                "
              >
                {villaConfig.specs.capacity}
              </strong>

              <span
                className="
                  text-[11px] font-semibold
                  leading-relaxed tracking-[0.1em]
                  text-white/75
                "
              >
                {t("capacity.first")}

                <br />

                {t("capacity.second")}
              </span>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}