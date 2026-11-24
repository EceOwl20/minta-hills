import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function EscapeSection() {
  const t = await getTranslations("EscapeSection");

  return (
    <section
      id="escape"
      aria-labelledby="escape-heading"
      className="
        relative isolate flex min-h-[660px]
        items-center overflow-hidden
        bg-brand-charcoal text-white
        lg:min-h-[760px]
      "
    >
      {/* Background image */}
      <Image
        src="/images/exteriors/pool-wide.jpg"
        alt={t("imageAlt")}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-10

          bg-[linear-gradient(90deg,rgba(0,0,0,0.78),rgba(0,0,0,0.36))]

          lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.38)_55%,rgba(0,0,0,0.14)_100%)]
        "
      />

      {/* Section content */}
      <div
        className="
          relative z-30 w-full
          max-w-[680px] px-6 py-24
          md:w-[65%] md:max-w-none
          lg:ml-[8%] lg:w-full
          lg:max-w-[680px] lg:px-0
        "
      >
        {/* Section label */}
        <p
          className="
            mb-6 text-[11px] font-semibold
            leading-relaxed tracking-[0.16em]
            text-on-dark-label
          "
        >
          {t("eyebrow")}
        </p>

        {/* Heading */}
        <h2
          id="escape-heading"
          className="
            font-sans font-light
            text-[clamp(32px,9vw,40px)]
            leading-none tracking-[-0.035em]
            text-white

            lg:text-[clamp(44px,4.6vw,68px)]
          "
        >
          {t("title")}

          <br />

          {t("subtitle")}
        </h2>

        {/* Description */}
        <p
          className="
            my-8 max-w-[480px]
            text-[14px] font-normal
            leading-[1.9] text-white/95
          "
        >
          {t("description")}
        </p>

        {/* Discover experiences button */}
        <Link
          href="/experiences"
          className="
            group inline-flex min-h-[46px]
            max-w-full items-center justify-between
            gap-8 rounded-full
            border border-white/80
            px-[22px] py-3

            text-[11px] font-semibold
            leading-relaxed tracking-[0.1em]

            transition-colors duration-200
            hover:bg-white hover:text-brand-dark
            motion-reduce:transition-none
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
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
              motion-reduce:transition-none
              motion-reduce:transform-none
            "
          >
            <path d="M6 18L18 6M7 6h11v11" />
          </svg>
        </Link>
      </div>

      {/* Decorative typography */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -bottom-[38px] -right-5 z-20
          select-none whitespace-nowrap

          font-serif font-normal
          text-[clamp(100px,16vw,250px)]
          leading-none tracking-[-0.05em]
          text-white/[0.13]
        "
      >
        BREATHE
      </span>
    </section>
  );
}