import { getTranslations } from "next-intl/server";

import RevealOnScroll from "@/components/common/RevealOnScroll";

import { hospitalityContactTopics } from "@/data/hospitality";
import { siteConfig } from "@/data/site";

export default async function ContactSection() {
  const t = await getTranslations(
    "HospitalityPage.contact"
  );

  const whatsappHref =
    `${siteConfig.social.whatsapp}?text=` +
    encodeURIComponent(t("card.whatsappMessage"));

  const { street, district, city } = siteConfig.address;

  return (
    <section
      id="hospitality-contact"
      aria-labelledby="hospitality-contact-heading"
      className="
        bg-brand-paper text-brand-dark

        px-5 py-[clamp(64px,7vw,104px)]

        min-[761px]:px-[7.5%]
      "
    >
      <div
        className="
          grid grid-cols-1 items-center
          gap-8

          lg:grid-cols-2
          lg:gap-[clamp(32px,4.2vw,80px)]
        "
      >
        {/* Contact information */}
        <RevealOnScroll>
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

          {/* Section heading */}
          <h2
            id="hospitality-contact-heading"
            className="
              mt-6 mb-5

              font-serif font-normal
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

          {/* Section description */}
          <p
            className="
              max-w-[720px]
              text-[14px] font-normal
              leading-[1.8]
              text-text-body
            "
          >
            {t("description")}
          </p>

          {/* Contact topics */}
          <ul
            className="
              mt-6 flex flex-wrap
              items-center gap-2
            "
          >
            {hospitalityContactTopics.map((topic) => (
              <li
                key={topic}
                className="
                  inline-flex max-w-full items-center
                  rounded-full
                  border border-black/25
                  px-4 py-2
                  text-[11px] font-medium text-[#4d4d47]
                  uppercase leading-relaxed
                  tracking-[0.1em]
                  text-text-label"
              >
                {t(`topics.${topic}`)}
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        {/* Contact card */}
        <RevealOnScroll
          delay={120}
          className="min-w-0"
        >
          <div
            className="
              border-t-2 border-brand-dark
              bg-white
              p-[clamp(28px,3vw,48px)]
            "
          >
            {/* Card label */}
            <p
              className="
                flex items-center gap-[14px]
                text-[11px] font-semibold
                uppercase leading-relaxed
                tracking-[0.16em]
                text-text-label text-[#4a4a44]"
            >
              <span
                aria-hidden="true"
                className="h-px w-[34px] shrink-0 bg-current "
              />

              {t("card.eyebrow")}
            </p>

            {/* Phone number */}
            <a
              href={siteConfig.phone.href}
              className="
                mt-4 inline-block
                font-serif font-normal
                text-[clamp(22px,2vw,24px)]
                leading-[1.3]
                text-brand-dark
                transition-colors duration-300
                hover:text-brand-dark/65
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-brand-dark
                motion-reduce:transition-none"
            >
              {siteConfig.phone.display}
            </a>

            {/* Address */}
            <address
              className="
                mt-3
                text-[15px] font-light
                not-italic leading-[1.8]
                text-text-body
              "
            >
              {street} · {district} / {city}
            </address>

            {/* WhatsApp CTA */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-7 inline-flex
                min-h-[48px] max-w-full
                items-center justify-between
                gap-[30px]

                rounded-[26px]
                border border-brand-dark
                bg-transparent

                px-6 py-3

                text-[11px] font-semibold
                uppercase leading-relaxed
                tracking-[0.1em]
                text-brand-dark

                transition-colors duration-250
                ease-in-out

                hover:bg-brand-dark
                hover:text-white

                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-brand-dark

                motion-reduce:transition-none
              "
            >
              {t("card.whatsapp")}

              <span
                aria-hidden="true"
                className="
                  shrink-0
                  text-[16px] leading-none
                "
              >
                ↗
              </span>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}