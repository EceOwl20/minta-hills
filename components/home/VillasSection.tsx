import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { villaConfig } from "@/data/villas";

export default async function VillasSection() {
  const t = await getTranslations("VillasSection");

  const specs = [
    {
      id: "livingArea",
      label: t("specs.livingArea.label"),
      value: t("specs.livingArea.value", {
        area: villaConfig.specs.livingArea,
      }),
    },
    {
      id: "capacity",
      label: t("specs.capacity.label"),
      value: t("specs.capacity.value", {
        count: villaConfig.specs.capacity,
      }),
    },
    {
      id: "bedrooms",
      label: t("specs.bedrooms.label"),
      value: t("specs.bedrooms.value", {
        count: villaConfig.specs.bedrooms,
      }),
    },
    {
      id: "balconies",
      label: t("specs.balconies.label"),
      value: t("specs.balconies.value", {
        count: villaConfig.specs.balconies,
      }),
    },
  ];

  return (
    <section
      id="villas"
      aria-labelledby="villas-heading"
      className="
        grid grid-cols-1
        bg-[#e9e7e1] text-brand-dark
        lg:grid-cols-2
        lg:min-h-[760px]
      "
    >
      {/* Villa image */}
      <div
        className="
          relative min-h-[480px]
          bg-brand-charcoal
          lg:min-h-full
        "
      >
        <Image
          src={villaConfig.image}
          alt={t("imageAlt")}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center"
        />

        {/* Villa count badge */}
        <div
          className="
            absolute -bottom-12 right-6 z-10
            flex size-[112px]
            items-center justify-center gap-3
            rounded-full bg-[#171717]/95 text-white

            lg:bottom-auto lg:right-7 lg:top-7
            lg:size-[138px]
          "
        >
          <span
            className="
              text-[42px] font-light leading-none
              lg:text-[48px]
            "
          >
            {villaConfig.count}
          </span>

          <span
            className="
              text-[10px] font-medium
              leading-[1.45] tracking-[0.08em]
              lg:text-[11px]
            "
          >
            {t("badge.first")}

            <br />

            {t("badge.second")}
          </span>
        </div>
      </div>

      {/* Villa content */}
      <div
        className="
          flex min-w-0 flex-col justify-center
          px-6 pb-[72px] pt-[84px]
          md:px-12
          lg:px-[10%] lg:py-[90px]
          2xl:pl-[13%]
        "
      >
        {/* Section label */}
        <p
          className="
            mb-6 text-[11px] font-semibold
            leading-relaxed tracking-[0.16em]
            text-text-label text-[#4a4a44]
          "
        >
          {t("eyebrow")}
        </p>

        {/* Heading */}
        <h2
          id="villas-heading"
          className="
            mb-[30px]
            text-[clamp(32px,7vw,45px)]
            font-light leading-[1.05]
            tracking-[-0.035em]

            lg:text-[clamp(40px,4vw,62px)]
            lg:leading-none
          "
        >
          {t("title")}

          <br />

          {t("subtitle")}
        </h2>

        {/* Description */}
        <p
          className="
            max-w-[520px]
            text-[14px] font-light
            leading-[1.7] text-text-body
          "
        >
          {t("description", {
            area: villaConfig.specs.livingArea,
          })}
        </p>

        {/* Villa specifications */}
        <dl
          className="
            my-[30px] grid grid-cols-2
            border-t border-black/25
            lg:my-[34px]
          "
        >
          {specs.map((spec) => (
            <div
              key={spec.id}
              className="
                flex min-w-0 flex-col
                justify-between gap-2
                border-b border-black/25
                px-1 py-5

                xl:flex-row xl:items-center
                xl:gap-3
              "
            >
              <dt
                className="
                  text-[11px] font-medium
                  uppercase leading-relaxed
                  tracking-[0.08em]
                  text-text-label
                "
              >
                {spec.label}
              </dt>

              <dd
                className="
                  shrink-0 text-[13px]
                  font-medium text-brand-dark
                "
              >
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Discover button */}
        <Link
          href={villaConfig.href}
          className="
            group inline-flex min-h-[46px]
            max-w-full self-start
            items-center justify-between
            gap-8 rounded-full
            border border-brand-dark
            px-[22px] py-3

            text-[11px] font-semibold
            leading-relaxed tracking-[0.1em]

            transition-colors duration-200
            hover:bg-brand-dark hover:text-white
            motion-reduce:transition-none
            lg:gap-12
          "
        >
          {t("discover")}

          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="
              shrink-0 transition-transform
              group-hover:translate-x-1
              motion-reduce:transform-none
              motion-reduce:transition-none
            "
          >
            <path d="M4 12h16M15 7l5 5-5 5" />
          </svg>
        </Link>
      </div>
    </section>
  );
}