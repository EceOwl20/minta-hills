import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/data/site";

export default async function BookingSection() {
  const t = await getTranslations("BookingSection");

  const whatsappUrl = `${siteConfig.social.whatsapp}?text=${encodeURIComponent(
    t("whatsappMessage")
  )}`;

  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="
        grid grid-cols-1 items-center
        gap-[45px] bg-[#dedbd4]
        px-6 py-[72px] text-brand-dark

        lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]
        lg:gap-0 lg:px-[7%] lg:py-[95px]
      "
    >
      {/* Section content */}
      <div className="min-w-0">
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
          id="booking-heading"
          className="
            font-sans font-light
            text-[clamp(32px,7vw,38px)]
            leading-none tracking-[-0.035em]
            text-brand-dark

            lg:text-[clamp(40px,4vw,62px)]
          "
        >
          {t("title")}

          <br />

          {t("subtitle")}
        </h2>
      </div>

      {/* Reservation and contact */}
      <div
        className="
          flex min-w-0 flex-col items-start
          border-t border-black/20 pt-[35px]

          lg:border-t-0 lg:border-l
          lg:pl-[12%] lg:pt-0
        "
      >
        {/* Contact label */}
        <p
          className="
            mb-4 text-[11px] font-normal
            leading-relaxed tracking-[0.16em]
          "
        >
          {t("contactLabel")}
        </p>

        {/* Phone number */}
        <a
          href={siteConfig.phone.href}
          className="
            font-serif text-[30px]
            font-normal leading-tight
            tracking-[-0.02em]
            text-brand-dark
            transition-opacity duration-200
            hover:opacity-70

            lg:text-[32px]
          "
        >
          {siteConfig.phone.display}
        </a>

        {/* WhatsApp button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group mt-[26px] inline-flex
            min-h-[48px] max-w-full
            items-center justify-between
            gap-8 rounded-full
            border border-brand-dark
            bg-brand-dark px-6 py-3

            text-[11px] font-semibold
            leading-relaxed tracking-[0.08em]
            text-white

            transition-colors duration-200
            hover:bg-transparent
            hover:text-brand-dark
            motion-reduce:transition-none

            lg:gap-[55px]
          "
        >
          {t("whatsapp")}

          <svg
            width={16}
            height={16}
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
              motion-reduce:transform-none
              motion-reduce:transition-none
            "
          >
            <path d="M6 18L18 6M7 6h11v11" />
          </svg>
        </a>
      </div>
    </section>
  );
}