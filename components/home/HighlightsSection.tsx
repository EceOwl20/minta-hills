import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { highlights } from "@/data/highlights";

export default async function HighlightsSection() {
  const t = await getTranslations("HighlightsSection");

  return (
    <section
      id="highlights"
      aria-labelledby="highlights-heading"
      className="
        overflow-hidden bg-brand-paper
        py-[88px] text-brand-dark
        lg:py-[120px]
      "
    >
      {/* Section introduction */}
      <div
        className="
          mx-auto mb-[42px] max-w-[680px]
          px-6 text-center
          lg:mb-[60px]
        "
      >
        <p
          className="
            mb-6 text-[11px] font-semibold
            leading-relaxed tracking-[0.16em]
            text-text-label
          "
        >
          {t("eyebrow")}
        </p>

        <h2
          id="highlights-heading"
          className="
            mb-[20px]
            text-[clamp(32px,7vw,45px)]
            font-light leading-[1.05]
            tracking-[-0.035em]
            lg:text-[clamp(40px,4vw,62px)]
          "
        >
          {t("title")}

          <br />

          {t("subtitle")}
        </h2>

        <p
          className="
            mx-auto max-w-[570px]
            text-[15px] font-light
            leading-[1.8] text-text-body
          "
        >
          {t("description")}
        </p>
      </div>

      {/* Highlight cards */}
      <div
        className="
          mx-auto flex max-w-[1900px]
          snap-x snap-mandatory
          gap-3 overflow-x-auto
          scroll-px-6 px-6 pb-2
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden

          md:grid md:grid-cols-2
          md:gap-[14px] md:overflow-visible
          md:px-[7%]

          xl:grid-cols-4
        "
      >
        {highlights.map((item, index) => (
          <Link
            key={item.id}
            href={item.href}
            className="
              group relative isolate
              h-[480px] min-w-0
              flex-[0_0_82vw] snap-start
              overflow-hidden bg-brand-charcoal
              text-white

              md:h-[520px]
              xl:h-[500px]

              focus-visible:outline
              focus-visible:-outline-offset-4
              focus-visible:outline-white
            "
          >
            {/* Card image */}
            <Image
              src={item.image}
              alt={t(`cards.${item.id}.alt`)}
              fill
              sizes="
                (min-width: 1800px) 400px,
                (min-width: 1280px) 22vw,
                (min-width: 768px) 43vw,
                82vw
              "
              className="
                object-cover object-center
                transition-transform duration-700 ease-out
                group-hover:scale-105
                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            />

            {/* Image overlay */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute inset-0 z-10
                bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.14)_34%,rgba(0,0,0,0.52)_58%,rgba(0,0,0,0.84)_82%,rgba(0,0,0,0.93)_100%)]
              "
            />

            {/* Card number */}
            <span
              aria-hidden="true"
              className="
                absolute left-6 top-6 z-20
                text-[11px] font-medium
                tracking-[0.15em] text-white/95
                lg:left-[30px] lg:top-[30px]
              "
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Card content */}
            <div
              className="
                absolute inset-x-6 bottom-7 z-20
                lg:inset-x-[30px]
              "
            >
              <h3
                className="
                  mb-1 text-[clamp(22px,2vw,28px)]
                  font-normal leading-[1.15]
                  tracking-[-0.025em]
                  text-white
                  [overflow-wrap:anywhere]
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

      {/* Mobile scroll hint */}
      <div
        aria-hidden="true"
        className="
          mt-6 flex items-center gap-3 px-6
          text-[11px] font-medium
          tracking-[0.16em] text-text-soft
          md:hidden
        "
      >
        <span className="h-px w-16 shrink-0 bg-black/30" />

        {t("scrollHint")}
      </div>
    </section>
  );
}