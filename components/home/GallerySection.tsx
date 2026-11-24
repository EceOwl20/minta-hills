import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { homeGalleryImages } from "@/data/gallery";

export default async function GallerySection() {
  const t = await getTranslations("GallerySection");

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="
        grid grid-cols-1 items-center
        gap-[45px] overflow-hidden
        bg-brand-paper px-6 py-[88px]
        text-brand-dark

        lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]
        lg:gap-[8%] lg:px-[7%] lg:py-[120px]
      "
    >
      {/* Section content */}
      <div className="flex min-w-0 flex-col justify-center">
        {/* Section label */}
        <p
          className="
            mb-6 text-[11px] font-semibold
            leading-relaxed tracking-[0.16em]
            text-text-label
          "
        >
          {t("eyebrow")}
        </p>

        {/* Heading */}
        <h2
          id="gallery-heading"
          className="
            mb-[30px] font-sans font-light
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

        {/* Gallery link */}
        <Link
          href="/gallery"
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

            lg:mt-[14px]
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

      {/* Gallery mosaic */}
      <div
        className="
          grid min-w-0 grid-cols-2
          auto-rows-[190px] gap-2

          md:auto-rows-[260px] md:gap-[13px]
          lg:auto-rows-[300px]
        "
      >
        {homeGalleryImages.map((item) => (
          <div
            key={item.id}
            className={`
              group relative min-w-0
              overflow-hidden bg-brand-mist

              ${item.featured ? "row-span-2" : ""}
            `}
          >
            <Image
              src={item.src}
              alt={t(`images.${item.id}`)}
              fill
              sizes="
                (min-width: 1024px) 24vw,
                (min-width: 768px) 47vw,
                45vw
              "
              className="
                object-cover object-center
                saturate-[0.88]
                transition-transform duration-700
                ease-out group-hover:scale-105

                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            />
          </div>
        ))}
      </div>
    </section>
  );
}