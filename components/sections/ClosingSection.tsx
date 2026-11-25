import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import RevealOnScroll from "@/components/common/RevealOnScroll";

import {
  closingConfig,
  type ClosingVariant,
} from "@/data/closing";

import { siteConfig } from "@/data/site";

type Props = {
  variant?: ClosingVariant;
};

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

const buttonVariants = {
  solid: `
    border-white bg-white
    text-brand-dark

    hover:bg-transparent
    hover:text-white
  `,
  ghost: `
    border-white bg-transparent
    text-white

    hover:bg-white
    hover:text-brand-dark
  `,
} as const;

export default async function ClosingSection({
  variant = "about",
}: Props) {
  const t = await getTranslations("ClosingSection");

  const config = closingConfig[variant];

const whatsappUrl = new URL(
  siteConfig.social.whatsapp
);

whatsappUrl.searchParams.set(
  "text",
  variant === "contact"
    ? t("variants.contact.whatsappMessage")
    : t("whatsappMessage")
);

const whatsappHref = whatsappUrl.toString();

  return (
    <section
      id="closing"
      aria-labelledby="closing-heading"
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
        src={config.image}
        alt={t(`variants.${variant}.imageAlt`)}
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
            text-white/85
          "
        >
          <span
            aria-hidden="true"
            className="
              h-px w-[34px] shrink-0
              bg-white/60
            "
          />

          {t("eyebrow")}
        </p>

        {/* Section heading */}
        <h2
          id="closing-heading"
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
          {t(`variants.${variant}.title`)}

          <br />

          <em className="font-normal italic">
            {t(`variants.${variant}.subtitle`)}
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
          {config.actions.map((action, index) => {
            const className = `
              ${buttonClasses}
              ${
                index === 0
                  ? buttonVariants.solid
                  : buttonVariants.ghost
              }
            `;

            if (action === "reservation") {
              return (
                <a
                  key={action}
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {variant === "contact"
  ? t("variants.contact.whatsapp")
  : t("reservation")}

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
              );
            }

            return (
              <Link
                key={action}
                 href={action === "gallery" ? "/gallery" : "/villas"}
                className={className}
              >
                {t(
    `variants.${variant}.${action === "gallery" ? "gallery" : "villas"}`
  )}

                <span
                  aria-hidden="true"
                  className="
                    shrink-0
                    text-[16px] leading-none
                  "
                >
                  ↗
                </span>
              </Link>
            );
          })}
        </div>
      </RevealOnScroll>
    </section>
  );
}