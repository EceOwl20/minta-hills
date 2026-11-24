import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { experiences } from "@/data/experiences";

export default async function ExperiencesSection() {
  const t = await getTranslations("ExperiencesSection");

  return (
    <section
      id="experiences"
      aria-labelledby="experiences-heading"
      className="
        overflow-hidden bg-[#1a1a19]
        px-6 py-[88px] text-white
        lg:px-[7%] lg:py-[120px]
      "
    >
      {/* Section heading */}
      <div
        className="
          mb-[42px] flex flex-col gap-6
          lg:mb-[55px] lg:flex-row
          lg:items-end lg:justify-between
          lg:gap-12
        "
      >
        <div className="min-w-0">
          <p
            className="
              mb-6 text-[11px] font-semibold
              leading-relaxed tracking-[0.16em]
              text-[#a9a9a2]
            "
          >
            {t("eyebrow")}
          </p>

          <h2
            id="experiences-heading"
            className="
              max-w-[740px] font-sans
              text-[clamp(32px,7vw,38px)]
              font-light leading-none
              tracking-[-0.035em]

              lg:text-[clamp(40px,4.2vw,62px)]
            "
          >
            {t("title")}

            <br />

            {t("subtitle")}
          </h2>
        </div>

        <p
          className="
            max-w-[540px]
            text-[15px] font-light
            leading-[1.8] text-white/95
            lg:w-[36%] lg:shrink-0
          "
        >
          {t("description")}
        </p>
      </div>

      {/* Experience cards */}
      <div
        className="
          grid grid-cols-1 gap-[18px]
          md:grid-cols-2
          xl:grid-cols-[1.5fr_1fr_1fr]
        "
      >
        {experiences.map((item, index) => (
          <Link
            key={item.id}
            href={item.href}
            className={`
              group relative isolate
              min-w-0 overflow-hidden
              bg-brand-charcoal text-white

              h-[420px]
              lg:h-[500px]
              xl:h-[540px]

              focus-visible:outline
              focus-visible:-outline-offset-4
              focus-visible:outline-white

              ${
                index === 0
                  ? "md:col-span-2 xl:col-span-1"
                  : ""
              }
            `}
          >
            {/* Card image */}
            <Image
              src={item.image}
              alt={t(`cards.${item.id}.alt`)}
              fill
              sizes={
                index === 0
                  ? "(min-width: 1280px) 37vw, 100vw"
                  : "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
              }
              className="
                object-cover object-center
                transition-transform duration-700
                ease-out group-hover:scale-105

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            />

            {/* Gradient overlay */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute
                inset-0 z-10
                bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.10)_32%,rgba(0,0,0,0.50)_56%,rgba(0,0,0,0.82)_80%,rgba(0,0,0,0.93)_100%)]
              "
            />

            {/* Card content */}
            <div
              className="
                absolute inset-x-6 bottom-7 z-20
                lg:inset-x-7 lg:bottom-7
                [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]
              "
            >
              <span
                aria-hidden="true"
                className="
                  mb-4 block text-[11px]
                  font-medium leading-relaxed
                  tracking-[0.16em] text-white/95
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3
                className="
                  mb-3 font-sans
                  text-[clamp(22px,2vw,28px)]
                  font-normal leading-[1.15]
                  tracking-[-0.025em]
                  text-white
                  wrap-break-word
                "
              >
                {t(`cards.${item.id}.title`)}
              </h3>

              <p
                className="
                  text-[13px] font-normal
                  leading-[1.7] text-white/95
                "
              >
                {t(`cards.${item.id}.description`)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}