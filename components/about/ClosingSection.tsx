import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import RevealOnScroll from "@/components/common/RevealOnScroll";

import { aboutClosing } from "@/data/about";
import { siteConfig } from "@/data/site";

const buttonClasses = `
  inline-flex min-h-[48px]
  w-full items-center justify-center
  gap-[18px] rounded-[26px]
  border px-6 py-3

  text-[11px] font-semibold
  uppercase leading-relaxed
  tracking-[0.1em]

  transition-colors duration-250
  ease-in-out

  focus-visible:outline-2
  focus-visible:outline-offset-4
  focus-visible:outline-white

  motion-reduce:transition-none

  min-[761px]:w-auto
  min-[761px]:justify-between
  min-[761px]:gap-[30px]
`;

export default async function ClosingSection() {
  const t = await getTranslations("AboutPage.closing");

  const whatsappHref =
    `${siteConfig.social.whatsapp}?text=` +
    encodeURIComponent(t("whatsappMessage"));

  return (
    <section
      id="about-closing"
      aria-labelledby="about-closing-heading"
      className="
        relative isolate flex
        min-h-[clamp(340px,36vw,440px)]
        items-center justify-center
        overflow-hidden
        bg-brand-charcoal

        px-5 py-20
        text-center text-white

        min-[761px]:px-[7.5%]
      "
    >
      {/* Background image */}
      <Image
        src={aboutClosing.image}
        alt={t("imageAlt")}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-10
          bg-black/58
        "
      />

      {/* Closing content */}
      <RevealOnScroll
        className="
          relative z-20
          w-full max-w-[900px]
        "
      >
        {/* Section label */}
        <p
          className="
            flex items-center justify-center
            gap-[14px]
            text-[11px] font-semibold
            uppercase leading-relaxed
            tracking-[0.16em]
            !text-[#a2a199]
          "
        >
          <span
            aria-hidden="true"
            className="h-px w-[34px] shrink-0 bg-white/60"
          />

          {t("eyebrow")}
        </p>

        {/* Section heading */}
        <h2
          id="about-closing-heading"
          className="
            mx-auto mt-6 mb-[30px]
            max-w-[700px]

            font-serif font-normal
            text-[clamp(26px,2.8vw,42px)]
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

        {/* CTA buttons */}
        <div
          className="
            mx-auto flex max-w-[420px]
            flex-col items-stretch
            justify-center gap-3

            min-[761px]:max-w-none
            min-[761px]:flex-row
            min-[761px]:flex-wrap
          "
        >
          {/* Discover villas */}
          <Link
            href={aboutClosing.villasHref}
            className={`
              ${buttonClasses}

              border-white bg-white
              text-brand-dark

              hover:bg-transparent
              hover:text-white
            `}
          >
            {t("discoverVillas")}

            <span
              aria-hidden="true"
              className="shrink-0 text-[16px] leading-none"
            >
              ↗
            </span>
          </Link>

          {/* WhatsApp reservation */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              ${buttonClasses}

              border-white bg-transparent
              text-white

              hover:bg-white
              hover:text-brand-dark
            `}
          >
            {t("reservation")}

            <span
              aria-hidden="true"
              className="shrink-0 text-[16px] leading-none"
            >
              ↗
            </span>
          </a>
        </div>
      </RevealOnScroll>
    </section>
  );
}