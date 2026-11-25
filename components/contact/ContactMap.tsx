import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/data/site";
import { contactMap } from "@/data/contact";

export default async function ContactMap() {
  const t = await getTranslations("ContactPage.map");

  return (
    <section
      aria-label={t("ariaLabel")}
      className="
        relative w-full
        h-[360px]

        overflow-hidden
        bg-brand-mist

        md:h-[440px]
        xl:h-[520px]
      "
    >
      {/* Google Maps */}
      <iframe
        src={contactMap.embedUrl}
        title={t("title")}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="
          absolute inset-0
          h-full w-full
          border-0
        "
      />

      {/* Location information */}
      <div
        className="
          absolute left-4 top-4
          z-10

          max-w-[calc(100%_-_32px)]

          bg-white
          px-5 py-4

          shadow-sm

          md:left-8 md:top-8
          md:max-w-[340px]
          md:px-7 md:py-5

          xl:left-12 xl:top-10
        "
      >
        <p
          className="
            font-serif font-medium
            text-[28px]
            leading-none
            tracking-[-0.02em]
            text-brand-dark

            md:text-[32px]
          "
        >
          {siteConfig.name}
        </p>

        <p
          className="
            mt-2

            font-sans text-[10px]
            font-medium uppercase
            tracking-[0.1em]
            leading-relaxed

            text-text-label
          "
        >
          {t("location")}
        </p>

        <a
          href={contactMap.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            mt-3 inline-flex
            items-center gap-2

            font-sans text-[11px]
            font-medium
            text-brand-dark

            underline
            underline-offset-4

            transition-colors duration-300
            hover:text-brand-dark/65

            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-brand-dark

            motion-reduce:transition-none
          "
        >
          {t("directions")}

          <span aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}